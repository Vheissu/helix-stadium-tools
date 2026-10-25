# Stomp assignment-state and revision research

Investigated on 25 October 2026, following the
[latency measurements](STOMP_COMMAND_LATENCY.md).

**No safe replacement for the full-state read was verified.** The reply scalar
tracks outgoing events. It does not by itself establish that cached assignments
are current. Production execution code remains unchanged, including fresh
validation before each command, stop-on-unconfirmed behaviour and no retries.

## Firmware scope

Static addresses in this report refer to the extracted `p35-server` from
firmware **1.4.0.1341**, using zero-based ELF addresses. Its SHA-256 is
`3bd85e9ec2e2f66d47f6c6d4a66a98874b71f16200011ad919214c68cf8b54fe`.

The connected device reports **1.4.1.1343** through `/ProductInfoGet`.
[Line 6's release notes](https://kb.line6.com/helix-stadium-1-4-release-notes)
confirm that 1.4.1 was released on 20 October 2026. No matching local server ELF
or firmware package was found. The public updater-listing attempt returned
`No apikey`, so a current package URL was not verified. No firmware was installed.
Live observations below apply to 1.4.1; claims about implementation and absence
of other routes are bounded by the older binary inspected.

## What the counter means

`/EditBufferStateGet` reaches handler `0x6036b0`, serializes state, then reads
the atomic at server offset `0x760` (`0x603888`). `/GraphGet`, at `0x617050`,
reads the same atomic (`0x617298`). Their reply serializers are `0x548a00`
(`/getEditBufferState`) and `0x548b00` (`/getGraph`), respectively.

The server constructs `HXNetwork::ThreadsafePub` at offset `0x758`.
Its publisher callback at `0x3ede60` increments the atomic at subobject offset
eight using fetch-and-add (`0x3edf10`). It puts the old value, big-endian, in an
eight-byte frame before the OSC event. A reply value of N therefore identifies
the next publisher sequence; the last assigned sequence is N−1.

Live raw-frame capture confirmed this interpretation: a full-state reply
returned 20437, followed by an eight-byte MORE frame containing
`0000000000004fd5`, then the raw `/heartbeat` frame. The next pair carried
20438. Heartbeats advance the same stream even when assignments have not changed.
This also corrects the old fixed-header description in
[the protocol notes](TECHNICAL_DETAILS.md#port-2001-device--editor).

A mutation notification can be waiting in the publisher queue before the
callback increments the atomic. Reading the same value twice does not prove
that no mutation occurred. The literal field-reference search found only the
two expensive state/graph readers above; no cheap public counter getter was
identified. This search does not rule out every indirect route in either build.

## Compact reads and their missing state

Wire signatures include the request ID.

| Request | Signature | Result and limitation |
| --- | --- | --- |
| `/CommandStateGet` | `ii` | One command record. A valid fixture command returned 229 bytes and reflected unsaved parameter/action changes. It did not change when its source was disabled. |
| `/ControllerStateGet` | `ii` | One controller record; it does not return the switch source. |
| `/ComponentControllerIDListGet` | `iii` | Controller IDs for local/context. The traced implementation reads the controller map at `+0x438`; it does not read the separate command map at `+0x470`. |
| `/GetContentData` | `ii` | The traced handler reads the content database. No live edit-buffer special-ID branch was found; saved bytes cannot validate unsaved edits. |

An internal command-ID accessor exists at `0x341740`, calling `0x341134`, but
no matching ordinary editor request was found. It also does not establish a
complete source record or ordered slot list. The public property inventory
returned 457 definition keys and 480 value keys. No assignment revision or
complete source/command-state property was identified in that inventory.

The existing guard needs the source's identity, enabled state, configuration
and ordered command slots, plus full command configuration and checks for shared
references. Individual command records cannot supply those missing facts.

## Live mutation checks

A temporary duplicate held two Press-action MIDI CC assignments on B1. These
tests edited configuration and changed snapshots; they did not call
`/ExecuteCommand` or benchmark MIDI execution.

| Change | Full-state publisher watermark | Observation |
| --- | ---: | --- |
| Baseline | 19982 | Source slots `[1, 2]`; first CC value 73 |
| First CC value set to 81 | 19983 | Compact command payload changed |
| Value restored to 73 | 19985 | Original compact payload restored |
| Source disabled | 19988 | Compact command payload stayed identical |
| Source enabled | 19991 | Source state restored |
| Snapshot changed to 1 | 19998 | Full-state snapshot changed |
| Snapshot restored to 2 | 20006 | Original snapshot restored |
| Command action set to Release | 20009 | Compact command payload changed |
| Action restored to Press | 20010 | Original compact payload restored |

Separate slot tests started at watermark 20774 with `[1, 2]`. Removing command 1
produced `[2, -1]` at 20778: the surviving command moved into the first slot.
Appending a new command produced `[2, 3]` at 20786. Reloading the saved fixture
restored `[1, 2]` at 20820. The initial test expected the vacant slot to stay
first and failed that assertion; the corrected expectation passed. Per-command
reads alone would miss this ordering change.

These increments establish coverage of the changes exercised. They are not
one-increment-per-edit revisions: unrelated events also use the counter, and
the tests do not prove publication coverage for every possible mutation.

## The read-barrier candidate

In 1.4.0, `/DeviceStateGet ,ii [requestId, deviceId]` forwards a HAL read through
handler `0x5fa400`. Its response callback at `0x61dc10` can emit a correlated
`/deviceState ,iiiiiib` message through the same publisher at server `+0x758`.
That made it a candidate marker for waiting until earlier events had drained.
Request and HAL-response callbacks enter the common operation queue, but full
ordering across every mutation producer was not established.

`/DevicesGet` with all three filters zero returned an empty child list.
`/ProductInfoGet` separately identified the registered host as 2490368.
The older implementation confirms that the host can be registered even when
the child list is empty, so the host ID was used for the read probe.

On live 1.4.1, the request returned `/success [requestId, 0]` after 59.6 ms.
No correlated `/deviceState` appeared during the 3.2-second observation;
only heartbeats arrived on the event stream. The generic harness waited for
`/status` and recorded a null response, but the raw capture contains the
successful acknowledgement. A command-connection acknowledgement is not the
required event-stream marker. The reason for the missing callback remains
unresolved, and this request cannot currently serve as the barrier.

## Conditions for a future cache

A safe cache would need an authoritative assignment baseline and continuous
64-bit event-sequence tracking, tied to the current connection and preset.
Gaps, reconnects, ambiguous resets and unknown state-changing events must force
a fresh full-state read. Relevant source, command, attachment, snapshot and
preset changes must either update a proven complete model or invalidate it.

Before each execution, a correlated read-only marker must establish that the
same publisher queue has delivered all relevant earlier mutations. A heartbeat,
elapsed quiet period or command-socket reply does not prove this. Even with a
working marker, its ordering must be traced in the matching firmware and tested
with mutations and delayed event delivery. Command acknowledgement gating and
the final selection/connection checks still apply.

The concrete next research target is the 1.4.1 server's HAL response/publication
path, or another ordinary read that reliably emits a correlated event. Until
that is proven, the full-state validation stays in place.

## Cleanup and evidence

The temporary preset was deleted. `Thank God I'm Free C (SC)` and snapshot 2
were restored; original saved bytes and command/switch assignments matched the
baseline. The library still contained 165 User presets and four setlists, with
no unsaved changes.

Local evidence is under `.codex-artifacts/stomp-revision-trace/`:

- `counter/counter-findings.md`, decompilation and assembly record the atomic's origin.
- `reads/findings.json` and `reads/barrier-findings.json` record compact-read and HAL paths.
- `hardware/counter-results.json`, `slots-results.json` and their events record mutations.
- `hardware/pub-frames.json` and `host-state-result.json` contain the framing and barrier probes.
- `hardware/cleanup-result.json` records restoration checks.
- `current-build/availability.json` records the firmware version and availability limitation.
