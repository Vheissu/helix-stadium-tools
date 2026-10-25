# Matching firmware and the missing Stomp read barrier

Investigated on 25 October 2026, after the
[assignment-state research](STOMP_ASSIGNMENT_STATE_RESEARCH.md).

**Firmware 1.4.1.1343 registers the HAL state reply under the wrong address.**
The HAL sends `/halDeviceState`; the active server registration expects
`/enableDevice`. The public `/DeviceStateGet` acknowledgement only confirms
forwarding, so it can succeed while the response never reaches the callback
that would publish `/deviceState`.

No safe replacement for full-state validation was verified. A separate
same-publisher marker exists, but it triggers a touchscreen cache-flush request.
The app's execution checks and no-retry behaviour remain unchanged.

## Matching release acquired and verified

The official updater listing identifies release **13977**, version
**1.4.1.1343**, released 20 October 2026. The downloaded file is
[`stadium-release-ota-p35_1_4_1_1343.swu`](https://l6c-acdn2.line6.net/media/software/13977/stadium-release-ota-p35_1_4_1_1343.swu).
[Line 6's release notes](https://kb.line6.com/helix-stadium-1-4-release-notes)
also confirm the 1.4.1 release.

| Check | Result |
| --- | --- |
| Download size | 2,679,897,088 bytes, matching the release metadata |
| Vendor MD5 | `ff73607812d21161f52abf03a5f3ae8c`, matching the complete download |
| Archive SHA-256 | `a3d6433c04403c9b66da7e2d192206159df69109166a2aa815e89c3fa6f4fe9a` |
| Manifest signature | Verified with the public key from the preceding official firmware |
| Payload hashes | All six match the signed manifest |
| Extracted version | `1.4.1.1343`, build date `1791993838`, matching the connected device |

The image was extracted offline into
`generated/firmware/release-1.4.1-research/`. Its LUKS volume key differs from
1.4.0. The bootloader payload and the four relevant boot-memory driver functions
match the earlier release, allowing the existing recovery method to be verified
and reused. The recovered key passed the independent LUKS digest check. Private
key material and firmware contents remain in the Git-ignored research directory.
Nothing was installed on the Stadium.

The **server, HAL and floorboard executables are byte-identical to 1.4.0**.
The touchscreen executable changed, so its consumer behaviour was traced in
the new image separately.

| Executable | 1.4.1 SHA-256 |
| --- | --- |
| `p35-server` | `3bd85e9ec2e2f66d47f6c6d4a66a98874b71f16200011ad919214c68cf8b54fe` |
| `p35-hal` | `cfdcfb6a318390197b6e81495b7dd672cc8537ece121dd5270825b8492964015` |
| `p35-touchscreen` | `15f894d25530e293922448152be54285af6aac65a0934d13c3ba2772269d067c` |

## Why the HAL read never becomes a public event

Addresses below are zero-based ELF addresses in the matching release.

1. Server request handler `0x5fa400` serializes `/getDeviceState` through
   `0x4d5a90`, forwards it to HAL, and immediately sends `/success`. It does not
   wait for HAL completion.
2. HAL startup registers the request through `0x1d3040`. Its implementation at
   `0x1d2834` echoes the requested device ID with an empty state blob and status
   zero. Serializer `0x1fe730` emits `/halDeviceState ,iibi`.
3. Server startup at `0x2eb6f8` calls custom registrar `0x5ce2d0` for the HAL
   dispatcher. That registrar selects `/enableDevice` at `0x5ce2ec`, copies its
   13 bytes, and registers types `iibi` with callback `0x5d3990` at `0x5ce388`.
4. The callback would dispatch to `0x61dc10`, which can publish `/deviceState`
   through the shared event publisher. The actual HAL reply address does not
   match its registration, preventing that normal path from reaching the callback.

A correct generic `/halDeviceState` registrar exists at `0x4d8720`, but no
direct calls or function-pointer references to it were found. Its presence in
the binary does not repair the custom registrar used during startup.

The empty payload is not the cause. The standalone response handler permits
an empty blob and would publish after a successful device lookup. Nor does the
HAL stub reject the host ID. The address mismatch occurs before either check.

The repeated live probe used the public host ID **2490368** from
`/ProductInfoGet`, with the correct request signature. It received
`/success [requestId, 0]` after **74.99 ms**. Raw capture for **5.08 seconds**
contained ten publisher frames: five sequence/heartbeat pairs, with contiguous
sequences 22233–22237. No `/deviceState` frame arrived. This agrees with the
matching-firmware registration defect and rules out the app merely failing to
decode a received marker.

No internal `/enableDevice` request was used as a workaround. It is a separate
HAL address, not a verified public read operation.

## The alternate marker has a touchscreen side effect

`/playViewUpdateReady ,i [requestId]` is registered on the ordinary editor
interface. Server handler `0x5dbab0` copies the request envelope and publishes
`/playViewUpdateReady ,ii [origin, requestId]` through the same publisher used by
assignment changes. That makes it look useful as a correlated queue marker.

Its consumers make it unsuitable as a neutral read barrier. In the current
touchscreen binary, the registered receiver forwards to `0xdb24a0`, which
creates `{resm:true}` and dispatches internal UI event `0xa1`. It does not filter
the event to the originating client. The concrete event registration at
`0xa0d450` invokes `0x9ebba0` and then `0xd901a0`. When its connection flags permit,
that handler calls `0xd366a0`, which serializes **`/playviewFlushCache`** through
`0xe23cc0` and sends it at `0xd36744`.

Thus using the ready message for validation can make the touchscreen send a
second protocol request. Server handler `0x5dc3f0` then broadcasts that cache-flush
message through the publisher; no server assignment or DSP mutation was found
in that handler. This research does not establish that all subsequent client
cache-flush effects preserve pending UI work. The ready message was not sent as
a live probe and is not enabled as a fast path.

The floorboard also receives the ready event, but its concrete display listener
uses a skipped no-op callback; no floorboard resume effect was established.
The installed macOS app, version 1.4.0.20, has no dedicated ready-message receiver
in the inspected executables and frameworks.

## Other routes and remaining safety requirements

Seventeen parameter, snapshot, expression, LED, transport and property getters
were traced. Their editor replies use the direct command channel, not the
assignment publisher. Expression and LED reads do wait for internal HAL replies,
but those callbacks resolve pending requests without providing the required
public event marker.

An empty `/doAgenda` is also unsuitable: it allocates an undoable operation and
enters the history engine, with no zero-command guard before history updates.
Its acknowledgement is direct. No live empty-agenda test was performed.

For five ordinary mutation paths examined, publication occurs inline before
the handler returns: source enable, command parameters, attachment, removal
and snapshot activation. That is useful ordering evidence, but it does not
cover every preset-load, physical-control, HAL or undo path. A shared publisher
alone is not a complete proof that an assignment cache is current.

A future fast path still needs a side-effect-free correlated marker or a
complete compact assignment read. A marker-based implementation also needs a
verified baseline, continuous 64-bit event tracking, conservative invalidation
and full-state fallback, with ordering established for every relevant mutation.
Fixing the HAL registration would make that read a candidate again; it would
not by itself finish the cache-safety proof.

## Device checks and local evidence

This pass installed no firmware, changed no presets and executed no MIDI
commands. The final read-only check confirmed `Thank God I'm Free C (SC)`,
snapshot 2, identical original saved bytes, 165 User presets, four setlists
and no unsaved changes.

Acquisition, signature/hash checks, extracted version and binary comparisons
are under `generated/firmware/release-1.4.1-research/`. Trace evidence is under
`.codex-artifacts/stomp-revision-trace/`:

- `current-build/`: official release metadata and matching-binary registration disassembly.
- `hal-old/`: HAL sender, active receiver registration, startup call and response-handler traces; server/HAL byte identity makes these applicable to 1.4.1.
- `alternate-barriers/`: the 17 compact getter paths.
- `noop-barriers/`: ready-message, touchscreen and empty-agenda traces.
- `ready-consumers/`: macOS app and floorboard consumer findings.
- `hardware/host-state-raw-result.json`: repeated raw-frame probe.
- `hardware/current-build-final-check.json`: final device-state verification.
