# Android USB validation

Status on 18 October 2026: **physical Android USB editing is not verified**.
The owner confirmed build 4 no longer crashes but still reports no USB
connection on a Galaxy S25 Ultra running Android 16. iPad USB works.

The replacement Android USB implementation uses UsbManager and an app-owned
CDC-NCM / IPv6 / TCP transport. It is implemented in
[`mobile/modules/stadium-usb`](../mobile/modules/stadium-usb/README.md), with
43 JavaScript tests, 11 Java tests, and a successful packet-level connection,
transfer, retransmission and reconnect test. A physical Galaxy cable retest
is still required.

## Confirmed findings

The extracted public Stadium 1.4 firmware contains:

- `etc/dnsmasq-usb-ncm.conf`: `port=0`, `ra-only`, and
  `ra-param=usb0,60,0`. It provides no DHCP address lease, runs no DNS server,
  and advertises an on-link IPv6 prefix with router lifetime zero.
- `usr/sbin/p35-usb-ncm-setup.sh`: assigns a per-device `fd…::1/64` IPv6 ULA
  to the USB interface.

Build 4 uses `ConnectivityManager.getAllNetworks()` to find a wired Android
`Network`, then binds TCP sockets and DNS resolution to it. That build does not
implement a USB-host CDC-NCM driver or a separate IP stack.

AOSP Ethernet creates its connected NetworkAgent after IP provisioning
succeeds. Normal IPv6 provisioning requires a preferred global IPv6 address,
a default route, and a DNS server. Android excludes ULA addresses from that
preferred-global-address check. The normal Ethernet path does not request
IPv6 link-local-only provisioning.

This is evidence of a compatibility gap in the current approach, not proof
of the exact failure on the owner's unidentified phone. Vendor networking
implementations and Android versions can differ.

## Android runtime probe

A probe invoked the actual Android API 34 `LinkProperties` implementation
using constructed network descriptions. Results:

| Network description | IPv6 provisioned |
| --- | --- |
| Stadium-style ULA and on-link route | false |
| ULA, on-link route and DNS | false |
| ULA, DNS and default route | false |
| Global-scope address, DNS and default route | true |

The probe source and output are saved locally under
`.codex-artifacts/android-usb-provisioning/`. It uses framework reflection
from an emulator shell for diagnosis only; it is not app code or a proposed
way to access hidden APIs from the app. No actual USB device or packets were
involved. The emulator image does not run the Ethernet service, so it cannot
reproduce the complete physical Ethernet provisioning sequence.

## Required physical test

Use wireless ADB while the phone's USB port is connected to the Stadium.
Record the phone model, Android version, Stadium firmware, and cable. Inspect
USB enumeration, Ethernet service state, IP addresses/routes and the networks
visible to the app during a direct-USB build connection attempt. This distinguishes:

1. The Stadium not enumerating as a USB peripheral.
2. Its NCM interface lacking a working host driver.
3. A detected interface failing Android IP provisioning.
4. An exposed wired network failing name resolution or TCP connection.
5. A connected editor failing protocol synchronisation.

Completion requires an actual wired session loading the preset and receiving
a reversible edit on a spare preset, plus disconnect/reconnect. Confirm the
session uses USB, with no Wi-Fi fallback. Do not modify Stadium firmware,
phone system networking, or live presets to manufacture a successful test.

The new app-owned USB-host transport implements NCM framing, lwIP IPv6/TCP,
permission handling and disconnect cleanup. It claims only the Stadium NCM
control/data interfaces and does not change the device firmware or phone
network settings. The original TCP socket patch remains for safe Wi-Fi errors.

## Sources

- [AOSP EthernetNetworkFactory](https://android.googlesource.com/platform/packages/modules/Connectivity/+/refs/heads/main/service-t/src/com/android/server/ethernet/EthernetNetworkFactory.java)
- [AOSP LinkProperties](https://android.googlesource.com/platform/packages/modules/Connectivity/+/4416f38e4f624ed9562eb9ce7d33c4c0d5dc9bcf/core/java/android/net/LinkProperties.java)
- [Android 35 LinkAddress](https://android.googlesource.com/platform/prebuilts/fullsdk/sources/+/refs/heads/androidx-constraintlayout-release/android-35/android/net/LinkAddress.java)
- [Firmware 1.4 findings](FIRMWARE_1_4_RELEASE_RESEARCH.md)
