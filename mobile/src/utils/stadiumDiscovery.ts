export interface StadiumDevice {
  name: string;
  host: string;
  port: number;
}

export interface DiscoveryTransport {
  discover: (requestId: number, timeoutMs: number) => Promise<unknown>;
  cancel: (requestId: number) => void;
}

export function parseStadiumDevices(value: unknown): StadiumDevice[] {
  if (!Array.isArray(value)) return [];
  const devices = new Map<string, StadiumDevice>();
  for (const candidate of value.slice(0, 64)) {
    if (!candidate || typeof candidate !== 'object') continue;
    const { name, host, port, type } = candidate;
    if (typeof type !== 'string' || type.replace(/\.$/, '') !== '_stadiumserver._tcp') continue;
    if (typeof name !== 'string' || !name.trim() || name.length > 255) continue;
    if (typeof host !== 'string' || !host.length || host.length > 253 || !/^[a-zA-Z0-9._:%-]+$/.test(host)) continue;
    if (!Number.isInteger(port) || port < 1 || port > 65534) continue;
    const normalizedHost = host.replace(/\.$/, '');
    if (!normalizedHost) continue;
    devices.set(`${normalizedHost.toLowerCase()}:${port}`, { name: name.trim(), host: normalizedHost, port });
  }
  return [...devices.values()].sort((left, right) => left.name.localeCompare(right.name) || left.host.localeCompare(right.host) || left.port - right.port);
}

let nextRequestId = 0;

/** A bounded scan with cancellation that also settles an unresponsive native call. */
export function startStadiumSearch(native: DiscoveryTransport | null, timeoutMs = 6000) {
  const requestId = ++nextRequestId;
  let settle: (() => void) | undefined;
  let settled = false;
  let timer: ReturnType<typeof setTimeout> | undefined;
  const stopNative = () => {
    try { native?.cancel(requestId); } catch { /* A missing native bridge cannot keep a scan alive. */ }
  };
  const result = new Promise<StadiumDevice[]>((resolve, reject) => {
    const finish = (devices: StadiumDevice[], error?: unknown) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      stopNative();
      if (error) reject(error);
      else resolve(devices);
    };
    settle = () => finish([]);
    if (!native) {
      finish([], new Error('Network search is unavailable in this installation. Update HELYON or enter the Stadium’s IP address.'));
      return;
    }
    const duration = Number.isFinite(timeoutMs) ? Math.max(1000, Math.min(15000, timeoutMs)) : 6000;
    timer = setTimeout(() => finish([], new Error('The search timed out. Check Wi-Fi and Local Network access, then search again.')), duration + 1000);
    try {
      void native.discover(requestId, duration).then(
        value => finish(parseStadiumDevices(value)),
        error => finish([], error),
      );
    } catch (error) { finish([], error); }
  });
  return { result, cancel: () => settle?.() };
}
