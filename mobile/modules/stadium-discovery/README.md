# Stadium discovery

Finds the `_stadiumserver._tcp` services advertised by Helix Stadium devices,
matching the discovery method documented in `docs/TECHNICAL_DETAILS.md` and used
by `helix/discovery.py`.

iOS uses `NSNetServiceBrowser`; Android uses `NsdManager`. There are no additional
runtime dependencies. iOS declares the service type in `NSBonjourServices` through
`mobile/app.json` and uses the app's existing Local Network permission description.

`discover(requestId, timeoutMs)` returns resolved `{ name, host, port, type }`
records after a bounded scan. `cancel(requestId)` stops only that scan. Both
platforms ignore late callbacks after a scan finishes, remove departed devices,
and limit each scan to 64 services. Android serializes service resolution across
scans for older OS versions. App teardown stops discovery.

The connection screen cancels its scan when it unmounts, starts connecting, or
moves into the background. Results stay in memory. Choosing a device fills the
connection target; it does not connect or change device settings. Manual address
entry remains available. Android's direct USB mode does not use this module.

Verification:

```bash
cd mobile
npm test
npm run typecheck
npm run lint
```

Rebuild the native apps after adding this module. A JavaScript update alone cannot
add discovery to an existing installation. Physical-device testing must include
Local Network permission denial and guest networks that block device discovery.
