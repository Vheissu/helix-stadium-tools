# Remote Stomp B triggering: hardware follow-up

Tested on 25 October 2026. **A later [firmware trace](STOMP_FIRMWARE_TRACE.md)
found and verified `/ExecuteCommand`, which executes existing Command Center
assignments by ID.** This report records the earlier eight negative tests;
it does not rule out that newly verified route. Full physical-switch
behaviour is still unimplemented, and HELYON's Stomp buttons remain read-only.

The requirement is to invoke the existing switch, preserving its assignments
and Press, Release, Hold and Toggle behaviour. Sending reconstructed MIDI
messages, changing snapshots or moving assignments to another controller would
not satisfy it.

## Physical reference

A temporary preset, `HELYON Remote Stomp Test`, was created in an empty User
slot. Stomp B1 retained its Deluxe Comp bypass assignment and received two
Command Center MIDI CC assignments, both with the Press action:

| Command | Channel | CC | Value | USB bytes |
| --- | --- | --- | --- | --- |
| 1 | 16 | 119 | 73 | `BF 77 49` |
| 2 | 15 | 118 | 74 | `BE 76 4A` |

The user selected Stomp B and pressed B1 once. The event capture recorded
`server.floorboard.mode = 2` before the press and no later mode change during
the probes. The device property definition labels value 2 `StompB`; a subsequent
readback still returned 2. CoreMIDI captured both messages,
in order. The device event stream also reported the bypass change and both
command executions:

```
/setBlockEnable ,iiiii [66050, 9, 0, 1, 0]
/executeCommand ,iiii [66050, 1, 1, 1]
/executeCommand ,iiii [66050, 2, 2, 1]
```

The saved assignment graph identifies B1 as source `id__ = 1`, `type = 1`,
`locl = 25`, `ctxt = 2`, with `cmds = [1, 2]`. Its `sm__.scid` entry maps to
controller ID 1, whose target is Deluxe Comp bypass. The controller and command
IDs occupy separate tables; their shared numeric value is not evidence that
one request addresses both.

The earlier physical capture identified B1's hardware component as
`0x01190201`. Its `/stomp` press/release events came from the device's event
stream.

## Eight additional remote tests

All tests used the temporary preset. The table lists arguments **after** the
request ID automatically added by the client. Each request was followed by edit
buffer readback, command-event inspection and a USB MIDI capture window.

| Request | Arguments | Observed result |
| --- | --- | --- |
| `/activateController` | `1` | Controller event; no MIDI or command execution |
| `/ControllerValueSet` | `1, 0.0` | Actual assigned block bypass changed; no MIDI or command execution |
| `/ControllerValueSet` | `1, 1.0` | Actual assigned block bypass changed back; no MIDI or command execution |
| `/ControllerValueSet` | `0x01190201, 0.0` | No relevant graph change, MIDI or command execution |
| `/ControllerValueSet` | `0x01190201, 1.0` | No relevant graph change, MIDI or command execution |
| `/activateController` | `0x01190201` | No relevant graph change, MIDI or command execution |
| `/SourceEnableSet` | `25, 2, 0` | B1 source `byps` changed from false to true; no MIDI or command execution |
| `/SourceEnableSet` | `25, 2, 1` | B1 source `byps` changed from true to false; no MIDI or command execution |

The controller-value tests changed actual block bypass. The source-enable
tests changed only `srcs[].byps`, leaving the signal-flow graph unchanged.
These readbacks establish that the requests reached the real control graph. They do not establish switch-press semantics. In all eight
remote tests, neither assigned MIDI message nor an `/executeCommand` event was
observed. Command configuration and command runtime state stayed unchanged
through the remote tests. The physical reference had changed the runtime
`togl` fields; these must not be confused with rewritten assignments.

These results supplement the previous command-port rejections of `/stomp`,
`/executeCommand` and `/setCommandToggle`, documented in
[MOBILE_LIBRARY_AND_SNAPSHOT_CONTROLS.md](MOBILE_LIBRARY_AND_SNAPSHOT_CONTROLS.md).
Do not treat their notification names as callable editor commands.

Port 2003 is not an alternative command inlet: the captured official editor
handshake advertises `SUB`, and the device advertises `PUB`. It carries outgoing
events. No firmware, firewall or internal hardware-service changes were made.

## Public MIDI support

The [Stadium v1.4 MIDI manual](https://manuals.line6.com/en/helix-stadium/live/midi)
lists CC36 for the toe switch and CC37 for footswitch-mode selection. It does
not list Stomp A/B switch emulation. The old Helix CC49–58 range has different
Stadium functions, including song navigation, transport and looper control.
Do not send those legacy CCs as a Stomp B test.

The [Command Center manual](https://manuals.line6.com/en/helix-stadium/live/command-center)
documents two commands per Stomp switch and their Press, Release, Hold and
Toggle actions. It does not document an incoming MIDI control that invokes an
existing Stomp source's command group.

## Conclusion and remaining gaps

Claude reviewed the documented control routes and test evidence. Those eight tests support a narrow conclusion: **the tested controller and
source-enable requests do not invoke the existing switch's Command Center
group.** The later capitalized `/ExecuteCommand` request does run stored
commands. See the [firmware trace](STOMP_FIRMWARE_TRACE.md) for the verified
request and remaining limits.

A new candidate needs evidence of an actual editor request or a documented
Stadium input mapping. Before enabling a phone control, verify both command
executions and their MIDI output alongside any bypass assignments, then check
Toggle alternation and Release/Hold behaviour. No remote candidate passed the
initial Press test, so those additional behaviours remain unverified.

Five-pin MIDI Out was not measured; no MIDI cable/interface was available.
The physical reference and negative remote results above concern USB MIDI.

After testing, the temporary preset was removed. The original preset,
snapshot, all 165 occupied User slots and four setlists matched the initial
state. Original preset bytes were unchanged and no unsaved changes remained.
Local captures, per-request state snapshots and Claude's review are saved in
`.codex-artifacts/remote-stomp-followup/` and are not included in source control.
