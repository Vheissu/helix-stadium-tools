import builtins
import time
import unittest
from unittest import mock

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


class FakeSocket:
    def __init__(self):
        self.connected = None
        self.closed = False

    def connect(self, addr):
        self.connected = addr

    def close(self):
        self.closed = True


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
        session.send_and_wait_status = mock.Mock(return_value=["ok"])
        result = session.set_snapshot_name(1, "Name", wait_status=True)
        self.assertEqual(result, ["ok"])

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
        session.send_and_wait_status = mock.Mock(return_value=["ok"])
        result = session.set_param_value(0, 1, 2, 0.5, wait_status=True)
        self.assertEqual(result, ["ok"])

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
        session.send_and_wait_status = mock.Mock(return_value=["ok"])
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
        session.send_and_wait_status = mock.Mock(return_value=["ok"])
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
        session.send_and_wait_status = mock.Mock(return_value=["ok"])
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

    def test_clear_blocks_accepts_int(self):
        session = HelixSession("dummy")
        calls = []
        session.do_agenda = lambda cmds, wait_status=True: calls.append((cmds, wait_status))
        session.clear_blocks(2, 3, wait_status=False)
        self.assertEqual(calls[0][0], [{"bloc": 3, "cmnd": fourcc_int("clrb"), "flow": 2}])
        self.assertFalse(calls[0][1])

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

    def test_enter_exit_calls_helpers(self):
        session = HelixSession("dummy")
        session.connect = mock.Mock(return_value="ok")
        session.close = mock.Mock()
        self.assertEqual(session.__enter__(), "ok")
        session.__exit__(None, None, None)
        session.close.assert_called_once_with()


if __name__ == "__main__":
    unittest.main()
