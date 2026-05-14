# Mobile build artefacts

Sideload builds are published on the project
[Releases page](https://github.com/Vheissu/helix-stadium-tools/releases).

This directory is the local staging area when producing a new build. Binaries
here are gitignored; only this README and the local `.gitignore` are tracked.

## Signing notes

The Android APK is debug-key signed by the generated native project. It can be
installed from Android's package installer after enabling installs from the
chosen source. It is not a Play Store release build.

The iOS IPA is unsigned. A device will only install it after it is signed with
a valid Apple account, provisioning profile, or sideloading tool.
