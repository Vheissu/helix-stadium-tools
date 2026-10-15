# USB editing

Helix Stadium firmware 1.4 adds full editing over USB. The Python and mobile
clients can use the device's USB Ethernet connection for the same editing
operations available over Wi-Fi.

## Connection behaviour

The device exposes a CDC-NCM network interface. On macOS it appears as an
Ethernet interface and can advertise its editor service through Bonjour.
Python connections now resolve both IPv4 and IPv6 addresses.

The mobile app offers Automatic, USB, and Wi-Fi connection choices. On
Android, USB selects the Ethernet route and Wi-Fi selects the Wi-Fi route.
On iOS, the operating system chooses the route to the device address.
Automatic mode leaves route selection to the operating system on both.

Use the device name, such as `p35x1.local`, or its IP address. Enable Remote
Access on the device. USB editing requires firmware 1.4 or later.

## Verification limits

The public desktop app used for this update is 1.4.0.20. The connected
Helix Stadium XL reported firmware 1.4.0.1341. Python socket tests cover IPv6
connection handling, and mobile tests cover route selection and guidance.

Physical Android and iOS cable compatibility remains unverified. The phone
must support the device's USB network interface and act as USB host; adapters,
cable roles, and power requirements can affect the result. A native phone
pass is required before publishing new mobile binaries.

## Diagnostics

`scripts/helix_usb_probe.py` labels CDC-NCM interfaces in its USB inventory.
Use its read-only listing mode to inspect the connected device. USB audio,
MIDI, and firmware updating are separate functions from editor networking.

See [the 1.4 support notes](FIRMWARE_1_4_SUPPORT.md) for client changes and
[Line 6's release notes](https://kb.line6.com/helix-stadium-1-4-release-notes)
for the official release details.
