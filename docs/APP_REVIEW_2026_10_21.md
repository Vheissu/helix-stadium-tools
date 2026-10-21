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

## Build and package checks

- iOS 1.0.0 (6), source commit `af0b6eb`.
- [EAS build](https://expo.dev/accounts/beggars/projects/helyon/builds/8079489f-d0ab-40e2-a186-5b217e760b39) finished successfully.
- [Upload](https://expo.dev/accounts/beggars/projects/helyon/submissions/d66cd0c0-2371-47bb-bb57-08321925709b) completed successfully; Apple finished processing build 6.
- All 24 PNGs inside the signed IPA exactly match the replacement assets.
- Package checks found no StadiumTransfer module name, private-key markers,
  removed upload action or sampled copied-help text. The source catalogue also
  has no remaining parameter descriptions.
- The native Showcase component passed selection, play and pause checks using
  simulated song data. This was not a new hardware playback test.
- Current offline-preview screenshots were captured at 1206 × 2622 for iPhone
  and 2064 × 2752 for iPad. The old selected screenshots were replaced with
  one current iPhone image and two current iPad images.
- The revised App Review notes were saved and verified after navigating away.
- Factory Focus tone selection was checked in the iPad offline preview.

The previous hardware demonstration link was removed from the review notes
because its UI predates the artwork replacement. No new demonstration video
was recorded. Build 6 was selected and resubmitted at **4:42 pm Brisbane time on 21 October
2026**. App Store Connect confirms **Waiting for Review** under submission
`cdc46fa6-f503-4830-8816-0f0e8c8786ff`. The existing automatic-release setting
was retained. This is a review submission, not an approval or public release.

The explanation was supplied in App Review Information. No separate message
was sent through Reply to App Review. Existing external TestFlight builds were
not removed or expired; build 6 was not assigned to the external group.

One production iOS build was created and completed. No Android build was
requested or started. Changes are committed locally; no Git push was made.
