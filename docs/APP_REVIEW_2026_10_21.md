# iOS review follow-up, 21 October 2026

Apple rejected version 1.0.0 (4) under guideline 5.2.1. Its message cited
third-party content or features and marketing that controls Helix Stadium
hardware, and requested documentary evidence of authorisation.

The owner confirmed that no manufacturer permission has been obtained.
The next build makes these changes:

- Replaces all 24 extracted category and connection icons with original artwork.
- Removes song upload, the native SFTP module, the credential preparation
  script and the production build credential. Existing-song playback stays.
- Removes the copied parameter-help catalogue and 6,186 non-empty descriptions.
  General parameter help now uses original wording.
- Keeps factory Focus tone definitions at the owner's explicit request.

Model identifiers, labels, ranges and factory Focus definitions remain in the
app. Do not claim that every bundled item is original or licensed, or that the
artwork replacement alone resolves the rejection.

## Review response draft

HELYON is an independently developed, unofficial controller for a user's own
Helix Stadium or Stadium XL. Preset editing communicates directly with the
device over local Wi-Fi or compatible USB networking after the owner enables
Remote Access. It does not require a Line 6 account, access Line 6 cloud APIs,
install modified firmware, or bypass device authentication for preset editing.

We have replaced the extracted category and connection icons with original
artwork and replaced copied parameter-help text with our own explanations.
We have also removed song upload, including its native file-transfer module
and editor-derived credentials. Showcase browsing and playback now operate
through the same local control interface as preset editing.

The app retains model/control metadata for interoperability and factory Focus
tone definitions for its optional tone pads. The listing identifies HELYON as
unofficial and states that it is not affiliated with or endorsed by Line 6 or
Yamaha. Product names identify compatible hardware and its controls.

Please reconsider the hardware-control concern in light of this local,
owner-enabled operation. If the remaining concern is specific bundled content,
a trademark use or another feature, please identify it and the documentation
you require so we can address that item directly.

## Verification

- 114 JavaScript tests passed, including original-help and shipped-catalogue checks.
- Five mobile-catalogue generator tests passed.
- TypeScript passed; lint has no errors and two existing App hook warnings.
- The inspected EAS archive contains no transfer module, credential file,
  credential-preparation script or copied fallback help catalogue.
- Local iOS Simulator Release build passed. Native linking contains StadiumDiscovery
  and excludes StadiumTransfer/libssh2.

Build, upload and store preparation results will be recorded after completion.
