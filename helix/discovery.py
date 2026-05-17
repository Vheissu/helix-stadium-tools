"""Bonjour discovery helpers for Helix Stadium devices."""

from __future__ import annotations

import os
import queue
import re
import shutil
import subprocess
import threading
import time
from dataclasses import dataclass

DEFAULT_SERVICE_TYPE = "_stadiumserver._tcp"
DEFAULT_DOMAIN = "local."

_BROWSE_RE = re.compile(
    r"^\S+\s+(Add|Rmv)\s+\S+\s+\d+\s+(\S+)\s+(_[A-Za-z0-9._-]+\.)\s+(.+?)\s*$"
)
_RESOLVE_RE = re.compile(
    r"\s(?P<instance>.+?)\._[A-Za-z0-9._-]+\.local\.\s+can be reached at\s+"
    r"(?P<host>[^:]+):(?P<port>\d+)\s+\(interface\s+(?P<interface>\d+)\)"
)


class HelixDiscoveryError(RuntimeError):
    """Raised when Bonjour discovery fails."""


@dataclass(frozen=True)
class HelixService:
    instance: str
    host: str
    port: int
    interface: int | None = None
    service_type: str = DEFAULT_SERVICE_TYPE
    domain: str = DEFAULT_DOMAIN


def _dns_sd_path():
    return shutil.which("dns-sd") or "/usr/bin/dns-sd"


def _terminate_process(proc: subprocess.Popen):
    if proc.poll() is not None:
        return
    proc.terminate()
    try:
        proc.wait(timeout=1.0)
    except subprocess.TimeoutExpired:
        proc.kill()
        proc.wait(timeout=1.0)


def _read_stdout_lines(proc: subprocess.Popen, lines: queue.Queue):
    assert proc.stdout is not None
    for line in proc.stdout:
        lines.put(line.rstrip("\n"))
    lines.put(None)


def _run_dns_sd(args, timeout: float, stop_on_match=None):
    command = [_dns_sd_path(), *args]
    if not os.path.exists(command[0]):
        raise HelixDiscoveryError("dns-sd is not available on this system")
    try:
        proc = subprocess.Popen(
            command,
            stdout=subprocess.PIPE,
            stderr=subprocess.STDOUT,
            text=True,
            bufsize=1,
        )
    except FileNotFoundError as exc:
        raise HelixDiscoveryError("dns-sd is not available on this system") from exc

    lines: list[str] = []
    matched = None
    q: queue.Queue = queue.Queue()
    reader = threading.Thread(target=_read_stdout_lines, args=(proc, q), daemon=True)
    reader.start()
    deadline = time.monotonic() + max(timeout, 0.1)
    try:
        while time.monotonic() < deadline:
            remaining = max(0.0, deadline - time.monotonic())
            try:
                line = q.get(timeout=min(0.1, remaining or 0.1))
            except queue.Empty:
                if proc.poll() is not None:
                    break
                continue
            if line is None:
                break
            lines.append(line)
            if stop_on_match is not None:
                matched = stop_on_match(line)
                if matched is not None:
                    break
        return lines, matched
    finally:
        _terminate_process(proc)


def parse_browse_line(line: str, service_type: str = DEFAULT_SERVICE_TYPE):
    match = _BROWSE_RE.match(line.strip())
    if not match:
        return None
    action, domain, seen_service_type, instance = match.groups()
    if seen_service_type.rstrip(".") != service_type.rstrip("."):
        return None
    return {
        "action": action,
        "domain": domain,
        "service_type": seen_service_type.rstrip("."),
        "instance": instance,
    }


def parse_resolve_line(line: str):
    match = _RESOLVE_RE.search(line.strip())
    if not match:
        return None
    return {
        "instance": match.group("instance").strip(),
        "host": match.group("host").rstrip("."),
        "port": int(match.group("port")),
        "interface": int(match.group("interface")),
    }


def browse_services(timeout: float = 5.0, service_type: str = DEFAULT_SERVICE_TYPE):
    lines, _ = _run_dns_sd(["-B", service_type], timeout=timeout)
    services: dict[str, dict] = {}
    for line in lines:
        parsed = parse_browse_line(line, service_type=service_type)
        if not parsed:
            continue
        instance = parsed["instance"]
        if parsed["action"] == "Add":
            services[instance] = parsed
        elif parsed["action"] == "Rmv":
            services.pop(instance, None)
    return list(services.values())


def resolve_service(instance: str, timeout: float = 5.0, service_type: str = DEFAULT_SERVICE_TYPE):
    def stop_on_match(line: str):
        return parse_resolve_line(line)

    _lines, matched = _run_dns_sd(["-L", instance, service_type], timeout=timeout, stop_on_match=stop_on_match)
    if matched is None:
        raise HelixDiscoveryError(f"unable to resolve Helix service '{instance}'")
    return HelixService(
        instance=matched["instance"],
        host=matched["host"],
        port=matched["port"],
        interface=matched["interface"],
        service_type=service_type,
        domain=DEFAULT_DOMAIN,
    )


def discover_first_service(timeout: float = 5.0, service_type: str = DEFAULT_SERVICE_TYPE):
    services = browse_services(timeout=timeout, service_type=service_type)
    if not services:
        raise HelixDiscoveryError(f"no Bonjour services found for {service_type}")
    return resolve_service(services[0]["instance"], timeout=timeout, service_type=service_type)
