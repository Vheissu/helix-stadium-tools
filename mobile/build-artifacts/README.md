# Mobile Sideload Builds

Current artifacts:

- `android/stadium-remote-1.0.0-android-release.apk`
- `ios/stadium-remote-1.0.0-ios-unsigned.ipa`

Each artifact has a matching `.sha256` file.

## Signing notes

The Android APK is debug-key signed by the generated native project. It can be
installed from Android's package installer after enabling installs from the
chosen source. It is not a Play Store release build.

The iOS IPA is unsigned. A device will only install it after it is signed with a
valid Apple account, provisioning profile, or sideloading tool.
