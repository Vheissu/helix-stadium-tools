# Stomp command latency investigation

Investigated on 25 October 2026, after the command runner in `5212f25`.

**No substantial reduction has been verified without weakening the current
checks. Production code remains unchanged.** The existing 104–135 ms MIDI gap
includes a fresh preset/state/preset check between commands. Most of that time
is spent waiting for the Stadium to prepare the full state.

## Measurements

The same saved preset was used throughout: `Thank God I'm Free C (SC)`, snapshot
index 2. All requests in this investigation were reads. No MIDI execution,
preset loading, assignment changes or firmware changes were performed.

Twenty validation cycles alternated TCP_NODELAY off and on over one connection,
after two warm-up cycles. Each cycle kept the existing order: active preset ID,
fresh edit-buffer state, active preset ID. Replies were accepted only from the
command connection.

| Socket setting | Samples | Median complete validation | Median state read, including decode |
| --- | ---: | ---: | ---: |
| Nagle enabled | 10 | 92.53 ms | 74.48 ms |
| TCP_NODELAY enabled | 10 | 93.54 ms | 74.96 ms |

TCP_NODELAY did not improve this path. Individual preset-ID reads usually took
about 7–12 ms. The state payload was 32,686 bytes. In four separate arrival
measurements, the first response bytes arrived after 69–74 ms; the remaining
bytes usually followed within 1 ms. One sample took another 10 ms. An offline
100-sample decode measurement on the Mac had a 2.00 ms median and 2.33 ms p95.
These results put most of the delay before client decoding or fingerprint work.

These are desktop client measurements of validation requests, not a new MIDI
inter-message benchmark. The prior phone and hardware execution measurements
remain the evidence for the 104–135 ms command gap.

## Smaller reads exist, but do not replace the full check

The firmware's typed request registrations and live replies confirmed:

- `/ControllerStateGet ,ii [requestId, controllerId]` returns one controller
  record. Controller 1 returned an 89-byte blob in about 7–8 ms.
- `/CommandStateGet ,ii [requestId, commandId]` reads one command record. A
  nonexistent command returned an empty blob with status zero, so a caller must
  validate the record itself rather than accepting the status alone.
- `/ComponentControllerIDListGet ,iii [requestId, local, context]` returned an ID
  list for local switch 25, context 2. It does not return the source record's
  enabled flag or complete configuration.
- `/GraphGet` returned the signal-flow graph, not the required complete control
  graph, and still took about 64 ms in the measured request.

The first probes of the controller and command reads omitted the required ID.
The dispatcher reported “NOT known” for those signatures. That error did **not**
mean the addresses were absent; supplying the ID produced valid replies.

Individual command records do not establish the switch's current enabled
state, complete source configuration, command-slot order, or absence of another
source referencing the same command. No verified compact read supplies all
those checks together. Substituting the smaller records would therefore remove
checks currently performed before every execution.

## Options ruled out for this change

- Sending the two commands together would allow command two to execute before
  command one's acknowledgement is known. It would break stop-on-unconfirmed
  behaviour even without a retry.
- Reusing the initial group validation for command two would remove its fresh
  full-state read. Event notifications alone have not been established as an
  equivalent replacement across the separate connections.
- Queuing all three validation reads at once preserves TCP write order, but
  there is no verified guarantee that the device captures the preset IDs and
  state in that same order. The existing before/after bracket remains intact.
- Starting command two's validation while command one's acknowledgement is
  pending could leave a completed validation waiting behind a delayed
  acknowledgement. Reusing it would change the current freshness guarantee.
- Issuing the final preset-ID request immediately after the full-state reply,
  then decoding and comparing while that request is pending, preserves the
  bracket. It can hide only about 1–2 ms of local work here. No material hardware
  improvement has been demonstrated, so this added path was not shipped.

A useful larger improvement needs a verified fresh source/command-state read,
a revision token covering every relevant change, or a device-side conditional
execution operation. Those remain research possibilities, not supported app
capabilities. Retries remain disabled.

Local evidence is in `.codex-artifacts/stomp-latency/`: `controlled-reads.json`,
`state-arrivals.json`, the typed read probes, and `read-xrefs.txt`.

The follow-up [assignment-state investigation](STOMP_ASSIGNMENT_STATE_RESEARCH.md)
traces the reply scalar to the event publisher, tests source and command changes
on a spare preset, and records why the compact reads and candidate read barrier
still cannot replace fresh full-state validation.
