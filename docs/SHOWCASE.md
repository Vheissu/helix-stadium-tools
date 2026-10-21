# Showcase songs in HELYON

Open **Library → Showcase** to browse songs already stored on the Stadium.
Select a song to load it, then use **Play**, **Pause** or **Stop**. Loading and
starting a song require a saved preset because song flags can switch presets.
Pause and Stop remain available when a preset has edits.

Add songs with the official Stadium editor, then refresh HELYON's song list.

## Song upload removed for the 21 October review build

The owner requested removal of song upload while Apple's 5.2.1 review is
addressed. The upload form, JavaScript transfer service, native SFTP module,
credential-preparation script and build hook have been removed. The production
EAS transfer credential was deleted. No transfer credentials are required to
install dependencies or build the app.

Local OSC song browsing, selection and transport controls remain. The song
list still checks explicit Stadium-family containers and verifies content
references. Selection and playback still check the active song and unsaved
preset state before issuing commands.

The old archive utilities and their unit tests remain as unreferenced developer
code. They are not imported by the app and cannot upload files. The former
upload implementation and its hardware-validation record are available in Git
history before this removal; they do not describe the current release.
