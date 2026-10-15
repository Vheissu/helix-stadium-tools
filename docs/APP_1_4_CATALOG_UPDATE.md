# Helix Stadium 1.4 catalogue update

Regenerated from the public Helix Stadium macOS app **1.4.0.20** (bundle
version `1.4.0`) on 15 October 2026. The connected device reports firmware
**1.4.0.1341**. Source file hashes are recorded in
`generated/helix-models/source.json`.

## New models

Comparing the app's `p35md-1_3_0_0.bin` and `p35md-1_4_0_0.bin` files shows
three new amps and six new effects. Each effect has mono and stereo variants,
for 15 new amp/effect definitions altogether. There are no new cab definitions
in this comparison.

| Group | Models |
| --- | --- |
| Amps | Prosecutor, Brit SL100, Omega Granophyre |
| Distortion | Rock Box Boost, Rock Box Dist, Mercator Dist, PortaBox 424 |
| Modulation | Essex Vibe, Dimension W |

The catalogue includes all 15 definitions. Brit SL100 has
Channel, Era, and Bright Cap choices; Omega Granophyre has Jack, Voice, and NFB
choices. Dimension W includes pedal/rack versions and ten mode combinations.
Those choices come from the app's UI definitions.

## Import corrections

The stereo backfill previously copied mono parameters and DSP usage. It now
reads the stereo definition on the first import. Regenerating the existing
mobile catalogue corrects six stereo DSP estimates, the Rock Box Boost Stereo
Boost default, and Essex Vibe Stereo's parameters. Essex Vibe Stereo has
Spread at parameter 5 and Level at parameter 6; its mono counterpart has Level
at parameter 5 and no Spread control.

The shared JSON catalogues, ID map, and generated knowledge documents now use
the matching mono UI definition when a stereo UI entry is absent. This gives
150 stereo effects readable names and supplies their display metadata while
retaining the stereo parameter definitions.

IO entries without display metadata are excluded from the mobile picker.
The named None output remains available.

## Verification scope

Catalogue generation runs locally. Read-only protocol checks were made
against firmware 1.4.0.1341. The mobile catalogue contains 759 block models, including 143 amps,
113 preamps, and 48 cab/IR entries. Model availability still depends on the
connected device's firmware. Audio behaviour and live edits need testing on a
spare preset with compatible firmware.
