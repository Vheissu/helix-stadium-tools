# Showcase songs in HELYON

Open **Library → Showcase** to see the songs stored on your Stadium. Select a song to load it, then use **Play**, **Pause** or **Stop**. Loading and starting a song require a saved preset because song flags can switch presets during playback. Pause and Stop remain available when a preset has edits.

Choose **Upload song**, select the audio files, name the tracks and song, and enter the tempo and time signature. Keep HELYON open until the Stadium confirms that import has finished. The new song appears in the library without changing the selected song or preset.

The first release accepts:

- One to eight prepared WAV tracks, at 48 kHz and 16-bit PCM, mono or stereo.
- Up to 13 minutes per track and less than 1 GB of combined audio.
- A time signature with 1–16 beats and a beat unit of 2, 4, 8 or 16.
- A microSD card inserted in the Stadium.

Export stems from the same start point so they stay aligned. HELYON uploads prepared audio; stem separation remains a separate server service. Automatic audio conversion, playlist editing and song-flag editing are not included in this release.

The first upload pairs with the device's identity. If a paired identity changes, HELYON asks before trusting it again. A firmware update or reset can change that identity. The upload form rejects an existing song name to avoid accidentally importing a second copy.

## Transfer and archive implementation

`mobile/src/protocol/songArchive.ts` validates the WAV headers, checksums and duration, then streams the archive without loading complete audio files into JavaScript memory. It preserves the source WAV bytes. The archive contains:

1. Three little-endian 64-bit values: `0x59474747`, `0x534f4e47`, `0x100`.
2. A gzip-compressed POSIX tar with `manifest.json`, `song.json` and `Audio/song/TrackN.wav`.
3. Manifest records containing path, media type, byte length and CRC32 of each uncompressed entry.

The START flag retains the current preset and snapshot. The END flag is calculated from the longest track, tempo and time signature, rounded up to the next tick at 240 PPQN.

The scoped `@helyon/stadium-transfer` module uses the same file-transfer account as the official editor. It pins the observed host identity before authentication, streams into an operation-specific staging file, verifies its size, and pauses for a fresh library/microSD check before committing. A rename alone does not trigger import on the tested firmware: reopening the complete archive and rewriting its first byte triggers the normal device importer. Cancellation removes only the current operation's uncommitted files. Once the importer starts, the app waits for its result rather than deleting or retrying the song.

`volatile.song.ingestion.result` is correlated by archive name. Progress reaching 100% is insufficient: success requires `audio_write_confirmed=true`, a valid content ID and a matching song returned by the library. An interrupted confirmation tells the user to refresh before retrying.

The song list reconciles the generic container query with explicit `P35` and `P37` Stadium-family queries. Live testing found valid imported songs absent from the generic and `ALL` views, while the explicit family views returned them. Additional records and recently confirmed imports are verified with `GetContentRef` before display. Import confirmation also verifies the returned ID directly with that query. Playback uses `SetCurrentSong`, `TransportPlay`, `TransportPause` and `TransportStop`. The tested firmware reports state 1 while playing and state 3 after both Pause and Stop, so the UI uses **Not playing** for that shared state.

## Local development and release configuration

Run `npm install` in `mobile`. Its postinstall step prepares ignored transfer credentials from a supported, installed official macOS Stadium editor, or from `STADIUM_SFTP_CREDENTIALS_BASE64` containing base64-encoded JSON with a `keys` array. The extraction checks the exact editor binary hash before using its data. No private keys are committed, printed or fetched from the device.

A machine without either credential source can develop the rest of the app; the upload button is unavailable. The EAS post-install hook requires credentials so a future release cannot silently ship with uploads disabled. Configure that secret only when a release build is actually requested. A local simulator build uses Xcode and does not consume EAS build credits.

The native dependencies are libssh2/OpenSSL on iOS and JSch/Bouncy Castle on Android. Their notices are included in the app's open-source notices. The iOS file-writing boundary passes plain `Uint8Array` values: passing the Buffer subclass to Expo FileSystem's native typed-array conversion caused a simulator crash during testing.


## Verification on 19 October 2026

- Built the iOS Release app locally and ran it in an iPhone 17 Pro simulator connected to the real Stadium over the Mac's Wi-Fi. No EAS build, upload or store submission was used.
- Selected audio through the native Files picker. A 20-second stereo song and a 20-second two-track mono/stereo song were imported successfully. Both returned `audio_write_confirmed=true`; their stored song metadata contained the expected track names, paths and timing.
- Verified the complete library after reconnecting, and checked native Play, Pause, resume and Stop against live device state. The playback fixture contained silence. This verifies the controls and state changes; it is not an audible output-quality assessment.
- Cancelled a larger audio file during preparation. No song was created and the device's archive folder remained empty. Mid-transfer network loss and background suspension have not been induced on a physical phone.
- Removed four temporary songs and the simulator-created preset. Both libraries matched their original contents, the original song was selected again, and 44C's stored bytes were unchanged with no unsaved edits. The user had explicitly allowed discarding 44C's earlier unsaved test edit.
- Passed 98 JavaScript tests, TypeScript checking and lint with no errors (two pre-existing App warnings). The iOS native build and Android transfer-module Java compilation passed. Android runtime uploads remain unverified.

Local evidence and backups are in `.codex-artifacts/showcase/`; native preset/Focus evidence is in `.codex-artifacts/preset-focus/`. Continuous touch dragging remains a real-device check because the simulator automation delivered drag attempts as taps.
