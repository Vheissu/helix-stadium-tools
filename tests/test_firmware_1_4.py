import unittest

import msgpack

from helix import (
    HelixSession,
    HelixStatusError,
    decode_library_content,
    parse_library_operation,
)
from helix.osc import build_osc, decode_osc


class ReplyStream:
    def __init__(self, responses):
        self.responses = list(responses)
        self.sent = []

    def send_frame(self, payload):
        self.sent.append(decode_osc(payload))

    def recv_frame(self):
        return (0, self.responses.pop(0)) if self.responses else (None, None)


class Firmware14Requests(unittest.TestCase):
    def session(self, *replies):
        session = HelixSession("unused", timeout=0.01, raise_on_timeout=True)
        stream = ReplyStream([build_osc(*reply) for reply in replies])
        session._stream_2002 = stream
        return session, stream

    def test_expression_reading_and_absent_pedal_are_preserved(self):
        # Shapes observed on public 1.4.0.1341; -1 must not become 0%.
        session, stream = self.session(
            ("/getExpressionPedalPos", "iiii", [1, 0, 4095, 0]),
            ("/getExpressionPedalPos", "iiii", [2, 1, -1, 0]),
        )
        self.assertEqual(session.get_expression_pedal_position(0),
                         {"pedal_index": 0, "position": 4095, "detail": 0})
        self.assertEqual(session.get_expression_pedal_position(1)["position"], -1)
        self.assertEqual(stream.sent[0], ("/ExpressionPedalPosGet", ",ii", [1, 0]))

    def test_pedal_rejects_invalid_index_before_sending(self):
        session, stream = self.session()
        for index in (-1, 3, 0.5, True, "0"):
            with self.subTest(index=index), self.assertRaises(ValueError):
                session.get_expression_pedal_position(index)
        self.assertEqual(stream.sent, [])

    def test_malformed_or_wrong_pedal_response_is_not_a_reading(self):
        for tags, values in [("iii", [1, 0, 123]), ("iifi", [1, 0, 0.5, 0]),
                             ("iiii", [1, 1, 123, 0])]:
            with self.subTest(values=values):
                session, _ = self.session(("/getExpressionPedalPos", tags, values))
                self.assertIsNone(session.get_expression_pedal_position(0))

    def test_container_filter_is_explicit_and_legacy_route_is_retained(self):
        payload = msgpack.packb([{"name": "Example", "cid_": 42}], use_bin_type=True)
        session, stream = self.session(
            ("/GetContainerContents", "ibi", [1, payload, 0]),
            ("/GetContainerContents", "ibi", [2, payload, 0]),
        )
        self.assertEqual(session.get_container_contents(-2)[0]["cid_"], 42)
        self.assertEqual(session.get_container_contents(-2, sku="stadium")[0]["cid_"], 42)
        self.assertEqual(stream.sent[0], ("/GetContainerContents", ",ii", [1, -2]))
        self.assertEqual(stream.sent[1], ("/GetContainerContentsWithSku", ",iis", [2, -2, "stadium"]))

    def test_library_response_blob_follows_the_library_selector(self):
        payload = b"\x91" + b"".join(msgpack.packb(x, use_bin_type=True) for x in [151, 6, "Example", "ALL"])
        session, stream = self.session(
            ("/getPresetLibraryContent", "iib", [1, 0, payload]),
            ("/getPresetLibraryContent", "iib", [2, 0, payload]),
        )
        expected = [{"cid_": 151, "type": 6, "name": "Example", "sku": "ALL"}]
        self.assertEqual(session.get_library_content(0), expected)
        self.assertEqual(session.get_library_content(0, "stadium"), expected)
        self.assertEqual(stream.sent[0], ("/LibraryContentGet", ",ii", [1, 0]))
        self.assertEqual(stream.sent[1], ("/LibraryContentGetWithSku", ",iis", [2, 0, "stadium"]))

    def test_blank_sku_is_not_silently_treated_as_no_filter(self):
        session, stream = self.session()
        for sku in ("", " ", 4):
            with self.subTest(sku=sku), self.assertRaises(ValueError):
                session.get_container_contents(-2, sku=sku)
            with self.subTest(sku=sku), self.assertRaises(ValueError):
                session.get_library_content(0, sku=sku)
        self.assertEqual(stream.sent, [])

    def test_spectrum_preserves_binary_payload_without_assuming_encoding(self):
        payload = b"\x00\xff\x10\x80"
        session, stream = self.session(("/xxxIrxSpectrum1", "ib", [1, payload]))
        self.assertEqual(session.get_ir_spectrum(0, 7, 1), payload)
        self.assertEqual(stream.sent[0], ("/IrSpectrumGet", ",iiii", [1, 0, 7, 1]))

    def test_spectrum_target_bounds(self):
        session, stream = self.session()
        for target in [(2, 0, 0), (0, -1, 0), (0, 28, 0), (0, 7, 2), (False, 7, 0)]:
            with self.subTest(target=target), self.assertRaises(ValueError):
                session.get_ir_spectrum(*target)
        self.assertEqual(stream.sent, [])

    def test_explicit_device_error_is_not_reported_as_timeout(self):
        session, _ = self.session(("/error", "iis", [1, -21, "Request failed"]))
        with self.assertRaises(HelixStatusError) as raised:
            session.get_expression_pedal_position(0)
        self.assertEqual(raised.exception.status_values, (-21, "Request failed"))

    def test_unrelated_error_does_not_complete_the_request(self):
        session, _ = self.session(
            ("/error", "iis", [9, -21, "Another request failed"]),
            ("/getExpressionPedalPos", "iiii", [1, 0, 4095, 0]),
        )
        self.assertEqual(session.get_expression_pedal_position(0)["position"], 4095)


class LibraryOperationEvents(unittest.TestCase):
    def test_flattened_library_records_and_all_array_header_sizes(self):
        fields = [151, 6, "Example", "ALL", 152, 6, "Second", "stadium"]
        for header in (b"\x92", b"\xdc\x00\x02", b"\xdd\x00\x00\x00\x02"):
            blob = header + b"".join(msgpack.packb(x, use_bin_type=True) for x in fields)
            self.assertEqual(len(decode_library_content(blob)), 2)
            self.assertEqual(decode_library_content(blob)[1]["sku"], "stadium")
        self.assertEqual(decode_library_content(b"\x90"), [])

    def test_library_decoder_rejects_trailing_truncated_and_wrong_typed_data(self):
        valid = b"\x91" + b"".join(msgpack.packb(x, use_bin_type=True) for x in [151, 6, "Example", "ALL"])
        for blob in (b"", b"\xdc", b"\xdd\xff\xff\xff\xff", valid[:-1], valid + b"\x01",
                     b"\x92" + valid[1:], b"\x91\xc3" + valid[3:], msgpack.packb([1, 6, "x", "ALL"])):
            with self.subTest(blob=blob):
                self.assertIsNone(decode_library_content(blob))

    def test_all_twelve_registered_notification_shapes(self):
        for kind in ("ir", "clone"):
            for operation in ("Import", "Delete"):
                for phase in ("Begin", "Progress", "End"):
                    fields = [3, "Example"] if phase == "Begin" else [1, 3]
                    if phase == "End":
                        fields = [3, 2, 1, -21] if operation == "Import" else [3]
                    address = f"/{kind}{operation}{phase}"
                    with self.subTest(address=address):
                        event = parse_library_operation(address, [10, 20, *fields])
                        self.assertEqual(event["kind"], kind)
                        self.assertEqual(event["phase"], phase.lower())
                        self.assertEqual(event["fields"], fields)
                        self.assertNotIn("success", event)

    def test_rejects_unrelated_truncated_and_wrong_typed_messages(self):
        for address, values in [
            ("/other", [1, 2, 3]), ("/cloneImportBegin", [1, 2, 3]),
            ("/irImportProgress", [1, 2, 0.5, 3]),
            ("/irImportProgress", [True, 2, 1, 3]),
            ("/irImportEnd", [1, 2, 3]),
            ("/cloneDeleteEnd", [1, 2, 3, 4]),
            ("/irImportBegin", None),
        ]:
            with self.subTest(address=address, values=values):
                self.assertIsNone(parse_library_operation(address, values))
