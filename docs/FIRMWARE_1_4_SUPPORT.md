# Firmware 1.4 support

The public Helix Stadium 1.4 release is supported by the updated model
resources and USB networking code. This pass also adds protocol features
that were missing from both the Python library and mobile client.

Sources: public desktop app **1.4.0.20** and
read-only checks against a Stadium running **1.4.0.1341**. Official changes
are described in the [Line 6 release notes](https://kb.line6.com/helix-stadium-1-4-release-notes).

## New client support

| Feature | Python | Mobile |
| --- | --- | --- |
| Expression-pedal readings | `get_expression_pedal_position(index)` | `getExpressionPedalPosition(index)` |
| Preset-library content | `get_library_content(library, sku=None)` | `getLibraryContent(library, sku?)` |
| Device-specific container queries | `get_container_contents(cid, sku=None)` | `getContainerContents(cid, sku?)` |
| Raw cab/IR spectrum request | `get_ir_spectrum(flow, block, slot=0)` | `getIrSpectrum(flow, block, slot=0)` |
| IR/clone import and deletion events | `parse_library_operation(address, values)` | `HelixEvent.libraryOperation` |

The mobile status area shows ongoing IR and clone imports/deletions, including
operations started elsewhere. It clears the activity when the corresponding
end notification arrives. It does not interpret undocumented counters as a
percentage or announce that all files succeeded.

Pedal results contain the requested index, raw position, and a raw detail
field. The connected unit returned `4095` for index 0 and `-1` for an unused
external pedal input. Those values are preserved; the API does not invent a
calibration range or convert an unavailable reading to zero percent.

SKU filtering is explicit. Leaving `sku` out retains the original request,
so existing library calls continue to work on older firmware. A successful
request with `sku="stadium"` was verified; filtering across other SKUs has
not been tested. The library selector is the device's preset-library enum,
not a content ID or a container ID. The reply uses a flattened MessagePack
layout: an array header counts records, followed by four fields per record
(content ID, type, name, SKU). Both clients decode this into content references;
`decode_library_content` is also exported by the Python package.

Spectrum requests return the raw blob without assuming its sample format.
The request and response layouts were checked in the public desktop app.
The connected preset's tested target returned error `-21`; a successful
spectrum payload still needs a supported target and a captured fixture.
There is no spectrum graph in the mobile UI yet.

Explicit `/error` responses now raise an error for the matching request in
both clients, instead of leaving it waiting for a response that will never
arrive. Python's existing `strict_status=False` option returns `None` for
these errors; strict handling remains the default.

## CLI examples

```sh
python3 scripts/helix_control.py --host p35x1.local get-expression-pedal-position --index 0
python3 scripts/helix_control.py --host p35x1.local get-library-content --library 0 --sku stadium
python3 scripts/helix_control.py --host p35x1.local list-presets --root user --sku stadium
python3 scripts/helix_control.py --host p35x1.local --duration 30 monitor --library-operations
```

For a supported cab/IR target, `get-ir-spectrum --path 0 --block 7 --slot 0
--output spectrum.bin` writes the raw reply. Use the actual raw flow, block,
and model slot from the device's edit buffer; the example location is not
guaranteed to contain a supported target.

## Model resources

All catalogue generators were rerun against the public desktop app. The
mobile catalogue has **759 model entries**, including **143 amps, 113
preamps, and 48 cab/IR entries**. The three new amps are Brit SL100,
Prosecutor, and Omega Granophyre. The six new effects include both their mono
and stereo definitions.

The generated Python-facing catalogues, model ID map, mobile model/parameter
data, and Markdown knowledge resources are updated together. See
[the catalogue notes](APP_1_4_CATALOG_UPDATE.md) and
`generated/helix-models/source.json` for provenance. These counts describe
catalogue entries, not the number of amp channels advertised by Line 6.

## Verification and remaining work

Read-only hardware checks cover the reported firmware version, expression
pedal requests, both forms of library/container queries, and an explicit
spectrum error response. Automated tests cover exact Python OSC request
layouts, legacy-request compatibility, binary payload preservation, malformed
responses, and all twelve library notification shapes. Mobile tests also
cover concurrent operations and activity cleanup.

No presets or library content were changed during verification. Import/delete
events were checked against public message registrations and synthetic
fixtures; this pass did not perform a real import or deletion. A native-phone
UI/device pass and USB cable compatibility checks remain necessary before
shipping new mobile binaries.

Useful follow-ups are a mono/stereo swap action that preserves settings,
a nested Proxy folder browser, and a decoded spectrum display. Showcase
stem separation would need its own supported service integration; the
device firmware alone does not provide that feature to this app.
