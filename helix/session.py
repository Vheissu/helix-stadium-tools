"""High-level Helix Stadium session client."""
import socket
import time

from .osc import build_osc, decode_osc_payloads
from .blobs import (
    build_property_blob,
    decode_msgpack_blob,
    decode_property_blob,
    fourcc_int,
    normalize_fourcc_map,
)
from .zmtp import ZMTPStream, zmtp_handshake


class HelixSessionError(RuntimeError):
    """Base error for session-level failures."""


class HelixTimeoutError(HelixSessionError):
    """Raised when a command does not receive an expected response in time."""


class HelixStatusError(HelixSessionError):
    """Raised when the device acknowledges a command with a non-zero status."""

    def __init__(self, address: str, cmd_id: int, status_values):
        self.address = address
        self.cmd_id = cmd_id
        self.status_values = tuple(status_values)
        super().__init__(f"{address} failed for cmd_id={cmd_id}: status={self.status_values}")


class HelixSession:
    def __init__(
        self,
        host: str,
        port_2001: int = 2001,
        port_2002: int = 2002,
        timeout: float = 5.0,
        retries: int = 1,
        retry_delay: float = 0.1,
        raise_on_timeout: bool = False,
        strict_status: bool = True,
    ):
        self.host = host
        self.port_2001 = port_2001
        self.port_2002 = port_2002
        self.timeout = timeout
        self.retries = retries
        self.retry_delay = retry_delay
        self.raise_on_timeout = raise_on_timeout
        self.strict_status = strict_status
        self._cmd_id = 1
        self._stream_2001 = None
        self._stream_2002 = None

    def connect(self):
        sock_2001 = None
        sock_2002 = None
        try:
            sock_2001 = self._open_socket(self.port_2001)
            sock_2002 = self._open_socket(self.port_2002)
            stream_2001 = ZMTPStream(sock_2001)
            stream_2002 = ZMTPStream(sock_2002)
            zmtp_handshake(stream_2001, "SUB", identity=None)
            stream_2001.send_frame(b"\x01")
            zmtp_handshake(stream_2002, "DEALER", identity=b"")
            self._configure_poll_timeout(sock_2001)
            self._configure_poll_timeout(sock_2002)
            self._stream_2001 = stream_2001
            self._stream_2002 = stream_2002
            return self
        except Exception:
            for sock in (sock_2001, sock_2002):
                self._safe_close_socket(sock)
            self._stream_2001 = None
            self._stream_2002 = None
            raise

    def close(self):
        if self._stream_2001:
            self._safe_close_socket(self._stream_2001.sock)
        if self._stream_2002:
            self._safe_close_socket(self._stream_2002.sock)
        self._stream_2001 = None
        self._stream_2002 = None

    @property
    def next_cmd_id(self):
        cid = self._cmd_id
        self._cmd_id += 1
        return cid

    def _socket_timeout(self):
        if self.timeout <= 0:
            return 0.05
        return min(max(self.timeout, 0.05), 0.25)

    def _set_socket_timeout(self, sock, timeout: float):
        setter = getattr(sock, "settimeout", None)
        if callable(setter):
            setter(timeout)

    def _configure_poll_timeout(self, sock):
        self._set_socket_timeout(sock, self._socket_timeout())

    def _open_socket(self, port: int):
        sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        self._set_socket_timeout(sock, self.timeout)
        sock.connect((self.host, port))
        return sock

    def _safe_close_socket(self, sock):
        if not sock:
            return
        try:
            sock.close()
        except Exception:
            pass

    def _handle_timeout(self, address: str, cmd_id: int, expect_desc: str):
        if self.raise_on_timeout:
            raise HelixTimeoutError(
                f"timed out waiting for {expect_desc} after {address} (cmd_id={cmd_id})"
            )
        return None

    def _validate_status(self, address: str, cmd_id: int, response_addr: str, vals):
        if not self.strict_status or response_addr != "/status" or len(vals) < 3:
            return
        status_values = []
        for value in vals[1:3]:
            try:
                status_values.append(int(value))
            except Exception:
                return
        if any(status_values):
            raise HelixStatusError(address, cmd_id, status_values)

    def _recv_data_frame(self, stream, deadline):
        pending = None
        while time.time() < deadline:
            flags, payload = stream.recv_frame()
            if flags is None:
                return None, None
            if flags & 0x04:
                continue
            if flags & 0x01:
                pending = payload
                continue
            return payload, pending
        return None, None

    def _recv_osc(self, stream, deadline):
        while time.time() < deadline:
            payload, _topic = self._recv_data_frame(stream, deadline)
            if not payload:
                continue
            for decoded in decode_osc_payloads(payload):
                addr, _tt, _vals = decoded
                if addr.startswith("/"):
                    return decoded
        return None

    def send(self, address: str, typetags: str, args):
        if not self._stream_2002:
            raise RuntimeError("session not connected")
        msg = build_osc(address, typetags, args)
        self._stream_2002.send_frame(msg)

    def send_and_wait_ack(self, cmd_id: int, address: str, typetags: str, args, ack_addrs, timeout: float | None = None):
        if timeout is None:
            timeout = self.timeout
        for attempt in range(self.retries):
            if attempt:
                time.sleep(self.retry_delay)
            self.send(address, typetags, args)
            deadline = time.time() + timeout
            while time.time() < deadline:
                decoded = self._recv_osc(self._stream_2002, deadline)
                if not decoded:
                    continue
                addr, _tt, vals = decoded
                if addr in ack_addrs and vals and int(vals[0]) == cmd_id:
                    self._validate_status(address, cmd_id, addr, vals)
                    return vals
        return self._handle_timeout(address, cmd_id, " or ".join(ack_addrs))

    def send_and_wait_status(self, cmd_id: int, address: str, typetags: str, args, timeout: float | None = None):
        return self.send_and_wait_ack(cmd_id, address, typetags, args, ("/status",), timeout=timeout)

    def request(self, cmd_id: int, address: str, typetags: str, args, expect_addr: str, timeout: float | None = None):
        if timeout is None:
            timeout = self.timeout
        for attempt in range(self.retries):
            if attempt:
                time.sleep(self.retry_delay)
            self.send(address, typetags, args)
            deadline = time.time() + timeout
            while time.time() < deadline:
                decoded = self._recv_osc(self._stream_2002, deadline)
                if not decoded:
                    continue
                addr, _tt, vals = decoded
                if addr == expect_addr and vals and int(vals[0]) == cmd_id:
                    return vals
        return self._handle_timeout(address, cmd_id, expect_addr)

    def recv_update(self, timeout: float | None = None):
        """Read the next device->editor update from port 2001."""
        if not self._stream_2001:
            raise RuntimeError("session not connected")
        if timeout is None:
            timeout = self.timeout
        deadline = time.time() + timeout
        return self._recv_osc(self._stream_2001, deadline)

    # High-level APIs
    def get_product_info(self):
        cmd_id = self.next_cmd_id
        vals = self.request(cmd_id, "/ProductInfoGet", "i", [cmd_id], "/getProductInfo")
        if not vals or len(vals) < 2 or not isinstance(vals[1], (bytes, bytearray)):
            return None
        return decode_msgpack_blob(vals[1])

    def get_edit_buffer_state(self):
        cmd_id = self.next_cmd_id
        vals = self.request(cmd_id, "/EditBufferStateGet", "i", [cmd_id], "/getEditBufferState")
        if not vals or len(vals) < 3 or not isinstance(vals[2], (bytes, bytearray)):
            return None
        return decode_msgpack_blob(vals[2])

    def get_property(self, key: str):
        cmd_id = self.next_cmd_id
        vals = self.request(cmd_id, "/PropertyValueGet", "is", [cmd_id, key], "/getPropertyValue")
        if not vals or len(vals) < 3 or not isinstance(vals[2], (bytes, bytearray)):
            return None
        return decode_property_blob(vals[2])

    def set_snapshot_name(self, index: int, name: str, wait_status: bool = True):
        cmd_id = self.next_cmd_id
        if wait_status:
            return self.send_and_wait_status(cmd_id, "/SetSnapshotName", "iis", [cmd_id, index, name])
        self.send("/SetSnapshotName", "iis", [cmd_id, index, name])
        return None

    def set_param_value(self, path: int, block: int, param_id: int, value, slot: int = 0, flags: int = -1, wait_status: bool = True):
        cmd_id = self.next_cmd_id
        args = [cmd_id, path, block, slot, param_id, float(value), flags]
        if wait_status:
            return self.send_and_wait_status(cmd_id, "/ParamValueSet", "iiiiifi", args)
        self.send("/ParamValueSet", "iiiiifi", args)
        return None

    def set_block_enable(self, path: int, block: int, enabled: int, wait_status: bool = True):
        cmd_id = self.next_cmd_id
        if wait_status:
            return self.send_and_wait_status(cmd_id, "/BlockEnableSet", "iiii", [cmd_id, path, block, int(enabled)])
        self.send("/BlockEnableSet", "iiii", [cmd_id, path, block, int(enabled)])
        return None

    def set_model(self, path: int, block: int, model_id: int, slot: int = 0, wait_status: bool = True):
        cmd_id = self.next_cmd_id
        if wait_status:
            return self.send_and_wait_status(cmd_id, "/ModelSet", "iiiii", [cmd_id, path, block, slot, model_id])
        self.send("/ModelSet", "iiiii", [cmd_id, path, block, slot, model_id])
        return None

    def set_property(self, key: str, value, value_type: str = "s", property_id: int = 0, wait_status: bool = True):
        cmd_id = self.next_cmd_id
        blob = build_property_blob(key, value, value_type)
        if wait_status:
            return self.send_and_wait_ack(cmd_id, "/PropertyValueSet", "iib", [cmd_id, property_id, blob], ("/success", "/status"))
        self.send("/PropertyValueSet", "iib", [cmd_id, property_id, blob])
        return None

    def set_auto_cab(self, enabled: bool | int, wait_status: bool = True):
        """Toggle the global auto-cab insertion setting."""
        return self.set_property("global.modelselect.addcabblock", int(bool(enabled)), "i", wait_status=wait_status)

    def set_preset_notes(self, text: str, wait_status: bool = True):
        """Set the preset notes text (preset.meta.info)."""
        return self.set_property("preset.meta.info", text, "s", wait_status=wait_status)

    def set_preset_notes_visible(self, visible: bool | int, wait_status: bool = True):
        """Show or hide the preset notes panel (volatile.presetinfo.open/close)."""
        key = "volatile.presetinfo.open" if bool(visible) else "volatile.presetinfo.close"
        return self.set_property(key, 1, "i", wait_status=wait_status)

    def do_agenda(self, commands, wait_status: bool = True):
        """Send a /doAgenda batch command (msgpack list of command dicts)."""
        try:
            import msgpack  # type: ignore
        except Exception as exc:
            raise SystemExit(f"msgpack is required: {exc}")
        cmd_id = self.next_cmd_id
        blob = msgpack.packb(commands, use_bin_type=True)
        if wait_status:
            return self.send_and_wait_status(cmd_id, "/doAgenda", "ib", [cmd_id, blob])
        self.send("/doAgenda", "ib", [cmd_id, blob])
        return None

    def clear_blocks(self, flow: int, blocks, wait_status: bool = True):
        """Clear one or more blocks on a path/flow."""
        if isinstance(blocks, int):
            blocks = [blocks]
        cmds = [{"bloc": int(block), "cmnd": fourcc_int("clrb"), "flow": int(flow)} for block in blocks]
        return self.do_agenda(cmds, wait_status=wait_status)

    def clear_all_blocks(self, path: int | None = None, wait_status: bool = True):
        """Clear all blocks in the current edit buffer for one path or all paths."""
        state = self.get_edit_buffer_state()
        if state is None:
            return None
        data = normalize_fourcc_map(state)
        flows = data.get("sfg_", {}).get("flow", [])
        if not isinstance(flows, list):
            return None
        if path is None:
            flow_indices = range(len(flows))
        else:
            flow_indices = [path]
        cmds = []
        for flow_idx in flow_indices:
            if flow_idx < 0 or flow_idx >= len(flows):
                continue
            flow = flows[flow_idx]
            if not isinstance(flow, dict):
                continue
            blks = flow.get("blks", [])
            for idx, blk in enumerate(blks):
                if isinstance(blk, dict):
                    cmds.append({"bloc": idx, "cmnd": fourcc_int("clrb"), "flow": flow_idx})
        if not cmds:
            return None
        return self.do_agenda(cmds, wait_status=wait_status)

    def insert_block(
        self,
        path: int,
        block: int,
        model_id: int,
        slot: int = 0,
        auto_cab: bool | None = None,
        clear: bool = False,
        clear_blocks: list[int] | None = None,
        wait_status: bool = True,
    ):
        """Insert a block by model id, optionally clearing slots and toggling auto-cab first."""
        if clear_blocks is None and clear:
            clear_blocks = [block]
        if clear_blocks:
            self.clear_blocks(path, clear_blocks, wait_status=wait_status)
        if auto_cab is not None:
            self.set_auto_cab(auto_cab, wait_status=wait_status)
        return self.set_model(path, block, model_id, slot=slot, wait_status=wait_status)

    # Context manager helpers
    def __enter__(self):
        return self.connect()

    def __exit__(self, exc_type, exc, tb):
        self.close()
