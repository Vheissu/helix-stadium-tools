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
from .discovery import HelixService, discover_first_service
from .zmtp import ZMTPStream, zmtp_handshake

FACTORY_PRESETS_CID = -1
USER_PRESETS_CID = -2
SETLIST_DIRECTORY_CID = -5
SNAPSHOT_COLOR_NAMES = {
    0: "Auto",
    1: "White",
    2: "Red",
    3: "Dark Orange",
    4: "Light Orange",
    5: "Yellow",
    6: "Green",
    7: "Turquoise",
    8: "Blue",
    9: "Violet",
    10: "Pink",
    11: "Off",
}


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
        host: str | None,
        port_2001: int = 2001,
        port_2002: int = 2002,
        timeout: float = 5.0,
        retries: int = 1,
        retry_delay: float = 0.1,
        discover_timeout: float = 5.0,
        raise_on_timeout: bool = False,
        strict_status: bool = True,
    ):
        self.host = host
        self.port_2001 = port_2001
        self.port_2002 = port_2002
        self.timeout = timeout
        self.retries = retries
        self.retry_delay = retry_delay
        self.discover_timeout = discover_timeout
        self.raise_on_timeout = raise_on_timeout
        self.strict_status = strict_status
        self._cmd_id = 1
        self._stream_2001 = None
        self._stream_2002 = None
        self._resolved_service: HelixService | None = None

    def connect(self):
        sock_2001 = None
        sock_2002 = None
        try:
            host, port_2001, port_2002 = self._connection_target()
            sock_2001 = self._open_socket(host, port_2001)
            sock_2002 = self._open_socket(host, port_2002)
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

    def _connection_target(self):
        host = self.host
        port_2001 = self.port_2001
        port_2002 = self.port_2002
        if host and str(host).strip().lower() != "auto":
            self._resolved_service = None
            return host, port_2001, port_2002
        service = discover_first_service(timeout=self.discover_timeout)
        self._resolved_service = service
        if port_2001 == 2001:
            port_2001 = service.port
        if port_2002 == 2002:
            port_2002 = service.port + 1
        return service.host, port_2001, port_2002

    def _open_socket(self, host: str, port: int):
        sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        self._set_socket_timeout(sock, self.timeout)
        sock.connect((host, port))
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

    def send_and_wait_status_code(self, cmd_id: int, address: str, typetags: str, args, timeout: float | None = None):
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
                response_addr, _tt, vals = decoded
                if response_addr != "/status" or not vals or int(vals[0]) != cmd_id:
                    continue
                if len(vals) < 2:
                    return vals
                try:
                    status_code = int(vals[1])
                except Exception:
                    return vals
                if status_code != 0:
                    raise HelixStatusError(address, cmd_id, vals[1:])
                return vals
        return self._handle_timeout(address, cmd_id, "/status")

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

    def _decode_blob_response(self, vals, blob_index: int):
        if not vals or len(vals) <= blob_index or not isinstance(vals[blob_index], (bytes, bytearray)):
            return None
        return decode_msgpack_blob(vals[blob_index])

    def _raw_blob_response(self, vals, blob_index: int):
        if not vals or len(vals) <= blob_index or not isinstance(vals[blob_index], (bytes, bytearray)):
            return None
        return bytes(vals[blob_index])

    def _encode_msgpack(self, value):
        try:
            import msgpack  # type: ignore
        except Exception as exc:
            raise HelixSessionError(f"msgpack is required: {exc}") from exc
        return msgpack.packb(value, use_bin_type=True)

    def _poll_until(self, predicate, timeout: float | None = None, interval: float = 0.05):
        if timeout is None:
            timeout = self.timeout
        deadline = time.time() + max(timeout, 0.0)
        while time.time() < deadline:
            result = predicate()
            if result is not None:
                return result
            time.sleep(interval)
        return None

    def _find_first_key(self, value, key: str):
        queue = [value]
        seen = set()
        while queue:
            current = queue.pop(0)
            if current is None:
                continue
            if isinstance(current, dict):
                marker = id(current)
                if marker in seen:
                    continue
                seen.add(marker)
                if key in current:
                    return current[key]
                queue.extend(current.values())
                continue
            if isinstance(current, list):
                marker = id(current)
                if marker in seen:
                    continue
                seen.add(marker)
                queue.extend(current)
        return None

    # High-level APIs
    def get_product_info(self):
        cmd_id = self.next_cmd_id
        vals = self.request(cmd_id, "/ProductInfoGet", "i", [cmd_id], "/getProductInfo")
        return self._decode_blob_response(vals, 1)

    def get_edit_buffer_state(self):
        cmd_id = self.next_cmd_id
        vals = self.request(cmd_id, "/EditBufferStateGet", "i", [cmd_id], "/getEditBufferState")
        return self._decode_blob_response(vals, 2)

    def get_property(self, key: str):
        cmd_id = self.next_cmd_id
        vals = self.request(cmd_id, "/PropertyValueGet", "is", [cmd_id, key], "/getPropertyValue")
        if not vals or len(vals) < 3 or not isinstance(vals[2], (bytes, bytearray)):
            return None
        return decode_property_blob(vals[2])

    def get_active_preset_content_id(self):
        value = self.get_property("server.active.preset.id")
        if not isinstance(value, dict):
            return None
        raw = value.get("val_")
        if raw is None:
            raw = value.get("val")
        try:
            return int(raw)
        except Exception:
            return None

    def get_content_ref(self, content_id: int):
        cmd_id = self.next_cmd_id
        vals = self.request(cmd_id, "/GetContentRef", "ii", [cmd_id, int(content_id)], "/GetContentRef")
        decoded = self._decode_blob_response(vals, 1)
        if decoded is None:
            return None
        return normalize_fourcc_map(decoded)

    def get_content_ref_blob(self, content_id: int):
        cmd_id = self.next_cmd_id
        vals = self.request(cmd_id, "/GetContentRef", "ii", [cmd_id, int(content_id)], "/GetContentRef")
        return self._raw_blob_response(vals, 1)

    def get_container_contents(self, container_id: int):
        cmd_id = self.next_cmd_id
        vals = self.request(
            cmd_id,
            "/GetContainerContents",
            "ii",
            [cmd_id, int(container_id)],
            "/GetContainerContents",
        )
        decoded = self._decode_blob_response(vals, 1)
        if decoded is None:
            return None
        return normalize_fourcc_map(decoded)

    def get_content_data(self, content_id: int):
        cmd_id = self.next_cmd_id
        vals = self.request(cmd_id, "/GetContentData", "ii", [cmd_id, int(content_id)], "/GetContentData")
        return self._raw_blob_response(vals, 1)

    def get_content_data_decoded(self, content_id: int):
        blob = self.get_content_data(content_id)
        if not blob:
            return None
        decoded = decode_msgpack_blob(blob)
        if decoded is None:
            return None
        return normalize_fourcc_map(decoded)

    def get_content_path(self, content_id: int):
        cmd_id = self.next_cmd_id
        vals = self.request(cmd_id, "/GetContentPath", "ii", [cmd_id, int(content_id)], "/GetContentPath")
        if not vals or len(vals) < 2:
            return None
        path = vals[1]
        return path if isinstance(path, str) else None

    def get_content_info(self, content_type: int, name: str):
        cmd_id = self.next_cmd_id
        vals = self.request(
            cmd_id,
            "/GetContentInfo",
            "iis",
            [cmd_id, int(content_type), str(name)],
            "/GetContentInfo",
        )
        if not vals or len(vals) < 4:
            return None
        return {
            "content_type": int(vals[1]) if isinstance(vals[1], int) else vals[1],
            "name": vals[2] if isinstance(vals[2], str) else None,
            "value": int(vals[3]) if isinstance(vals[3], int) else vals[3],
            "raw": vals,
        }

    def find_content_matches(self, content_type: int, query: str, location: str = ""):
        cmd_id = self.next_cmd_id
        vals = self.request(
            cmd_id,
            "/FindContentMatches",
            "iiss",
            [cmd_id, int(content_type), str(query), str(location)],
            "/FindContentInfo",
        )
        if not vals or len(vals) < 6:
            return None
        blob = vals[4] if isinstance(vals[4], (bytes, bytearray)) else None
        decoded = decode_msgpack_blob(blob) if blob is not None else None
        if isinstance(decoded, (dict, list)):
            decoded = normalize_fourcc_map(decoded)
        return {
            "content_type": int(vals[1]) if isinstance(vals[1], int) else vals[1],
            "query": vals[2] if isinstance(vals[2], str) else None,
            "location": vals[3] if isinstance(vals[3], str) else None,
            "matches": decoded,
            "value": int(vals[5]) if isinstance(vals[5], int) else vals[5],
            "raw": vals,
        }

    def list_factory_presets(self):
        items = self.get_container_contents(FACTORY_PRESETS_CID)
        return items if isinstance(items, list) else None

    def list_user_presets(self):
        items = self.get_container_contents(USER_PRESETS_CID)
        return items if isinstance(items, list) else None

    def list_setlists(self):
        items = self.get_container_contents(SETLIST_DIRECTORY_CID)
        return items if isinstance(items, list) else None

    def is_preset_edited(self):
        value = self.get_property("volatile.preset.edited")
        if not isinstance(value, dict):
            return None
        raw = value.get("val_")
        if raw is None:
            raw = value.get("val")
        try:
            return bool(int(raw))
        except Exception:
            return None

    def get_active_preset_ref(self):
        active_id = self.get_active_preset_content_id()
        if active_id is None:
            return None
        return self.get_content_ref(active_id)

    def get_snapshot_count(self):
        cmd_id = self.next_cmd_id
        vals = self.request(cmd_id, "/SnapshotCountGet", "i", [cmd_id], "/getSnapshotCount")
        if not vals or len(vals) < 2:
            return None
        try:
            return int(vals[1])
        except Exception:
            return None

    def get_active_snapshot_index(self):
        cmd_id = self.next_cmd_id
        vals = self.request(cmd_id, "/ActiveSnapshotIndexGet", "i", [cmd_id], "/getActiveSnapshotIndex")
        if not vals or len(vals) < 2:
            return None
        try:
            return int(vals[1])
        except Exception:
            return None

    def get_snapshot_targets(self, index: int):
        cmd_id = self.next_cmd_id
        vals = self.request(
            cmd_id,
            "/SnapshotTargetsGet",
            "ii",
            [cmd_id, int(index)],
            "/getSnapshotTargets",
        )
        decoded = self._decode_blob_response(vals, 2)
        if decoded is None:
            return None
        return normalize_fourcc_map(decoded)

    def get_snapshots(self):
        state = self.get_edit_buffer_state()
        if state is None:
            return None
        normalized = normalize_fourcc_map(state)
        snapshots = self._find_first_key(normalized, "snps")
        if not isinstance(snapshots, list):
            return None
        items = [item for item in snapshots if isinstance(item, dict)]
        items.sort(key=lambda item: int(item.get("si__", -1)))
        return items

    def activate_snapshot(self, index: int, wait_change: bool = True, timeout: float | None = None):
        cmd_id = self.next_cmd_id
        target_index = int(index)
        self.send("/activateSnapshot", "iii", [cmd_id, target_index, 0])
        if not wait_change:
            return None

        def predicate():
            active_index = self.get_active_snapshot_index()
            if active_index == target_index:
                return active_index
            return None

        result = self._poll_until(predicate, timeout=timeout)
        if result is not None:
            return result
        return self._handle_timeout("/activateSnapshot", cmd_id, f"snapshot {target_index}")

    def copy_snapshot(self, source_index: int, target_index: int, wait_status: bool = True):
        cmd_id = self.next_cmd_id
        args = [cmd_id, int(source_index), int(target_index)]
        if wait_status:
            return self.send_and_wait_status_code(cmd_id, "/CopySnapshot", "iii", args)
        self.send("/CopySnapshot", "iii", args)
        return None

    def set_snapshot_color(self, index: int, color: int, wait_status: bool = True):
        cmd_id = self.next_cmd_id
        args = [cmd_id, int(index), int(color)]
        if wait_status:
            return self.send_and_wait_status_code(cmd_id, "/SnapshotColorSet", "iii", args)
        self.send("/SnapshotColorSet", "iii", args)
        return None

    def load_preset_with_cid(self, content_id: int, wait_change: bool = True, timeout: float | None = None):
        cmd_id = self.next_cmd_id
        target_id = int(content_id)
        self.send("/LoadPresetWithCID", "ii", [cmd_id, target_id])
        if not wait_change:
            return None

        def predicate():
            active_id = self.get_active_preset_content_id()
            if active_id is None:
                return None
            active_ref = self.get_content_ref(active_id)
            if active_id == target_id:
                return active_ref or active_id
            if isinstance(active_ref, dict) and active_ref.get("rcid") == target_id:
                return active_ref
            return None

        result = self._poll_until(predicate, timeout=timeout)
        if result is not None:
            return result
        return self._handle_timeout("/LoadPresetWithCID", cmd_id, f"preset {target_id}")

    def load_preset_at_container_position(
        self,
        container_id: int,
        position: int,
        wait_change: bool = True,
        timeout: float | None = None,
    ):
        cmd_id = self.next_cmd_id
        target_container = int(container_id)
        target_position = int(position)
        self.send("/LoadPresetAtContainerPosition", "iii", [cmd_id, target_container, target_position])
        if not wait_change:
            return None

        def predicate():
            active_id = self.get_active_preset_content_id()
            if active_id is None:
                return None
            active_ref = self.get_content_ref(active_id)
            if isinstance(active_ref, dict):
                if active_ref.get("ccid") == target_container and active_ref.get("posi") == target_position:
                    return active_ref
            return None

        result = self._poll_until(predicate, timeout=timeout)
        if result is not None:
            return result
        return self._handle_timeout(
            "/LoadPresetAtContainerPosition",
            cmd_id,
            f"container {target_container} position {target_position}",
        )

    def save_preset_with_cid(self, content_id: int, wait_clean: bool = False, timeout: float | None = None):
        cmd_id = self.next_cmd_id
        target_id = int(content_id)
        self.send("/SavePresetWithCID", "ii", [cmd_id, target_id])
        if not wait_clean:
            return None

        def predicate():
            edited = self.is_preset_edited()
            if edited is False:
                return False
            return None

        result = self._poll_until(predicate, timeout=timeout)
        if result is not None:
            return result
        return self._handle_timeout("/SavePresetWithCID", cmd_id, f"preset {target_id}")

    def add_contents_to_container(
        self,
        container_id: int,
        content_ids,
        position: int,
        flag_a: bool | int = False,
        flag_b: bool | int = False,
        wait_status: bool = True,
    ):
        if isinstance(content_ids, int):
            content_ids = [content_ids]
        blob = self._encode_msgpack([int(content_id) for content_id in content_ids])
        cmd_id = self.next_cmd_id
        args = [
            cmd_id,
            int(container_id),
            blob,
            int(position),
            int(bool(flag_a)),
            int(bool(flag_b)),
        ]
        if wait_status:
            return self.send_and_wait_status_code(cmd_id, "/AddContentsToContainer", "iibiii", args)
        self.send("/AddContentsToContainer", "iibiii", args)
        return None

    def reorder_container_content(self, container_id: int, content_ids, position: int, wait_status: bool = True):
        if isinstance(content_ids, int):
            content_ids = [content_ids]
        blob = self._encode_msgpack([int(content_id) for content_id in content_ids])
        cmd_id = self.next_cmd_id
        args = [cmd_id, int(container_id), blob, int(position)]
        if wait_status:
            return self.send_and_wait_status_code(cmd_id, "/ReorderContainerContent", "iibi", args)
        self.send("/ReorderContainerContent", "iibi", args)
        return None

    def remove_content(self, container_id: int, content_ids, wait_status: bool = True):
        if isinstance(content_ids, int):
            content_ids = [content_ids]
        blob = self._encode_msgpack([int(content_id) for content_id in content_ids])
        cmd_id = self.next_cmd_id
        args = [cmd_id, int(container_id), blob]
        if wait_status:
            return self.send_and_wait_status_code(cmd_id, "/RemoveContent", "iib", args)
        self.send("/RemoveContent", "iib", args)
        return None

    def set_content_attrs(self, content_id: int, attrs, wait_status: bool = True):
        blob = attrs if isinstance(attrs, (bytes, bytearray)) else self._encode_msgpack(attrs)
        cmd_id = self.next_cmd_id
        args = [cmd_id, int(content_id), bytes(blob)]
        if wait_status:
            return self.send_and_wait_status_code(cmd_id, "/SetContentAttrs", "iib", args)
        self.send("/SetContentAttrs", "iib", args)
        return None

    def set_content_data(self, content_id: int, data, wait_status: bool = True):
        blob = data if isinstance(data, (bytes, bytearray)) else self._encode_msgpack(data)
        cmd_id = self.next_cmd_id
        args = [cmd_id, int(content_id), bytes(blob)]
        if wait_status:
            return self.send_and_wait_status_code(cmd_id, "/SetContentData", "iib", args)
        self.send("/SetContentData", "iib", args)
        return None

    def set_content_path(self, content_id: int, path: str, wait_status: bool = True):
        cmd_id = self.next_cmd_id
        args = [cmd_id, int(content_id), str(path)]
        if wait_status:
            return self.send_and_wait_status_code(cmd_id, "/SetContentPath", "iis", args)
        self.send("/SetContentPath", "iis", args)
        return None

    def rename_content(self, content_id: int, name: str, wait_status: bool = True):
        blob = self.get_content_ref_blob(content_id)
        if blob is None:
            return None
        decoded = decode_msgpack_blob(blob)
        if not isinstance(decoded, dict):
            raise HelixSessionError(f"unable to decode attrs for content {content_id}")
        name_key = "name"
        if name_key not in decoded and fourcc_int("name") in decoded:
            name_key = fourcc_int("name")
        decoded[name_key] = str(name)
        return self.set_content_attrs(content_id, decoded, wait_status=wait_status)

    def set_snapshot_name(self, index: int, name: str, wait_status: bool = True):
        cmd_id = self.next_cmd_id
        if wait_status:
            return self.send_and_wait_status_code(cmd_id, "/SetSnapshotName", "iis", [cmd_id, index, name])
        self.send("/SetSnapshotName", "iis", [cmd_id, index, name])
        return None

    def set_param_value(
        self,
        path: int,
        block: int,
        param_id: int,
        value,
        slot: int = 0,
        flags: int = -1,
        wait_status: bool = True,
        value_type: str | None = None,
    ):
        cmd_id = self.next_cmd_id
        if value_type in ("i", "b") or isinstance(value, bool):
            args = [cmd_id, path, block, slot, param_id, int(bool(value)) if isinstance(value, bool) else int(value), flags]
            if wait_status:
                return self.send_and_wait_status(cmd_id, "/ParamValueSet", "iiiiiii", args)
            self.send("/ParamValueSet", "iiiiiii", args)
            return None
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
