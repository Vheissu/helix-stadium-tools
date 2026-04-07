# Helix Stadium XL USB and Bluetooth Transport Notes

These notes capture the current state of the Helix Stadium XL wired and
Bluetooth surfaces as observed from a local macOS system and the shipped Helix
Stadium desktop app bundle.

This document is exploratory. It is not an official protocol reference.

## Current product state

- The currently documented editor workflow is Wi-Fi or Ethernet based.
- The shipped desktop app already supports connecting to the device over USB,
  but the app currently limits USB sessions to firmware updating.
- Bluetooth currently looks like an audio path rather than an editor-control
  path on macOS.

## Evidence

### Bluetooth

On macOS, `system_profiler SPBluetoothDataType` reports the paired Helix Stadium
XL with classic audio-control services (`A2DP`, `AVRCP`, `ACL`). It does not
advertise a visible BLE/GATT control surface in that view.

That makes Bluetooth audio a likely current use case, but does not support a
strong case for editor traffic over Bluetooth today.

### Desktop app bundle

The desktop app binary contains:

- `P35DeviceConnection::EthernetConnection`
- `P35DeviceConnection::UsbConnection`
- `P35DeviceManager::doUsbBrowse`
- `P35Device::StartUsbUpdate`
- `P35USBConnectedViewController`

The binary also ships its own `libusb-1.0.0.dylib`, and imports the libusb
functions needed to enumerate devices, read configuration descriptors, claim
interfaces, and exchange bulk transfers.

The app's embedded strings also indicate that USB connections currently support
firmware updating only, and that full editor features should still be used over
Wi-Fi for now.

### USB descriptors

Using libusb against a connected Helix Stadium XL (`VID 0x0e41`, `PID 0x4841`)
shows one composite USB configuration with seven interfaces:

- Interface `4`: Audio/MIDI streaming with bulk endpoints `0x02` (OUT) and
  `0x83` (IN)
- Interface `5`: HID with interrupt endpoints `0x03` (OUT) and `0x84` (IN)
- Interface `6`: vendor-specific bulk transport with endpoints `0x04` (OUT)
  and `0x85` (IN)

On the observed system:

- Interface `4` was busy because the OS had already attached its MIDI stack
- Interface `5` was busy because the OS had already attached its HID stack
- Interface `6` could be claimed directly from user space through libusb

That vendor-specific bulk interface is the strongest current candidate for
future wired editing.

## Working hypothesis

The most likely architecture is:

1. Wi-Fi editing continues to use the existing ZMTP + OSC transport.
2. USB firmware update traffic already uses the vendor-specific bulk interface.
3. A future USB editor mode may either:
   - tunnel the same OSC command set over the vendor bulk pipe, or
   - switch to a separate private framing layer that still feeds the same
     higher-level command handlers in the app.

The shipped app already contains the same OSC command names used by the current
network tooling, alongside the separate USB transport classes. That suggests the
command layer is shared even if the wire framing differs.

## Verified vendor bulk commands

The vendor bulk interface is not just present; it is live and bidirectional.

Using interface `6` with endpoint `0x04` (OUT) and endpoint `0x85` (IN), the
following host-driven commands work from user space through `libusb`:

- `version`
- `status`

Both commands use a fixed 4096-byte bulk OUT transfer. The observed command
framing is:

```text
byte 0   = 0x01
byte 1   = ASCII command length
byte 2   = 0x00
byte 3+  = ASCII command bytes
rest     = zero padding
```

Verified examples:

- `version` request prefix:
  `01 07 00 76 65 72 73 69 6f 6e`
- `status` request prefix:
  `01 06 00 73 74 61 74 75 73`

Verified responses from a connected Helix Stadium XL:

- `version` -> `35 05 01 13`
  - This is a 4-byte little-endian value: `0x13010535`
- `status` -> ASCII `idle`
- `abort` changes the reported update state:
  - after sending `abort`, subsequent `status` calls returned ASCII `abort`
  - on the observed system, that state persisted across later interface claims

These exchanges confirm that the private USB transport can already be spoken
from an external client without the official desktop app.

## Current practical conclusion

What is proven today:

- User-space software can claim the private vendor interface.
- The device accepts vendor bulk commands and returns structured responses.
- The current desktop app's USB bootstrap can be reproduced outside the app.
- The update state machine is writable from an external client (`abort` is live).

What is not proven today:

- Any editor-control command surface over USB beyond the firmware/update path.
- Any BLE/GATT control transport for editing.

So the wired transport is real, but the currently exposed command set still
looks like a firmware/update lane rather than a full edit tunnel.

## Binary-frame experiment

The update path also uses a second USB frame type for binary payloads:

```text
byte 0   = 0x02
byte 1   = payload length low byte
byte 2   = payload length high byte
byte 3+  = payload bytes
rest     = zero padding
```

This framing was reproduced locally and used to send a read-only OSC
`/ProductInfoGet` request as an experiment. That produced no direct response on
endpoint `0x85`.

Follow-up experiments tightened that result:

- a type-2 frame carrying raw `/LoadPresetWithCID` OSC produced no USB reply
  and did not change the active preset when verified over the normal network
  editor session
- a type-2 frame carrying the 12-byte `0x0108` OSC wrapper used on TCP port
  `2001` also produced no USB reply and no preset change
- repeated reads after each write still only yielded responses for `version`
  and `status`

That negative result matters: with the currently known USB frame types, we do
not yet have evidence that the device already accepts either raw OSC or the
port-`2001` wrapped OSC messages over USB.

## Low-risk next steps

1. Capture the desktop app's USB traffic during a firmware-transfer session and
   compare the bulk framing on interface `6` to the existing network OSC
   messages.
2. Diff the traffic before and after the promised wired-editing feature ships;
   that should reveal whether the app starts carrying editor commands over the
   same vendor interface.
3. Probe the HID interface only if the vendor bulk interface does not pan out.
   The current app's libusb usage and bulk-transfer imports make the vendor
   interface the better first target.
4. Treat Bluetooth as lower priority unless a firmware update exposes GATT or
   additional profiles beyond audio-control services.

## Local tooling

This repo includes [`scripts/helix_usb_probe.py`](../scripts/helix_usb_probe.py)
to inspect the connected device's USB descriptors and send simple vendor bulk
commands.

Examples:

```bash
python3 scripts/helix_usb_probe.py
python3 scripts/helix_usb_probe.py --claim-interface 6 --read-endpoint 0x85
python3 scripts/helix_usb_probe.py \
  --claim-interface 6 \
  --write-endpoint 0x04 \
  --read-endpoint 0x85 \
  --send-command version \
  --send-command status \
  --read-attempts 5 \
  --read-interval-ms 200

python3 scripts/helix_usb_probe.py \
  --claim-interface 6 \
  --write-endpoint 0x04 \
  --read-endpoint 0x85 \
  --send-command-payload size=78563412 \
  --read-attempts 5 \
  --read-interval-ms 200

python3 scripts/helix_usb_probe.py \
  --claim-interface 6 \
  --write-endpoint 0x04 \
  --read-endpoint 0x85 \
  --send-chunk-hex 2f50726f64756374496e666f476574000000002c69000000000001 \
  --read-attempts 5 \
  --read-interval-ms 200
```
