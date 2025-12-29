# Helix Editor Repo Notes

## Capturing Traffic

Use the macOS editor app for edits you want to capture. Device‑local edits do not traverse the network.

```bash
sudo /usr/sbin/tcpdump -i en0 -s 0 -U -w /tmp/helix-stadium.pcap tcp port 2001 or tcp port 2002
sudo chown "$USER" /tmp/helix-stadium.pcap
```

If the capture file is ~24 bytes, no packets were recorded. Re‑run capture and ensure the editor is connected.

Live decode:

```bash
sudo /usr/sbin/tcpdump -i en0 -s 0 -U -w - tcp port 2001 or tcp port 2002 | \
  python3 scripts/osc_pcap_dump.py --reassemble -
```
