# Stadium USB transport for Android

Android USB mode talks directly to the Stadium's CDC-NCM network interfaces
through `UsbManager`. It does not need Android to provision an Ethernet
`Network`, root access, a VPN, or changes to the Stadium firmware. The normal
Android USB permission prompt is required.

Only the two published Stadium product IDs (Line 6 `0e41:4841` and
`0e41:4842`) with an NCM control interface are accepted. The CDC Union
descriptor identifies the data interface. Audio, MIDI and update interfaces
are not claimed. A second attached Stadium is rejected to avoid editing the
wrong device.

The NCM driver negotiates NTB16 transfers and uses a bounded packet parser.
lwIP handles IPv6 neighbour discovery, router advertisements, address
assignment and TCP, including retransmission. The Stadium's advertised ULA
prefix identifies its `::1` USB address. The device-name field is therefore
not used in Android USB mode. Both editor ports share one USB session.

Wi-Fi and Apple platforms retain the existing socket implementation. There
is no Wi-Fi fallback from Android USB mode.

## Validation

```sh
./tests/run-stack-test.sh
# From the generated Android project:
./gradlew :helyon_stadium-usb:testDebugUnitTest
```

The native packet test runs the shipping stack against a separate IPv6/TCP
peer. The peer advertises a ULA with zero router lifetime and no DNS, matching
the Stadium firmware. It exercises both TCP connections, 10 KB transfers on
each, disconnect/reconnect, and retransmission after a dropped SYN. Address
and undefined-behaviour sanitizers run during the test.

Java tests cover NTB16 alignment, multiple datagrams, short packets, sequence
wraparound, truncated/cyclic/overlapping data, malformed input and Android
USB setup order. JavaScript tests cover data routing, cancellation and
late completion after disconnect.

These tests do not substitute for a physical Galaxy S25 Ultra / Android 16
cable test. That test must load the preset, receive a reversible edit on a
spare preset, and reconnect before hardware compatibility is called verified.

## Vendored dependency

lwIP 2.2.1, official mirror tag `STABLE-2_2_1_RELEASE`, tag object
`009c2256469004009488b3385ba269461e8eb616`, resolving to commit
`77dcd25a72509eb83f72b033d219b1d40cd8eb95`:
https://github.com/lwip-tcpip/lwip

Archive SHA-256:
`8dba54ed8e0bd46589956dadbaa262fc5d13b2a2d301b952165469a70ebc780b`

The upstream source is unmodified. Port settings are in `lwipopts.h` and
`arch/cc.h`; the original license is retained in `NOTICE` and the vendor
folder, and included in the app's third-party notices.
