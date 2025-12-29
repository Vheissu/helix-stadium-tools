import time
import unittest

from helix.blobs import build_property_blob, decode_property_blob, fourcc_int
from helix.osc import build_osc, decode_osc
from helix.session import HelixSession


class FakeStream:
    def __init__(self):
        self.sent = []
        self.send_count = 0
        self._status_sent = False
        self._payloads = []

    def queue_payload(self, payload):
        self._payloads.append(payload)

    def send_frame(self, payload, flags=0x00):
        self.sent.append((flags, payload))
        self.send_count += 1

    def recv_frame(self):
        if self._payloads:
            payload = self._payloads.pop(0)
            return 0x00, payload
        return None, None


class StatusRetryStream(FakeStream):
    def __init__(self, status_payload):
        super().__init__()
        self._status_payload = status_payload

    def recv_frame(self):
        # Only return /status after the second send attempt.
        if self.send_count >= 2 and not self._status_sent:
            self._status_sent = True
            return 0x00, self._status_payload
        return None, None


class FrameQueueStream:
    def __init__(self, frames):
        self._frames = list(frames)
        self.sent = []

    def send_frame(self, payload, flags=0x00):
        self.sent.append((flags, payload))

    def recv_frame(self):
        if self._frames:
            return self._frames.pop(0)
        return None, None


class TestSession(unittest.TestCase):
    def test_next_cmd_id_increments(self):
        session = HelixSession("dummy")
        first = session.next_cmd_id
        second = session.next_cmd_id
        self.assertEqual(second, first + 1)

    def test_send_requires_connection(self):
        session = HelixSession("dummy")
        with self.assertRaises(RuntimeError):
            session.send("/Foo", "i", [1])

    def test_recv_data_frame_skips_control_and_multipart(self):
        session = HelixSession("dummy")
        stream = FrameQueueStream([(0x04, b"cmd"), (0x01, b"topic"), (0x00, b"data")])
        payload, pending = session._recv_data_frame(stream, time.time() + 1.0)
        self.assertEqual(payload, b"data")
        self.assertEqual(pending, b"topic")

    def test_recv_osc_filters_bad_payloads(self):
        session = HelixSession("dummy")
        stream = FrameQueueStream([
            (0x00, b"not-osc"),
            (0x00, b"/invalid"),
            (0x00, build_osc("/ok", "i", [1])),
        ])
        decoded = session._recv_osc(stream, time.time() + 1.0)
        self.assertIsNotNone(decoded)
        addr, _tt, vals = decoded
        self.assertEqual(addr, "/ok")
        self.assertEqual(vals[0], 1)

    def test_request_timeout_returns_none(self):
        session = HelixSession("dummy", timeout=0.0, retries=1, retry_delay=0.0)
        session._stream_2002 = FrameQueueStream([])
        result = session.request(1, "/Foo", "i", [1], "/Bar", timeout=0.0)
        self.assertIsNone(result)
    def test_send_and_wait_status_retries(self):
        cmd_id = 42
        status_msg = build_osc("/status", "iii", [cmd_id, 0, 0])
        stream = StatusRetryStream(status_msg)
        session = HelixSession("dummy", timeout=0.01, retries=2, retry_delay=0.0)
        session._stream_2002 = stream

        result = session.send_and_wait_status(cmd_id, "/SetSnapshotName", "iis", [cmd_id, 0, "Name"])
        self.assertIsNotNone(result)
        self.assertEqual(stream.send_count, 2)

    def test_send_and_wait_ack_success(self):
        cmd_id = 55
        success_msg = build_osc("/success", "ii", [cmd_id, 0])
        stream = StatusRetryStream(success_msg)
        session = HelixSession("dummy", timeout=0.01, retries=2, retry_delay=0.0)
        session._stream_2002 = stream

        result = session.send_and_wait_ack(cmd_id, "/PropertyValueSet", "iib", [cmd_id, 0, b""], ("/success",))
        self.assertIsNotNone(result)
        self.assertEqual(stream.send_count, 2)

    def test_get_property_decodes_blob(self):
        try:
            import msgpack  # noqa: F401
        except Exception:
            self.skipTest("msgpack not installed")

        cmd_id = 7
        blob = build_property_blob("global.remote.access", "on", "s")
        msg = build_osc("/getPropertyValue", "isbi", [cmd_id, "global.remote.access", blob, 0])

        stream = FakeStream()
        stream.queue_payload(msg)

        session = HelixSession("dummy", timeout=0.01, retries=1, retry_delay=0.0)
        session._stream_2002 = stream
        session._cmd_id = cmd_id

        value = session.get_property("global.remote.access")
        self.assertIsInstance(value, dict)
        self.assertEqual(value.get("key_"), "global.remote.access")
        self.assertEqual(value.get("val_"), "on")

    def test_clear_blocks_builds_agenda(self):
        try:
            import msgpack  # noqa: F401
        except Exception:
            self.skipTest("msgpack not installed")

        stream = FakeStream()
        session = HelixSession("dummy")
        session._stream_2002 = stream

        session.clear_blocks(0, [1, 2], wait_status=False)
        self.assertEqual(len(stream.sent), 1)
        flags, payload = stream.sent[0]
        self.assertEqual(flags, 0x00)
        addr, typetags, vals = decode_osc(payload)
        self.assertEqual(addr, "/doAgenda")
        self.assertEqual(typetags, ",ib")
        agenda = msgpack.unpackb(vals[1], raw=False)
        expected = [
            {"bloc": 1, "cmnd": fourcc_int("clrb"), "flow": 0},
            {"bloc": 2, "cmnd": fourcc_int("clrb"), "flow": 0},
        ]
        self.assertEqual(agenda, expected)

    def test_set_auto_cab_sets_property(self):
        try:
            import msgpack  # noqa: F401
        except Exception:
            self.skipTest("msgpack not installed")

        stream = FakeStream()
        session = HelixSession("dummy")
        session._stream_2002 = stream

        session.set_auto_cab(True, wait_status=False)
        self.assertEqual(len(stream.sent), 1)
        _flags, payload = stream.sent[0]
        addr, typetags, vals = decode_osc(payload)
        self.assertEqual(addr, "/PropertyValueSet")
        self.assertEqual(typetags, ",iib")
        decoded = decode_property_blob(vals[2])
        self.assertEqual(decoded.get("key_"), "global.modelselect.addcabblock")
        self.assertEqual(decoded.get("val_"), 1)

    def test_clear_all_blocks_builds_agenda(self):
        try:
            import msgpack  # noqa: F401
        except Exception:
            self.skipTest("msgpack not installed")

        stream = FakeStream()
        session = HelixSession("dummy")
        session._stream_2002 = stream

        session.get_edit_buffer_state = lambda: {
            "sfg_": {
                "flow": [
                    {"blks": [0, {"x": 1}, 0, {"x": 2}]},
                    {"blks": [0, {"x": 3}]},
                ]
            }
        }

        session.clear_all_blocks(wait_status=False)
        self.assertEqual(len(stream.sent), 1)
        _flags, payload = stream.sent[0]
        addr, typetags, vals = decode_osc(payload)
        self.assertEqual(addr, "/doAgenda")
        self.assertEqual(typetags, ",ib")
        agenda = msgpack.unpackb(vals[1], raw=False)
        expected = [
            {"bloc": 1, "cmnd": fourcc_int("clrb"), "flow": 0},
            {"bloc": 3, "cmnd": fourcc_int("clrb"), "flow": 0},
            {"bloc": 1, "cmnd": fourcc_int("clrb"), "flow": 1},
        ]
        self.assertEqual(agenda, expected)

    def test_clear_all_blocks_with_missing_state(self):
        session = HelixSession("dummy")
        session.get_edit_buffer_state = lambda: None
        self.assertIsNone(session.clear_all_blocks())

    def test_clear_all_blocks_path_out_of_range(self):
        session = HelixSession("dummy")
        session.get_edit_buffer_state = lambda: {"sfg_": {"flow": [{"blks": [0]}]}}
        self.assertIsNone(session.clear_all_blocks(path=3))

    def test_insert_block_calls_helpers_in_order(self):
        session = HelixSession("dummy")
        calls = []
        session.clear_blocks = lambda path, blocks, wait_status=True: calls.append(
            ("clear_blocks", path, blocks, wait_status)
        )
        session.set_auto_cab = lambda enabled, wait_status=True: calls.append(
            ("set_auto_cab", enabled, wait_status)
        )
        session.set_model = lambda path, block, model_id, slot=0, wait_status=True: calls.append(
            ("set_model", path, block, model_id, slot, wait_status)
        )

        session.insert_block(1, 2, 123, slot=1, auto_cab=True, clear=True, wait_status=False)
        self.assertEqual(calls[0], ("clear_blocks", 1, [2], False))
        self.assertEqual(calls[1], ("set_auto_cab", True, False))
        self.assertEqual(calls[2], ("set_model", 1, 2, 123, 1, False))


if __name__ == "__main__":
    unittest.main()
