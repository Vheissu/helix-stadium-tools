#!/usr/bin/env python3
"""Inspect the Helix Stadium XL USB transport surfaces.

This script uses libusb via ctypes so it can run without additional Python
packages. On macOS it will first try the libusb that ships inside the official
Helix Stadium desktop app bundle, then common Homebrew paths.

By default it prints the device descriptor, interface descriptors, and endpoint
layout for the target device. You can optionally claim an interface, perform a
passive bulk-IN read, or send the same small ASCII commands the desktop app
uses on the vendor bulk interface.
"""

from __future__ import annotations

import argparse
import ctypes
import ctypes.util
import sys
from dataclasses import dataclass
from pathlib import Path
from typing import Iterable


DEFAULT_VID = 0x0E41
DEFAULT_PID = 0x4841
DEFAULT_TRANSFER_SIZE = 4096


def parse_int(value: str) -> int:
    return int(value, 0)


def candidate_libusb_paths() -> list[Path]:
    candidates = [
        Path("/Applications/Line6/Helix Stadium.app/Contents/Frameworks/libusb-1.0.0.dylib"),
        Path("/opt/homebrew/lib/libusb-1.0.0.dylib"),
        Path("/usr/local/lib/libusb-1.0.0.dylib"),
    ]
    library_name = ctypes.util.find_library("usb-1.0")
    if library_name:
        candidates.append(Path(library_name))
    # Preserve order while removing duplicates.
    seen: set[str] = set()
    result: list[Path] = []
    for candidate in candidates:
        key = str(candidate)
        if key in seen:
            continue
        seen.add(key)
        result.append(candidate)
    return result


class LibusbContext(ctypes.Structure):
    pass


class LibusbDevice(ctypes.Structure):
    pass


class LibusbDeviceHandle(ctypes.Structure):
    pass


class LibusbEndpointDescriptor(ctypes.Structure):
    _fields_ = [
        ("bLength", ctypes.c_uint8),
        ("bDescriptorType", ctypes.c_uint8),
        ("bEndpointAddress", ctypes.c_uint8),
        ("bmAttributes", ctypes.c_uint8),
        ("wMaxPacketSize", ctypes.c_uint16),
        ("bInterval", ctypes.c_uint8),
        ("bRefresh", ctypes.c_uint8),
        ("bSynchAddress", ctypes.c_uint8),
        ("extra", ctypes.POINTER(ctypes.c_ubyte)),
        ("extra_length", ctypes.c_int),
    ]


class LibusbInterfaceDescriptor(ctypes.Structure):
    _fields_ = [
        ("bLength", ctypes.c_uint8),
        ("bDescriptorType", ctypes.c_uint8),
        ("bInterfaceNumber", ctypes.c_uint8),
        ("bAlternateSetting", ctypes.c_uint8),
        ("bNumEndpoints", ctypes.c_uint8),
        ("bInterfaceClass", ctypes.c_uint8),
        ("bInterfaceSubClass", ctypes.c_uint8),
        ("bInterfaceProtocol", ctypes.c_uint8),
        ("iInterface", ctypes.c_uint8),
        ("endpoint", ctypes.POINTER(LibusbEndpointDescriptor)),
        ("extra", ctypes.POINTER(ctypes.c_ubyte)),
        ("extra_length", ctypes.c_int),
    ]


class LibusbInterface(ctypes.Structure):
    _fields_ = [
        ("altsetting", ctypes.POINTER(LibusbInterfaceDescriptor)),
        ("num_altsetting", ctypes.c_int),
    ]


class LibusbConfigDescriptor(ctypes.Structure):
    _fields_ = [
        ("bLength", ctypes.c_uint8),
        ("bDescriptorType", ctypes.c_uint8),
        ("wTotalLength", ctypes.c_uint16),
        ("bNumInterfaces", ctypes.c_uint8),
        ("bConfigurationValue", ctypes.c_uint8),
        ("iConfiguration", ctypes.c_uint8),
        ("bmAttributes", ctypes.c_uint8),
        ("MaxPower", ctypes.c_uint8),
        ("interface", ctypes.POINTER(LibusbInterface)),
        ("extra", ctypes.POINTER(ctypes.c_ubyte)),
        ("extra_length", ctypes.c_int),
    ]


class LibusbDeviceDescriptor(ctypes.Structure):
    _fields_ = [
        ("bLength", ctypes.c_uint8),
        ("bDescriptorType", ctypes.c_uint8),
        ("bcdUSB", ctypes.c_uint16),
        ("bDeviceClass", ctypes.c_uint8),
        ("bDeviceSubClass", ctypes.c_uint8),
        ("bDeviceProtocol", ctypes.c_uint8),
        ("bMaxPacketSize0", ctypes.c_uint8),
        ("idVendor", ctypes.c_uint16),
        ("idProduct", ctypes.c_uint16),
        ("bcdDevice", ctypes.c_uint16),
        ("iManufacturer", ctypes.c_uint8),
        ("iProduct", ctypes.c_uint8),
        ("iSerialNumber", ctypes.c_uint8),
        ("bNumConfigurations", ctypes.c_uint8),
    ]


@dataclass(frozen=True)
class BulkEndpoint:
    address: int
    direction: str
    transfer_type: str
    max_packet_size: int
    interval: int


def class_name(class_code: int, subclass: int) -> str:
    if class_code == 0x01 and subclass == 0x03:
        return "Audio / MIDI Streaming"
    return {
        0x01: "Audio",
        0x02: "CDC Communications",
        0x03: "HID",
        0x08: "Mass Storage",
        0x0A: "CDC Data",
        0x0E: "Video",
        0xEF: "Miscellaneous",
        0xFF: "Vendor Specific",
    }.get(class_code, f"0x{class_code:02x}")


def endpoint_direction(address: int) -> str:
    return "IN" if address & 0x80 else "OUT"


def endpoint_transfer_type(attributes: int) -> str:
    return {
        0: "control",
        1: "isochronous",
        2: "bulk",
        3: "interrupt",
    }.get(attributes & 0x03, f"unknown({attributes & 0x03})")


def load_libusb(explicit: str | None) -> ctypes.CDLL:
    candidates = [Path(explicit)] if explicit else candidate_libusb_paths()
    errors: list[str] = []
    for candidate in candidates:
        try:
            return ctypes.CDLL(str(candidate))
        except OSError as exc:
            errors.append(f"{candidate}: {exc}")
    joined = "\n".join(errors) if errors else "no paths tried"
    raise RuntimeError(f"failed to load libusb:\n{joined}")


def bind_libusb(lib: ctypes.CDLL) -> None:
    lib.libusb_init.argtypes = [ctypes.POINTER(ctypes.POINTER(LibusbContext))]
    lib.libusb_init.restype = ctypes.c_int
    lib.libusb_exit.argtypes = [ctypes.POINTER(LibusbContext)]

    lib.libusb_get_device_list.argtypes = [
        ctypes.POINTER(LibusbContext),
        ctypes.POINTER(ctypes.POINTER(ctypes.POINTER(LibusbDevice))),
    ]
    lib.libusb_get_device_list.restype = ctypes.c_ssize_t
    lib.libusb_free_device_list.argtypes = [ctypes.POINTER(ctypes.POINTER(LibusbDevice)), ctypes.c_int]

    lib.libusb_get_device_descriptor.argtypes = [
        ctypes.POINTER(LibusbDevice),
        ctypes.POINTER(LibusbDeviceDescriptor),
    ]
    lib.libusb_get_device_descriptor.restype = ctypes.c_int
    lib.libusb_ref_device.argtypes = [ctypes.POINTER(LibusbDevice)]
    lib.libusb_ref_device.restype = ctypes.POINTER(LibusbDevice)
    lib.libusb_unref_device.argtypes = [ctypes.POINTER(LibusbDevice)]

    lib.libusb_get_config_descriptor.argtypes = [
        ctypes.POINTER(LibusbDevice),
        ctypes.c_uint8,
        ctypes.POINTER(ctypes.POINTER(LibusbConfigDescriptor)),
    ]
    lib.libusb_get_config_descriptor.restype = ctypes.c_int
    lib.libusb_free_config_descriptor.argtypes = [ctypes.POINTER(LibusbConfigDescriptor)]

    lib.libusb_open.argtypes = [
        ctypes.POINTER(LibusbDevice),
        ctypes.POINTER(ctypes.POINTER(LibusbDeviceHandle)),
    ]
    lib.libusb_open.restype = ctypes.c_int
    lib.libusb_close.argtypes = [ctypes.POINTER(LibusbDeviceHandle)]

    lib.libusb_claim_interface.argtypes = [ctypes.POINTER(LibusbDeviceHandle), ctypes.c_int]
    lib.libusb_claim_interface.restype = ctypes.c_int
    lib.libusb_release_interface.argtypes = [ctypes.POINTER(LibusbDeviceHandle), ctypes.c_int]
    lib.libusb_release_interface.restype = ctypes.c_int

    lib.libusb_bulk_transfer.argtypes = [
        ctypes.POINTER(LibusbDeviceHandle),
        ctypes.c_ubyte,
        ctypes.POINTER(ctypes.c_ubyte),
        ctypes.c_int,
        ctypes.POINTER(ctypes.c_int),
        ctypes.c_uint,
    ]
    lib.libusb_bulk_transfer.restype = ctypes.c_int

    lib.libusb_get_string_descriptor_ascii.argtypes = [
        ctypes.POINTER(LibusbDeviceHandle),
        ctypes.c_uint8,
        ctypes.POINTER(ctypes.c_ubyte),
        ctypes.c_int,
    ]
    lib.libusb_get_string_descriptor_ascii.restype = ctypes.c_int


class USBProbeError(RuntimeError):
    pass


class USBProbe:
    def __init__(self, lib: ctypes.CDLL):
        self.lib = lib
        self.ctx = ctypes.POINTER(LibusbContext)()

    def __enter__(self) -> "USBProbe":
        rc = self.lib.libusb_init(ctypes.byref(self.ctx))
        if rc != 0:
            raise USBProbeError(f"libusb_init failed: {rc}")
        return self

    def __exit__(self, exc_type, exc, tb) -> None:
        if self.ctx:
            self.lib.libusb_exit(self.ctx)

    def find_devices(self, vendor_id: int, product_id: int) -> list[ctypes.POINTER(LibusbDevice)]:
        devices = ctypes.POINTER(ctypes.POINTER(LibusbDevice))()
        count = self.lib.libusb_get_device_list(self.ctx, ctypes.byref(devices))
        if count < 0:
            raise USBProbeError(f"libusb_get_device_list failed: {count}")
        matches: list[ctypes.POINTER(LibusbDevice)] = []
        try:
            index = 0
            while True:
                device = devices[index]
                if not device:
                    break
                descriptor = LibusbDeviceDescriptor()
                rc = self.lib.libusb_get_device_descriptor(device, ctypes.byref(descriptor))
                if rc == 0 and descriptor.idVendor == vendor_id and descriptor.idProduct == product_id:
                    matches.append(self.lib.libusb_ref_device(device))
                index += 1
        finally:
            self.lib.libusb_free_device_list(devices, 1)
        return matches

    def unref_device(self, device: ctypes.POINTER(LibusbDevice)) -> None:
        self.lib.libusb_unref_device(device)

    def get_descriptor(self, device: ctypes.POINTER(LibusbDevice)) -> LibusbDeviceDescriptor:
        descriptor = LibusbDeviceDescriptor()
        rc = self.lib.libusb_get_device_descriptor(device, ctypes.byref(descriptor))
        if rc != 0:
            raise USBProbeError(f"libusb_get_device_descriptor failed: {rc}")
        return descriptor

    def iter_config_descriptors(
        self, device: ctypes.POINTER(LibusbDevice), descriptor: LibusbDeviceDescriptor
    ) -> Iterable[ctypes.POINTER(LibusbConfigDescriptor)]:
        for config_index in range(descriptor.bNumConfigurations):
            config = ctypes.POINTER(LibusbConfigDescriptor)()
            rc = self.lib.libusb_get_config_descriptor(device, config_index, ctypes.byref(config))
            if rc != 0:
                raise USBProbeError(f"libusb_get_config_descriptor({config_index}) failed: {rc}")
            yield config
            self.lib.libusb_free_config_descriptor(config)

    def open(self, device: ctypes.POINTER(LibusbDevice)) -> ctypes.POINTER(LibusbDeviceHandle):
        handle = ctypes.POINTER(LibusbDeviceHandle)()
        rc = self.lib.libusb_open(device, ctypes.byref(handle))
        if rc != 0:
            raise USBProbeError(f"libusb_open failed: {rc}")
        return handle

    def read_string(self, handle: ctypes.POINTER(LibusbDeviceHandle), index: int) -> str | None:
        if not index:
            return None
        buf = (ctypes.c_ubyte * 256)()
        count = self.lib.libusb_get_string_descriptor_ascii(handle, index, buf, len(buf))
        if count < 0:
            return None
        return bytes(buf[:count]).decode("utf-8", "replace")

    def claim_interface(self, handle: ctypes.POINTER(LibusbDeviceHandle), interface_number: int) -> int:
        return int(self.lib.libusb_claim_interface(handle, interface_number))

    def release_interface(self, handle: ctypes.POINTER(LibusbDeviceHandle), interface_number: int) -> int:
        return int(self.lib.libusb_release_interface(handle, interface_number))

    def passive_bulk_read(
        self,
        handle: ctypes.POINTER(LibusbDeviceHandle),
        endpoint: int,
        size: int,
        timeout_ms: int,
    ) -> tuple[int, bytes]:
        buf = (ctypes.c_ubyte * size)()
        transferred = ctypes.c_int()
        rc = int(
            self.lib.libusb_bulk_transfer(
                handle,
                endpoint,
                buf,
                size,
                ctypes.byref(transferred),
                timeout_ms,
            )
        )
        return rc, bytes(buf[: transferred.value])

    def bulk_write(
        self,
        handle: ctypes.POINTER(LibusbDeviceHandle),
        endpoint: int,
        payload: bytes,
        timeout_ms: int,
    ) -> tuple[int, int]:
        if not payload:
            raise USBProbeError("bulk_write payload must not be empty")
        buf = (ctypes.c_ubyte * len(payload)).from_buffer_copy(payload)
        transferred = ctypes.c_int()
        rc = int(
            self.lib.libusb_bulk_transfer(
                handle,
                endpoint,
                buf,
                len(payload),
                ctypes.byref(transferred),
                timeout_ms,
            )
        )
        return rc, int(transferred.value)


def build_text_command(command: str, transfer_size: int = DEFAULT_TRANSFER_SIZE) -> bytes:
    encoded = command.encode("ascii")
    if not encoded:
        raise ValueError("command must not be empty")
    if len(encoded) > 0xFF:
        raise ValueError("command must fit in one byte length field")
    total_length = len(encoded) + 3
    if total_length > transfer_size:
        raise ValueError(
            f"command {command!r} needs {total_length} bytes but transfer size is {transfer_size}"
        )
    payload = bytearray(transfer_size)
    payload[0] = 0x01
    payload[1] = len(encoded)
    payload[3 : 3 + len(encoded)] = encoded
    return bytes(payload)


def describe_command_response(command: str, data: bytes) -> list[str]:
    details: list[str] = []
    if not data:
        return details
    if command == "version" and len(data) >= 4:
        version_value = int.from_bytes(data[:4], "little")
        details.append(f"version_le=0x{version_value:08x} ({version_value})")
        return details
    text = data.split(b"\x00", 1)[0]
    if text:
        try:
            decoded = text.decode("ascii")
        except UnicodeDecodeError:
            decoded = text.decode("ascii", "replace")
        details.append(f"text={decoded!r}")
    return details


def print_device_summary(
    probe: USBProbe,
    device: ctypes.POINTER(LibusbDevice),
    descriptor: LibusbDeviceDescriptor,
) -> None:
    print(
        "Device:"
        f" vid=0x{descriptor.idVendor:04x}"
        f" pid=0x{descriptor.idProduct:04x}"
        f" class=0x{descriptor.bDeviceClass:02x}"
        f" subclass=0x{descriptor.bDeviceSubClass:02x}"
        f" proto=0x{descriptor.bDeviceProtocol:02x}"
    )
    print(
        f"  bcdUSB=0x{descriptor.bcdUSB:04x}"
        f" bcdDevice=0x{descriptor.bcdDevice:04x}"
        f" configs={descriptor.bNumConfigurations}"
    )

    handle = probe.open(device)
    try:
        manufacturer = probe.read_string(handle, descriptor.iManufacturer)
        product = probe.read_string(handle, descriptor.iProduct)
        serial = probe.read_string(handle, descriptor.iSerialNumber)
        if manufacturer:
            print(f"  manufacturer={manufacturer}")
        if product:
            print(f"  product={product}")
        if serial:
            print(f"  serial={serial}")
    finally:
        probe.lib.libusb_close(handle)

    likely_private_interfaces: list[int] = []
    for config_index, config in enumerate(probe.iter_config_descriptors(device, descriptor)):
        conf = config.contents
        print(
            f"  Config {config_index}:"
            f" interfaces={conf.bNumInterfaces}"
            f" attrs=0x{conf.bmAttributes:02x}"
            f" max_power={conf.MaxPower * 2}mA"
        )
        for interface_index in range(conf.bNumInterfaces):
            interface = conf.interface[interface_index]
            for alt_index in range(interface.num_altsetting):
                alt = interface.altsetting[alt_index]
                endpoint_descriptors: list[BulkEndpoint] = []
                for ep_index in range(alt.bNumEndpoints):
                    ep = alt.endpoint[ep_index]
                    endpoint_descriptors.append(
                        BulkEndpoint(
                            address=int(ep.bEndpointAddress),
                            direction=endpoint_direction(int(ep.bEndpointAddress)),
                            transfer_type=endpoint_transfer_type(int(ep.bmAttributes)),
                            max_packet_size=int(ep.wMaxPacketSize),
                            interval=int(ep.bInterval),
                        )
                    )
                label = class_name(int(alt.bInterfaceClass), int(alt.bInterfaceSubClass))
                print(
                    f"    Interface {alt.bInterfaceNumber} alt {alt.bAlternateSetting}:"
                    f" {label}"
                    f" subclass=0x{alt.bInterfaceSubClass:02x}"
                    f" proto=0x{alt.bInterfaceProtocol:02x}"
                    f" endpoints={alt.bNumEndpoints}"
                )
                for ep in endpoint_descriptors:
                    print(
                        f"      EP 0x{ep.address:02x}"
                        f" {ep.direction}"
                        f" {ep.transfer_type}"
                        f" max_packet={ep.max_packet_size}"
                        f" interval={ep.interval}"
                    )
                if (
                    alt.bInterfaceClass == 0xFF
                    and any(ep.transfer_type == "bulk" and ep.direction == "IN" for ep in endpoint_descriptors)
                    and any(ep.transfer_type == "bulk" and ep.direction == "OUT" for ep in endpoint_descriptors)
                ):
                    likely_private_interfaces.append(int(alt.bInterfaceNumber))
    if likely_private_interfaces:
        unique = ", ".join(str(interface_number) for interface_number in sorted(set(likely_private_interfaces)))
        print(f"  Likely private bulk transport interface(s): {unique}")


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--vendor-id", type=parse_int, default=DEFAULT_VID, help="USB vendor ID (default: 0x0E41)")
    parser.add_argument("--product-id", type=parse_int, default=DEFAULT_PID, help="USB product ID (default: 0x4841)")
    parser.add_argument("--libusb", help="Path to a specific libusb shared library")
    parser.add_argument("--claim-interface", type=int, help="Claim an interface after enumeration")
    parser.add_argument(
        "--send-command",
        action="append",
        help="Send an ASCII command over bulk OUT after claiming an interface (repeatable)",
    )
    parser.add_argument(
        "--write-endpoint",
        type=parse_int,
        help="Bulk-OUT endpoint to use with --send-command (for example 0x04)",
    )
    parser.add_argument(
        "--read-endpoint",
        type=parse_int,
        help="Bulk-IN endpoint for passive reads or command responses (for example 0x85)",
    )
    parser.add_argument("--read-size", type=int, default=512, help="Read buffer size for --read-endpoint")
    parser.add_argument(
        "--transfer-size",
        type=int,
        default=DEFAULT_TRANSFER_SIZE,
        help="Bulk transfer size for --send-command payloads (default: 4096)",
    )
    parser.add_argument("--timeout-ms", type=int, default=250, help="Timeout for --read-endpoint")
    args = parser.parse_args(argv)

    if args.send_command and args.claim_interface is None:
        parser.error("--send-command requires --claim-interface")
    if args.send_command and args.write_endpoint is None:
        parser.error("--send-command requires --write-endpoint")
    if args.send_command and args.read_endpoint is None:
        parser.error("--send-command requires --read-endpoint")

    lib = load_libusb(args.libusb)
    bind_libusb(lib)

    with USBProbe(lib) as probe:
        devices = probe.find_devices(args.vendor_id, args.product_id)
        if not devices:
            print(
                f"No USB device found for vid=0x{args.vendor_id:04x} pid=0x{args.product_id:04x}.",
                file=sys.stderr,
            )
            return 1

        device = devices[0]
        try:
            descriptor = probe.get_descriptor(device)
            print_device_summary(probe, device, descriptor)

            if args.claim_interface is None:
                return 0

            handle = probe.open(device)
            try:
                rc = probe.claim_interface(handle, args.claim_interface)
                print(f"Claim interface {args.claim_interface}: rc={rc}")
                if rc != 0:
                    return 2

                try:
                    if args.send_command:
                        for command in args.send_command:
                            payload = build_text_command(command, transfer_size=args.transfer_size)
                            write_rc, written = probe.bulk_write(
                                handle,
                                args.write_endpoint,
                                payload,
                                timeout_ms=args.timeout_ms,
                            )
                            print(
                                f"Send command {command!r} endpoint=0x{args.write_endpoint:02x}:"
                                f" rc={write_rc} bytes={written}"
                            )
                            if write_rc != 0:
                                continue
                            read_rc, data = probe.passive_bulk_read(
                                handle,
                                args.read_endpoint,
                                size=args.read_size,
                                timeout_ms=args.timeout_ms,
                            )
                            print(
                                f"Read response for {command!r} endpoint=0x{args.read_endpoint:02x}:"
                                f" rc={read_rc} bytes={len(data)}"
                            )
                            if data:
                                print(f"  hex={data.hex()}")
                                for detail in describe_command_response(command, data):
                                    print(f"  {detail}")
                    elif args.read_endpoint is not None:
                        rc, data = probe.passive_bulk_read(
                            handle,
                            args.read_endpoint,
                            size=args.read_size,
                            timeout_ms=args.timeout_ms,
                        )
                        print(
                            f"Passive bulk read endpoint=0x{args.read_endpoint:02x}:"
                            f" rc={rc} bytes={len(data)}"
                        )
                        if data:
                            print(f"  hex={data.hex()}")
                finally:
                    release_rc = probe.release_interface(handle, args.claim_interface)
                    print(f"Release interface {args.claim_interface}: rc={release_rc}")
            finally:
                probe.lib.libusb_close(handle)
        finally:
            probe.unref_device(device)

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
