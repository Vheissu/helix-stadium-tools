import builtins
import time
import unittest
from unittest import mock

from helix.blobs import build_property_blob, decode_property_blob, fourcc_int
from helix.discovery import HelixService
from helix.osc import build_osc, decode_osc
from helix.session import (
    HelixSession,
    HelixStatusError,
    HelixTimeoutError,
)


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


class FakeSocket:
    def __init__(self):
        self.connected = None
        self.closed = False
        self.timeout = None

    def connect(self, addr):
        self.connected = addr

    def close(self):
        self.closed = True

    def settimeout(self, value):
        self.timeout = value


class FakeZMTPStream:
    instances = []

    def __init__(self, sock):
        self.sock = sock
        self.sent = []
        FakeZMTPStream.instances.append(self)

    def send_frame(self, payload, flags=0x00):
        self.sent.append((flags, payload))


class TestSession(unittest.TestCase):
    def test_connect_sets_streams_and_subscribes(self):
        FakeZMTPStream.instances = []
        sockets = [FakeSocket(), FakeSocket()]

        def fake_socket(*_args, **_kwargs):
            return sockets.pop(0)

        handshake_calls = []

        def fake_handshake(stream, socket_type, identity=None):
            handshake_calls.append((stream, socket_type, identity))

        with mock.patch("helix.session.socket.socket", side_effect=fake_socket), \
            mock.patch("helix.session.ZMTPStream", FakeZMTPStream), \
            mock.patch("helix.session.zmtp_handshake", side_effect=fake_handshake):
            session = HelixSession("host", port_2001=1111, port_2002=2222)
            result = session.connect()

        self.assertIs(result, session)
        self.assertEqual(FakeZMTPStream.instances[0].sock.connected, ("host", 1111))
        self.assertEqual(FakeZMTPStream.instances[1].sock.connected, ("host", 2222))
        self.assertEqual(FakeZMTPStream.instances[0].sent, [(0x00, b"\x01")])
        self.assertEqual(
            handshake_calls,
            [
                (FakeZMTPStream.instances[0], "SUB", None),
                (FakeZMTPStream.instances[1], "DEALER", b""),
            ],
        )

    def test_connect_autodiscovers_host_and_ports(self):
        FakeZMTPStream.instances = []
        sockets = [FakeSocket(), FakeSocket()]

        def fake_socket(*_args, **_kwargs):
            return sockets.pop(0)

        service = HelixService(instance="p35x1", host="p35x1.local", port=2001, interface=14)

        with mock.patch("helix.session.socket.socket", side_effect=fake_socket), \
            mock.patch("helix.session.ZMTPStream", FakeZMTPStream), \
            mock.patch("helix.session.zmtp_handshake"), \
            mock.patch("helix.session.discover_first_service", return_value=service):
            session = HelixSession(None)
            session.connect()

        self.assertEqual(FakeZMTPStream.instances[0].sock.connected, ("p35x1.local", 2001))
        self.assertEqual(FakeZMTPStream.instances[1].sock.connected, ("p35x1.local", 2002))
        self.assertEqual(session._resolved_service, service)

    def test_close_closes_streams(self):
        session = HelixSession("dummy")
        session._stream_2001 = FakeZMTPStream(FakeSocket())
        session._stream_2002 = FakeZMTPStream(FakeSocket())

        session.close()
        self.assertTrue(session._stream_2001 is None)
        self.assertTrue(session._stream_2002 is None)

    def test_close_handles_missing_stream(self):
        session = HelixSession("dummy")
        session._stream_2001 = None
        session._stream_2002 = FakeZMTPStream(FakeSocket())
        session.close()
        self.assertTrue(session._stream_2002 is None)

    def test_close_handles_missing_stream_2002(self):
        session = HelixSession("dummy")
        session._stream_2001 = FakeZMTPStream(FakeSocket())
        session._stream_2002 = None
        session.close()
        self.assertTrue(session._stream_2001 is None)

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

    def test_recv_data_frame_timeout(self):
        session = HelixSession("dummy")
        stream = FrameQueueStream([])
        payload, pending = session._recv_data_frame(stream, time.time() - 1.0)
        self.assertIsNone(payload)
        self.assertIsNone(pending)

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

    def test_request_timeout_raises_in_strict_mode(self):
        session = HelixSession("dummy", timeout=0.0, retries=1, retry_delay=0.0, raise_on_timeout=True)
        session._stream_2002 = FrameQueueStream([])
        with self.assertRaises(HelixTimeoutError):
            session.request(1, "/Foo", "i", [1], "/Bar", timeout=0.0)

    def test_send_and_wait_ack_returns_none(self):
        session = HelixSession("dummy", timeout=0.0, retries=1, retry_delay=0.0)
        session._stream_2002 = FakeStream()
        result = session.send_and_wait_ack(1, "/Foo", "i", [1], ("/status",), timeout=0.0)
        self.assertIsNone(result)

    def test_send_and_wait_ack_ignores_mismatched_response(self):
        session = HelixSession("dummy", timeout=0.01, retries=1, retry_delay=0.0)
        session._stream_2002 = FakeStream()
        responses = [("/other", ",i", [999])]

        def fake_recv(*_args, **_kwargs):
            return responses.pop(0) if responses else None

        session._recv_osc = fake_recv
        result = session.send_and_wait_ack(1, "/Foo", "i", [1], ("/status",), timeout=0.01)
        self.assertIsNone(result)

    def test_send_and_wait_ack_respects_retry_delay(self):
        session = HelixSession("dummy", timeout=0.0, retries=2, retry_delay=0.01)
        session._stream_2002 = FakeStream()
        with mock.patch("helix.session.time.sleep") as sleeper:
            session.send_and_wait_ack(1, "/Foo", "i", [1], ("/status",), timeout=0.0)
        sleeper.assert_called_once_with(0.01)

    def test_request_respects_retry_delay(self):
        session = HelixSession("dummy", timeout=0.0, retries=2, retry_delay=0.02)
        session._stream_2002 = FakeStream()
        with mock.patch("helix.session.time.sleep") as sleeper:
            session.request(1, "/Foo", "i", [1], "/Bar", timeout=0.0)
        sleeper.assert_called_once_with(0.02)

    def test_request_skips_empty_decodes(self):
        session = HelixSession("dummy", timeout=0.01, retries=1, retry_delay=0.0)
        session._stream_2002 = FakeStream()
        session._recv_osc = lambda *_args, **_kwargs: None
        result = session.request(1, "/Foo", "i", [1], "/Bar", timeout=0.01)
        self.assertIsNone(result)

    def test_request_ignores_mismatched_response(self):
        session = HelixSession("dummy", timeout=0.01, retries=1, retry_delay=0.0)
        session._stream_2002 = FakeStream()
        responses = [("/other", ",i", [999])]

        def fake_recv(*_args, **_kwargs):
            return responses.pop(0) if responses else None

        session._recv_osc = fake_recv
        result = session.request(1, "/Foo", "i", [1], "/Bar", timeout=0.01)
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

    def test_send_and_wait_status_raises_on_non_zero_status(self):
        cmd_id = 33
        status_msg = build_osc("/status", "iii", [cmd_id, 1, 0])
        stream = StatusRetryStream(status_msg)
        session = HelixSession("dummy", timeout=0.01, retries=2, retry_delay=0.0)
        session._stream_2002 = stream
        with self.assertRaises(HelixStatusError):
            session.send_and_wait_status(cmd_id, "/SetSnapshotName", "iis", [cmd_id, 0, "Name"])

    def test_send_and_wait_status_code_accepts_non_zero_tail(self):
        cmd_id = 34
        status_msg = build_osc("/status", "iii", [cmd_id, 0, 1])
        stream = StatusRetryStream(status_msg)
        session = HelixSession("dummy", timeout=0.01, retries=2, retry_delay=0.0)
        session._stream_2002 = stream
        result = session.send_and_wait_status_code(cmd_id, "/CopySnapshot", "iii", [cmd_id, 0, 1])
        self.assertEqual(result, [cmd_id, 0, 1])

    def test_send_and_wait_status_code_raises_on_non_zero_code(self):
        cmd_id = 35
        status_msg = build_osc("/status", "iii", [cmd_id, -21, 0])
        stream = StatusRetryStream(status_msg)
        session = HelixSession("dummy", timeout=0.01, retries=2, retry_delay=0.0)
        session._stream_2002 = stream
        with self.assertRaises(HelixStatusError):
            session.send_and_wait_status_code(cmd_id, "/SetContentAttrs", "iib", [cmd_id, 508, b""])

    def test_recv_update_decodes_wrapped_push_payload(self):
        inner = build_osc("/heartbeat", "i", [1])
        wrapped = b"\x01\x08" + (b"\x00" * 6) + b"\x00\x05" + len(inner).to_bytes(2, "big") + inner
        session = HelixSession("dummy", timeout=0.01, retries=1, retry_delay=0.0)
        session._stream_2001 = FakeStream()
        session._stream_2001.queue_payload(wrapped)
        self.assertEqual(session.recv_update(timeout=0.01), ("/heartbeat", ",i", [1]))

    def test_connect_closes_sockets_on_failure(self):
        FakeZMTPStream.instances = []
        sockets = [FakeSocket(), FakeSocket()]

        def fake_socket(*_args, **_kwargs):
            return sockets.pop(0)

        def fake_handshake(stream, socket_type, identity=None):
            if socket_type == "DEALER":
                raise ConnectionError("boom")

        with mock.patch("helix.session.socket.socket", side_effect=fake_socket), \
            mock.patch("helix.session.ZMTPStream", FakeZMTPStream), \
            mock.patch("helix.session.zmtp_handshake", side_effect=fake_handshake):
            session = HelixSession("host", port_2001=1111, port_2002=2222)
            with self.assertRaises(ConnectionError):
                session.connect()

        self.assertTrue(all(stream.sock.closed for stream in FakeZMTPStream.instances))

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

    def test_get_product_info_decodes_blob(self):
        try:
            import msgpack
        except Exception:
            self.skipTest("msgpack not installed")

        payload = {"name": "helix"}
        blob = msgpack.packb(payload, use_bin_type=True)
        session = HelixSession("dummy")

        def fake_request(cmd_id, *_args, **_kwargs):
            return [cmd_id, blob]

        session.request = fake_request
        session._cmd_id = 10
        value = session.get_product_info()
        self.assertEqual(value, payload)

    def test_get_product_info_invalid_response(self):
        session = HelixSession("dummy")
        session.request = lambda *args, **kwargs: [1, "not-bytes"]
        self.assertIsNone(session.get_product_info())

    def test_get_edit_buffer_state_invalid_response(self):
        session = HelixSession("dummy")
        session.request = lambda *args, **kwargs: [1, b"only-two"]
        self.assertIsNone(session.get_edit_buffer_state())

    def test_get_edit_buffer_state_decodes_blob(self):
        try:
            import msgpack
        except Exception:
            self.skipTest("msgpack not installed")

        payload = {"flow": []}
        blob = msgpack.packb(payload, use_bin_type=True)
        session = HelixSession("dummy")
        session.request = lambda cmd_id, *_args, **_kwargs: [cmd_id, "x", blob]
        session._cmd_id = 2
        value = session.get_edit_buffer_state()
        self.assertEqual(value, payload)

    def test_get_property_invalid_response(self):
        session = HelixSession("dummy")
        session.request = lambda *args, **kwargs: [1, "key", "not-bytes"]
        self.assertIsNone(session.get_property("key"))

    def test_get_active_preset_content_id_reads_property_value(self):
        session = HelixSession("dummy")
        session.get_property = lambda _key: {"val_": 508}
        self.assertEqual(session.get_active_preset_content_id(), 508)

    def test_get_matrix_mixer_state_reads_property_value(self):
        session = HelixSession("dummy")
        session.get_property = lambda _key: {"val_": {"aout": 1, "lyrs": [{"chns": [{"chnl": 1, "vol": 0}]}]}}
        state = session.get_matrix_mixer_state()
        self.assertEqual(state["attached_layer"], 1)
        self.assertEqual(state["layers"][0]["channels"][0]["label"], "Path 1A")

    def test_get_snapshot_count_returns_int(self):
        session = HelixSession("dummy")
        session.request = lambda cmd_id, *_args, **_kwargs: [cmd_id, 8]
        self.assertEqual(session.get_snapshot_count(), 8)

    def test_get_active_snapshot_index_returns_int(self):
        session = HelixSession("dummy")
        session.request = lambda cmd_id, *_args, **_kwargs: [cmd_id, 3]
        self.assertEqual(session.get_active_snapshot_index(), 3)

    def test_get_snapshot_targets_decodes_blob(self):
        try:
            import msgpack
        except Exception:
            self.skipTest("msgpack not installed")

        payload = msgpack.packb([16, 17, 18], use_bin_type=True)
        session = HelixSession("dummy")
        session.request = lambda cmd_id, *_args, **_kwargs: [cmd_id, 0, payload, 0]
        self.assertEqual(session.get_snapshot_targets(0), [16, 17, 18])

    def test_get_snapshots_returns_sorted_snapshot_list(self):
        session = HelixSession("dummy")
        session.get_edit_buffer_state = lambda: {
            "cg__": {
                "entt": {
                    "snps": [
                        {"si__": 2, "name": "Lead", "colr": 2},
                        {"si__": 0, "name": "Clean", "colr": 6},
                        {"si__": 1, "name": "Drive", "colr": 3},
                    ]
                }
            }
        }
        self.assertEqual(
            session.get_snapshots(),
            [
                {"si__": 0, "name": "Clean", "colr": 6},
                {"si__": 1, "name": "Drive", "colr": 3},
                {"si__": 2, "name": "Lead", "colr": 2},
            ],
        )

    def test_get_content_ref_decodes_blob(self):
        try:
            import msgpack
        except Exception:
            self.skipTest("msgpack not installed")

        payload = msgpack.packb({fourcc_int("cid_"): 508, fourcc_int("name"): "Preset"}, use_bin_type=True)
        session = HelixSession("dummy")
        session.request = lambda cmd_id, *_args, **_kwargs: [cmd_id, payload, 0]
        value = session.get_content_ref(508)
        self.assertEqual(value, {"cid_": 508, "name": "Preset"})

    def test_get_container_contents_decodes_blob(self):
        try:
            import msgpack
        except Exception:
            self.skipTest("msgpack not installed")

        payload = msgpack.packb(
            [{fourcc_int("cid_"): 239, fourcc_int("name"): "Church"}],
            use_bin_type=True,
        )
        session = HelixSession("dummy")
        session.request = lambda cmd_id, *_args, **_kwargs: [cmd_id, payload, 0]
        value = session.get_container_contents(-5)
        self.assertEqual(value, [{"cid_": 239, "name": "Church"}])

    def test_get_content_ref_blob_returns_bytes(self):
        payload = b"blob"
        session = HelixSession("dummy")
        session.request = lambda cmd_id, *_args, **_kwargs: [cmd_id, payload, 0]
        self.assertEqual(session.get_content_ref_blob(508), payload)

    def test_get_content_data_returns_bytes(self):
        payload = b"raw-content"
        session = HelixSession("dummy")
        session.request = lambda cmd_id, *_args, **_kwargs: [cmd_id, payload, 0]
        self.assertEqual(session.get_content_data(507), payload)

    def test_get_content_path_returns_string(self):
        session = HelixSession("dummy")
        session.request = lambda cmd_id, *_args, **_kwargs: [cmd_id, "User/Setlist/Test", 0]
        self.assertEqual(session.get_content_path(507), "User/Setlist/Test")

    def test_get_content_info_returns_raw_fields(self):
        session = HelixSession("dummy")
        session.request = lambda cmd_id, *_args, **_kwargs: [cmd_id, 0, "hello", 0]
        self.assertEqual(
            session.get_content_info(0, "CodexTest"),
            {
                "content_type": 0,
                "key": "CodexTest",
                "value": "hello",
                "status": 0,
                "raw": [1, 0, "hello", 0],
            },
        )

    def test_get_all_content_info_decodes_entries(self):
        try:
            import msgpack
        except Exception:
            self.skipTest("msgpack not installed")

        payload = msgpack.packb([["CodexTest", "hello"]], use_bin_type=True)
        session = HelixSession("dummy")
        session.request = lambda cmd_id, *_args, **_kwargs: [cmd_id, 0, payload, 0]
        self.assertEqual(
            session.get_all_content_info(0),
            {
                "content_type": 0,
                "entries": [{"key": "CodexTest", "value": "hello"}],
                "status": 0,
                "raw": [1, 0, payload, 0],
            },
        )

    def test_set_content_info_wait_status_false(self):
        session = HelixSession("dummy")
        session.send = mock.Mock()
        session.set_content_info(0, "CodexTest", "hello", wait_status=False)
        session.send.assert_called_once_with("/SetContentInfo", "iiss", [1, 0, "CodexTest", "hello"])

    def test_set_content_info_wait_status_true(self):
        session = HelixSession("dummy")
        session.send_and_wait_status_code = mock.Mock(return_value=["ok"])
        result = session.set_content_info(0, "CodexTest", "hello", wait_status=True)
        self.assertEqual(result, ["ok"])

    def test_delete_content_info_wait_status_false(self):
        session = HelixSession("dummy")
        session.send = mock.Mock()
        session.delete_content_info(0, "CodexTest", wait_status=False)
        session.send.assert_called_once_with("/DeleteContentInfo", "iis", [1, 0, "CodexTest"])

    def test_delete_content_info_wait_status_true(self):
        session = HelixSession("dummy")
        session.send_and_wait_status_code = mock.Mock(return_value=["ok"])
        result = session.delete_content_info(0, "CodexTest", wait_status=True)
        self.assertEqual(result, ["ok"])

    def test_find_content_matches_decodes_blob(self):
        try:
            import msgpack
        except Exception:
            self.skipTest("msgpack not installed")

        payload = msgpack.packb([{fourcc_int("cid_"): 507, fourcc_int("name"): "Glory"}], use_bin_type=True)
        session = HelixSession("dummy")
        session.request = lambda cmd_id, *_args, **_kwargs: [cmd_id, 0, "Glory", "", payload, 1]
        self.assertEqual(
            session.find_content_matches(0, "Glory"),
            {
                "content_type": 0,
                "query": "Glory",
                "location": "",
                "matches": [{"cid_": 507, "name": "Glory"}],
                "value": 1,
                "raw": [1, 0, "Glory", "", payload, 1],
            },
        )

    def test_is_preset_edited_reads_property_value(self):
        session = HelixSession("dummy")
        session.get_property = lambda _key: {"val_": 1}
        self.assertTrue(session.is_preset_edited())

    def test_set_snapshot_name_wait_status_false(self):
        stream = FakeStream()
        session = HelixSession("dummy")
        session._stream_2002 = stream
        session._cmd_id = 5
        session.set_snapshot_name(1, "Name", wait_status=False)
        _flags, payload = stream.sent[0]
        addr, typetags, vals = decode_osc(payload)
        self.assertEqual(addr, "/SetSnapshotName")
        self.assertEqual(typetags, ",iis")
        self.assertEqual(vals, [5, 1, "Name"])

    def test_set_snapshot_name_wait_status_true(self):
        session = HelixSession("dummy")
        session.send_and_wait_status_code = mock.Mock(return_value=["ok"])
        result = session.set_snapshot_name(1, "Name", wait_status=True)
        self.assertEqual(result, ["ok"])

    def test_set_split_destination_wait_status_false(self):
        session = HelixSession("dummy")
        session.send = mock.Mock()
        session.set_split_destination(1, 9, 1, 19, wait_status=False)
        session.send.assert_called_once_with("/SplitDestinationSet", "iiiii", [1, 1, 9, 1, 19])

    def test_set_split_destination_wait_status_true(self):
        session = HelixSession("dummy")
        session.send_and_wait_status_code = mock.Mock(return_value=["ok"])
        result = session.set_split_destination(1, 9, 1, 19, wait_status=True)
        self.assertEqual(result, ["ok"])

    def test_set_join_origin_wait_status_false(self):
        session = HelixSession("dummy")
        session.send = mock.Mock()
        session.set_join_origin(1, 10, 1, 26, wait_status=False)
        session.send.assert_called_once_with("/JoinOriginSet", "iiiii", [1, 1, 10, 1, 26])

    def test_set_join_origin_wait_status_true(self):
        session = HelixSession("dummy")
        session.send_and_wait_status_code = mock.Mock(return_value=["ok"])
        result = session.set_join_origin(1, 10, 1, 26, wait_status=True)
        self.assertEqual(result, ["ok"])

    def test_activate_snapshot_wait_change_false(self):
        session = HelixSession("dummy")
        session.send = mock.Mock()
        session.activate_snapshot(4, wait_change=False)
        session.send.assert_called_once_with("/activateSnapshot", "iii", [1, 4, 0])

    def test_activate_snapshot_wait_change_true(self):
        session = HelixSession("dummy", timeout=0.1)
        session.send = mock.Mock()
        values = iter([0, 4])
        session.get_active_snapshot_index = lambda: next(values)
        with mock.patch("helix.session.time.sleep"):
            result = session.activate_snapshot(4, wait_change=True, timeout=0.1)
        self.assertEqual(result, 4)

    def test_copy_snapshot_wait_status_false(self):
        session = HelixSession("dummy")
        session.send = mock.Mock()
        session.copy_snapshot(1, 2, wait_status=False)
        session.send.assert_called_once_with("/CopySnapshot", "iii", [1, 1, 2])

    def test_copy_snapshot_wait_status_true(self):
        session = HelixSession("dummy")
        session.send_and_wait_status_code = mock.Mock(return_value=["ok"])
        result = session.copy_snapshot(1, 2, wait_status=True)
        self.assertEqual(result, ["ok"])

    def test_set_snapshot_color_wait_status_false(self):
        session = HelixSession("dummy")
        session.send = mock.Mock()
        session.set_snapshot_color(3, 5, wait_status=False)
        session.send.assert_called_once_with("/SnapshotColorSet", "iii", [1, 3, 5])

    def test_set_snapshot_color_wait_status_true(self):
        session = HelixSession("dummy")
        session.send_and_wait_status_code = mock.Mock(return_value=["ok"])
        result = session.set_snapshot_color(3, 5, wait_status=True)
        self.assertEqual(result, ["ok"])

    def test_load_preset_with_cid_wait_change_false(self):
        session = HelixSession("dummy")
        session.send = mock.Mock()
        session.load_preset_with_cid(436, wait_change=False)
        session.send.assert_called_once_with("/LoadPresetWithCID", "ii", [1, 436])

    def test_load_preset_with_cid_wait_change_true(self):
        session = HelixSession("dummy", timeout=0.1)
        session.send = mock.Mock()
        active_ids = iter([508, 436])
        refs = {
            508: {"cid_": 508, "name": "Current"},
            436: {"cid_": 436, "name": "Target"},
        }
        session.get_active_preset_content_id = lambda: next(active_ids)
        session.get_content_ref = lambda cid: refs.get(cid)
        with mock.patch("helix.session.time.sleep"):
            result = session.load_preset_with_cid(436, wait_change=True, timeout=0.1)
        self.assertEqual(result, {"cid_": 436, "name": "Target"})

    def test_load_preset_at_container_position_wait_change_true(self):
        session = HelixSession("dummy", timeout=0.1)
        session.send = mock.Mock()
        active_ids = iter([508, 506])
        refs = {
            508: {"cid_": 508, "ccid": 500, "posi": 5},
            506: {"cid_": 506, "ccid": 500, "posi": 4},
        }
        session.get_active_preset_content_id = lambda: next(active_ids)
        session.get_content_ref = lambda cid: refs.get(cid)
        with mock.patch("helix.session.time.sleep"):
            result = session.load_preset_at_container_position(500, 4, wait_change=True, timeout=0.1)
        self.assertEqual(result, {"cid_": 506, "ccid": 500, "posi": 4})

    def test_save_preset_with_cid_wait_clean_false(self):
        session = HelixSession("dummy")
        session.send = mock.Mock()
        session.save_preset_with_cid(508, wait_clean=False)
        session.send.assert_called_once_with("/SavePresetWithCID", "ii", [1, 508])

    def test_save_preset_with_cid_wait_clean_true(self):
        session = HelixSession("dummy", timeout=0.1)
        session.send = mock.Mock()
        values = iter([True, False])
        session.is_preset_edited = lambda: next(values)
        with mock.patch("helix.session.time.sleep"):
            result = session.save_preset_with_cid(508, wait_clean=True, timeout=0.1)
        self.assertFalse(result)

    def test_add_contents_to_container_wait_status_false(self):
        session = HelixSession("dummy")
        session.send = mock.Mock()
        session.add_contents_to_container(500, [507], 6, wait_status=False)
        expected_blob = session._encode_msgpack([507])
        session.send.assert_called_once_with("/AddContentsToContainer", "iibiii", [1, 500, expected_blob, 6, 0, 0])

    def test_add_contents_to_container_wait_status_true(self):
        session = HelixSession("dummy")
        session.send_and_wait_status_code = mock.Mock(return_value=["ok"])
        result = session.add_contents_to_container(500, [507], 6, wait_status=True)
        self.assertEqual(result, ["ok"])

    def test_reorder_container_content_wait_status_false(self):
        session = HelixSession("dummy")
        session.send = mock.Mock()
        session.reorder_container_content(500, [508], 0, wait_status=False)
        expected_blob = session._encode_msgpack([508])
        session.send.assert_called_once_with("/ReorderContainerContent", "iibi", [1, 500, expected_blob, 0])

    def test_reorder_container_content_wait_status_true(self):
        session = HelixSession("dummy")
        session.send_and_wait_status_code = mock.Mock(return_value=["ok"])
        result = session.reorder_container_content(500, [508], 0, wait_status=True)
        self.assertEqual(result, ["ok"])

    def test_remove_content_wait_status_false(self):
        session = HelixSession("dummy")
        session.send = mock.Mock()
        session.remove_content(500, [509], wait_status=False)
        expected_blob = session._encode_msgpack([509])
        session.send.assert_called_once_with("/RemoveContent", "iib", [1, 500, expected_blob])

    def test_remove_content_wait_status_true(self):
        session = HelixSession("dummy")
        session.send_and_wait_status_code = mock.Mock(return_value=["ok"])
        result = session.remove_content(500, [509], wait_status=True)
        self.assertEqual(result, ["ok"])

    def test_set_content_attrs_wait_status_false(self):
        session = HelixSession("dummy")
        session.send = mock.Mock()
        session.set_content_attrs(508, b"blob", wait_status=False)
        session.send.assert_called_once_with("/SetContentAttrs", "iib", [1, 508, b"blob"])

    def test_set_content_attrs_wait_status_true(self):
        session = HelixSession("dummy")
        session.send_and_wait_status_code = mock.Mock(return_value=["ok"])
        result = session.set_content_attrs(508, b"blob", wait_status=True)
        self.assertEqual(result, ["ok"])

    def test_set_content_data_wait_status_false(self):
        session = HelixSession("dummy")
        session.send = mock.Mock()
        session.set_content_data(507, b"blob", wait_status=False)
        session.send.assert_called_once_with("/SetContentData", "iib", [1, 507, b"blob"])

    def test_set_content_data_wait_status_true(self):
        session = HelixSession("dummy")
        session.send_and_wait_status_code = mock.Mock(return_value=["ok"])
        result = session.set_content_data(507, b"blob", wait_status=True)
        self.assertEqual(result, ["ok"])

    def test_set_content_path_wait_status_false(self):
        session = HelixSession("dummy")
        session.send = mock.Mock()
        session.set_content_path(507, "User/Test", wait_status=False)
        session.send.assert_called_once_with("/SetContentPath", "iis", [1, 507, "User/Test"])

    def test_set_content_path_wait_status_true(self):
        session = HelixSession("dummy")
        session.send_and_wait_status_code = mock.Mock(return_value=["ok"])
        result = session.set_content_path(507, "User/Test", wait_status=True)
        self.assertEqual(result, ["ok"])

    def test_rename_content_updates_name_attr(self):
        try:
            import msgpack
        except Exception:
            self.skipTest("msgpack not installed")

        session = HelixSession("dummy")
        session.get_content_ref_blob = lambda _cid: msgpack.packb({"name": "Old Name", "cid_": 508}, use_bin_type=True)
        captured = {}

        def fake_set_content_attrs(content_id, attrs, wait_status=True):
            captured["content_id"] = content_id
            captured["attrs"] = attrs
            captured["wait_status"] = wait_status
            return ["ok"]

        session.set_content_attrs = fake_set_content_attrs
        result = session.rename_content(508, "New Name")
        self.assertEqual(result, ["ok"])
        self.assertEqual(captured["content_id"], 508)
        self.assertEqual(captured["attrs"]["name"], "New Name")
        self.assertTrue(captured["wait_status"])

    def test_set_param_value_wait_status_false(self):
        stream = FakeStream()
        session = HelixSession("dummy")
        session._stream_2002 = stream
        session._cmd_id = 9
        session.set_param_value(0, 1, 2, 0.75, slot=3, flags=-1, wait_status=False)
        _flags, payload = stream.sent[0]
        addr, typetags, vals = decode_osc(payload)
        self.assertEqual(addr, "/ParamValueSet")
        self.assertEqual(typetags, ",iiiiifi")
        self.assertEqual(vals, [9, 0, 1, 3, 2, 0.75, -1])

    def test_set_param_value_wait_status_true(self):
        session = HelixSession("dummy")
        session.send_and_wait_status_code = mock.Mock(return_value=["ok"])
        result = session.set_param_value(0, 1, 2, 0.5, wait_status=True)
        self.assertEqual(result, ["ok"])

    def test_set_param_value_bool_uses_integer_payload(self):
        stream = FakeStream()
        session = HelixSession("dummy")
        session._stream_2002 = stream
        session._cmd_id = 10
        session.set_param_value(0, 1, 7, True, wait_status=False)
        _flags, payload = stream.sent[0]
        addr, typetags, vals = decode_osc(payload)
        self.assertEqual(addr, "/ParamValueSet")
        self.assertEqual(typetags, ",iiiiiii")
        self.assertEqual(vals, [10, 0, 1, 0, 7, 1, -1])

    def test_set_param_value_explicit_int_type_uses_integer_payload(self):
        stream = FakeStream()
        session = HelixSession("dummy")
        session._stream_2002 = stream
        session._cmd_id = 11
        session.set_param_value(1, 2, 3, 4, wait_status=False, value_type="i")
        _flags, payload = stream.sent[0]
        addr, typetags, vals = decode_osc(payload)
        self.assertEqual(addr, "/ParamValueSet")
        self.assertEqual(typetags, ",iiiiiii")
        self.assertEqual(vals, [11, 1, 2, 0, 3, 4, -1])

    def test_set_harness_param_value_uses_harness_command(self):
        stream = FakeStream()
        session = HelixSession("dummy")
        session._stream_2002 = stream
        session._cmd_id = 12
        session.set_harness_param_value(0, 1, 1, 2, wait_status=False, value_type="i")
        _flags, payload = stream.sent[0]
        addr, typetags, vals = decode_osc(payload)
        self.assertEqual(addr, "/HarnessParamValueSet")
        self.assertEqual(typetags, ",iiiiii")
        self.assertEqual(vals, [12, 0, 1, 1, 2, -1])

    def test_set_harness_param_value_bool_uses_boolean_payload(self):
        stream = FakeStream()
        session = HelixSession("dummy")
        session._stream_2002 = stream
        session._cmd_id = 13
        session.set_harness_param_value(1, 4, 1, False, wait_status=False, value_type="b")
        _flags, payload = stream.sent[0]
        addr, typetags, vals = decode_osc(payload)
        self.assertEqual(addr, "/HarnessParamValueSet")
        self.assertEqual(typetags, ",iiiiFi")
        self.assertEqual(vals, [13, 1, 4, 1, False, -1])

    def test_set_block_enable_wait_status_false(self):
        stream = FakeStream()
        session = HelixSession("dummy")
        session._stream_2002 = stream
        session._cmd_id = 12
        session.set_block_enable(1, 2, True, wait_status=False)
        _flags, payload = stream.sent[0]
        addr, typetags, vals = decode_osc(payload)
        self.assertEqual(addr, "/BlockEnableSet")
        self.assertEqual(typetags, ",iiii")
        self.assertEqual(vals, [12, 1, 2, 1])

    def test_set_block_enable_wait_status_true(self):
        session = HelixSession("dummy")
        session.send_and_wait_status_code = mock.Mock(return_value=["ok"])
        result = session.set_block_enable(1, 2, 1, wait_status=True)
        self.assertEqual(result, ["ok"])

    def test_set_model_wait_status_false(self):
        stream = FakeStream()
        session = HelixSession("dummy")
        session._stream_2002 = stream
        session._cmd_id = 3
        session.set_model(0, 1, 123, slot=2, wait_status=False)
        _flags, payload = stream.sent[0]
        addr, typetags, vals = decode_osc(payload)
        self.assertEqual(addr, "/ModelSet")
        self.assertEqual(typetags, ",iiiii")
        self.assertEqual(vals, [3, 0, 1, 2, 123])

    def test_set_model_wait_status_true(self):
        session = HelixSession("dummy")
        session.send_and_wait_status_code = mock.Mock(return_value=["ok"])
        result = session.set_model(0, 1, 123, slot=2, wait_status=True)
        self.assertEqual(result, ["ok"])

    def test_set_property_wait_status_true(self):
        try:
            import msgpack  # noqa: F401
        except Exception:
            self.skipTest("msgpack not installed")

        session = HelixSession("dummy")
        session.send_and_wait_ack = mock.Mock(return_value=["ok"])
        result = session.set_property("key", "value", "s", wait_status=True)
        self.assertEqual(result, ["ok"])

    def test_do_agenda_wait_status_true(self):
        try:
            import msgpack  # noqa: F401
        except Exception:
            self.skipTest("msgpack not installed")

        session = HelixSession("dummy")
        session.send_and_wait_status_code = mock.Mock(return_value=["ok"])
        result = session.do_agenda([{"x": 1}], wait_status=True)
        self.assertEqual(result, ["ok"])

    def test_do_agenda_missing_dependency(self):
        def fake_import(name, *args, **kwargs):
            if name == "msgpack":
                raise ImportError("no msgpack")
            return builtins.__import__(name, *args, **kwargs)

        with mock.patch("builtins.__import__", side_effect=fake_import):
            session = HelixSession("dummy")
            with self.assertRaises(SystemExit):
                session.do_agenda([])

    def test_clear_block_position_wait_status_false(self):
        stream = FakeStream()
        session = HelixSession("dummy")
        session._stream_2002 = stream
        session._cmd_id = 5
        session.clear_block_position(1, 15, wait_status=False)
        self.assertEqual(len(stream.sent), 1)
        _flags, payload = stream.sent[0]
        addr, typetags, vals = decode_osc(payload)
        self.assertEqual(addr, "/clrBlock")
        self.assertEqual(typetags, ",iii")
        self.assertEqual(vals, [5, 1, 15])

    def test_clear_blocks_uses_positions_when_state_is_available(self):
        session = HelixSession("dummy")
        session.get_edit_buffer_state = lambda: {
            "sfg_": {
                "flow": [
                    {
                        "bmap": list(range(28, 56)),
                        "blks": [None] * 28,
                    }
                ]
            }
        }
        session.clear_positions = mock.Mock(return_value=["ok"])
        result = session.clear_blocks(0, [29, 30], wait_status=True)
        self.assertEqual(result, ["ok"])
        session.clear_positions.assert_called_once_with(0, [1, 2], wait_status=True)

    def test_clear_blocks_falls_back_to_agenda_for_unresolved_ids(self):
        try:
            import msgpack  # noqa: F401
        except Exception:
            self.skipTest("msgpack not installed")

        stream = FakeStream()
        session = HelixSession("dummy")
        session._stream_2002 = stream
        session.get_edit_buffer_state = lambda: None
        session.clear_blocks(0, [1, 2], wait_status=False)
        self.assertEqual(len(stream.sent), 1)
        _flags, payload = stream.sent[0]
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

    def test_get_auto_cab_enabled_reads_property(self):
        session = HelixSession("dummy")
        session.get_property = lambda _key: {"val_": 1}
        self.assertTrue(session.get_auto_cab_enabled())

    def test_clear_all_blocks_uses_occupied_positions(self):
        session = HelixSession("dummy")
        session.get_edit_buffer_state = lambda: {
            "sfg_": {
                "flow": [
                    {
                        "bmap": list(range(28)),
                        "blks": [None, {"mdls": [{"id__": 770, "parm": []}]}, {"mdls": [{"id__": 771, "parm": []}]}]
                        + [None] * 25,
                    },
                    {
                        "bmap": list(range(28)),
                        "blks": [None] * 15 + [{"mdls": [{"id__": 772, "parm": []}]}] + [None] * 12,
                    },
                ]
            }
        }
        session.clear_positions = mock.Mock(return_value=None)
        session.clear_all_blocks(wait_status=False)
        self.assertEqual(
            session.clear_positions.call_args_list,
            [
                mock.call(0, [1, 2], wait_status=False),
                mock.call(1, [15], wait_status=False),
            ],
        )

    def test_clear_all_blocks_with_missing_state(self):
        session = HelixSession("dummy")
        session.get_edit_buffer_state = lambda: None
        self.assertIsNone(session.clear_all_blocks())

    def test_clear_all_blocks_path_out_of_range(self):
        session = HelixSession("dummy")
        session.get_edit_buffer_state = lambda: {"sfg_": {"flow": [{"blks": [0]}]}}
        self.assertIsNone(session.clear_all_blocks(path=3))

    def test_clear_all_blocks_flow_not_list(self):
        session = HelixSession("dummy")
        session.get_edit_buffer_state = lambda: {"sfg_": {"flow": "nope"}}
        self.assertIsNone(session.clear_all_blocks())

    def test_clear_all_blocks_flow_not_dict(self):
        session = HelixSession("dummy")
        session.get_edit_buffer_state = lambda: {"sfg_": {"flow": ["bad"]}}
        self.assertIsNone(session.clear_all_blocks())

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

    def test_insert_block_skips_optional_steps(self):
        session = HelixSession("dummy")
        calls = []
        session.clear_blocks = lambda *args, **kwargs: calls.append("clear_blocks")
        session.set_auto_cab = lambda *args, **kwargs: calls.append("set_auto_cab")
        session.set_model = lambda *args, **kwargs: calls.append("set_model")
        session.insert_block(0, 1, 99, clear=False, auto_cab=None, wait_status=False)
        self.assertEqual(calls, ["set_model"])

    def test_copy_path_replays_models_enable_and_params(self):
        session = HelixSession("dummy")
        session.get_edit_buffer_state = lambda: {
            "sfg_": {
                "flow": [
                    {
                        "bmap": list(range(28)),
                        "blks": [
                            0,
                            {"id__": 0, "enbl": 1, "mdls": [{"id__": 770, "parm": [{"pid_": 2, "valu": 1}, {"pid_": 3, "valu": 0.5}]}]},
                            9,
                            {"id__": 9, "enbl": 1, "mdls": [{"id__": 475, "parm": []}], "bflw": 0, "bblk": 19},
                            19,
                            {"id__": 19, "enbl": 0, "mdls": [{"id__": 771, "parm": [{"pid_": 4, "valu": False}]}]},
                        ],
                    },
                    {
                        "bmap": list(range(28)),
                        "blks": [],
                    },
                ]
            }
        }
        session.get_auto_cab_enabled = lambda: True
        calls = []
        session.set_auto_cab = lambda enabled, wait_status=True: calls.append(("set_auto_cab", enabled, wait_status))
        session.clear_positions = lambda path, positions, wait_status=True: calls.append(("clear_positions", path, positions, wait_status))
        session.set_model = lambda path, block, model_id, slot=0, wait_status=True: calls.append(
            ("set_model", path, block, model_id, slot, wait_status)
        )
        session.set_split_destination = lambda path, position, linked_flow, linked_position, wait_status=True: calls.append(
            ("set_split_destination", path, position, linked_flow, linked_position, wait_status)
        )
        session.set_block_enable = lambda path, block, enabled, wait_status=True: calls.append(
            ("set_block_enable", path, block, enabled, wait_status)
        )
        session.set_param_value = lambda path, block, param_id, value, slot=0, flags=-1, wait_status=True, value_type=None: calls.append(
            ("set_param_value", path, block, param_id, value, slot, flags, wait_status, value_type)
        )

        result = session.copy_path(0, 1, wait_status=False)
        self.assertEqual(result, {"source_path": 0, "target_path": 1, "entry_count": 3, "routing_entry_count": 1})
        self.assertEqual(
            calls,
            [
                ("set_auto_cab", False, False),
                ("set_model", 1, 0, 770, 0, False),
                ("set_model", 1, 9, 475, 0, False),
                ("set_model", 1, 19, 771, 0, False),
                ("set_split_destination", 1, 9, 1, 19, False),
                ("set_block_enable", 1, 0, 1, False),
                ("set_param_value", 1, 0, 2, 1, 0, -1, False, "i"),
                ("set_param_value", 1, 0, 3, 0.5, 0, -1, False, "f"),
                ("set_block_enable", 1, 9, 1, False),
                ("set_block_enable", 1, 19, 0, False),
                ("set_param_value", 1, 19, 4, False, 0, -1, False, "b"),
                ("set_auto_cab", True, False),
            ],
        )

    def test_copy_path_rejects_same_source_and_target(self):
        session = HelixSession("dummy")
        with self.assertRaises(ValueError):
            session.copy_path(0, 0)

    def test_copy_path_clears_occupied_target_positions(self):
        session = HelixSession("dummy")
        session.get_edit_buffer_state = lambda: {
            "sfg_": {
                "flow": [
                    {"bmap": list(range(28)), "blks": [{"mdls": [{"id__": 770, "parm": []}]}] + [None] * 27},
                    {"bmap": list(range(28)), "blks": [None, {"mdls": [{"id__": 771, "parm": []}]}] + [None] * 26},
                ]
            }
        }
        session.get_auto_cab_enabled = lambda: False
        session.clear_positions = mock.Mock(return_value=None)
        session.set_model = mock.Mock(return_value=None)
        session.set_block_enable = mock.Mock(return_value=None)
        session.set_param_value = mock.Mock(return_value=None)
        session.copy_path(0, 1)
        session.clear_positions.assert_called_once_with(1, [1], wait_status=True)

    def test_enter_exit_calls_helpers(self):
        session = HelixSession("dummy")
        session.connect = mock.Mock(return_value="ok")
        session.close = mock.Mock()
        self.assertEqual(session.__enter__(), "ok")
        session.__exit__(None, None, None)
        session.close.assert_called_once_with()


if __name__ == "__main__":
    unittest.main()
