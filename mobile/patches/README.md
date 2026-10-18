# Android TCP connection fix

`react-native-tcp-socket+6.4.3.patch` is applied by `npm install` / `npm ci`
through the `postinstall` script, including on EAS Build. The dependency is
pinned to 6.4.3 so an upgrade cannot silently omit the native fix.

The original Android USB failure was reproduced in a release build:
`Interface ethernet unreachable` was followed by a fatal
`IllegalArgumentException: No socket with id 0`. The library's JavaScript
error handler calls `destroy()` even when network selection failed before
the native client was registered. Native cleanup now treats that case as
closed and sends the close event instead of throwing on a worker thread.

The patch also:

- Accepts Android 12+ USB network transports in the wired selector.
- Resolves names and binds sockets on the selected network, without changing
  the process-wide network. Each connection attempt keeps its own selection.
- Uses an IPv6 wildcard when connecting to an IPv6 destination.
- Avoids creating a timer executor for every network-selection attempt.

USB selection does not fall back to Wi-Fi. If Android exposes neither an
Ethernet nor a USB network, the app shows cable and compatibility guidance.
This does not add a USB networking driver to phones that lack one.

Android may also detect the adapter without exposing a usable `Network`: the
Stadium advertises an IPv6 ULA without a default route, which does not meet
normal Android IPv6 provisioning criteria. See
[`ANDROID_USB_VALIDATION.md`](../../docs/ANDROID_USB_VALIDATION.md). Build 4
must not be treated as proof of working physical Android USB editing.

Run native regression tests from a generated Android directory:

```bash
./gradlew -I ../native-tests/tcp-socket.gradle :react-native-tcp-socket:testDebugUnitTest
```

The tests cover repeated failed-connect cleanup, transport selection, and
actual IPv4/IPv6 loopback connections using network-scoped name resolution.

To regenerate the patch after reviewing an upstream change, include only Java
source. Android build outputs must never be included:

```bash
npx patch-package react-native-tcp-socket --include 'android/src/main/java/'
```
