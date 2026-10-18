# HELYON launch assets

`helyon-mark.svg` is the editable vector emblem used for the native launch
screen and Android adaptive-icon foreground. `helyon-monochrome.svg` provides
the same silhouette for Android themed icons. Their 1024 × 1024 PNG exports
retain transparency and padding; do not trim them.

The visible mark stays within Android's central adaptive-icon safe circle.
The launcher supplies the background and outer shape. iOS and store listings
use the opaque square icon at `../helyon-icon.png`.

The splash background matches the app's `#0a0a0c` surface. It remains visible
while the bundled fonts load and hides after the first app layout, with no
minimum display time. A font-loading error also allows the app to open.

Export either SVG at its intrinsic 1024 × 1024 size with a transparent
background when updating its matching PNG. The committed exports were rendered
with `@resvg/resvg-js`; no renderer is required to build or run the app.

Changes to splash or launcher assets require new native builds. Verify the
launch screen in a release build, because Expo Go and development builds can
show a different launch experience.

Use ad-hoc signing for local iOS Simulator release builds. An unsigned app can
run while iOS rejects its launch-screen resources, displaying a blank launch
screen instead. Both platform launch sequences were checked with recordings
from installed release builds on 18 October 2026.
