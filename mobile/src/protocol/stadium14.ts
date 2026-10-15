import { decodeMulti } from '@msgpack/msgpack';

export type LibraryContentRef = { cid_: number; type: number; name: string; sku: string };

export function decodeLibraryContent(blob: Uint8Array): LibraryContentRef[] | null {
  // The array header counts records, not the four values making up each record.
  if (!blob.length) return null;
  let count: number;
  let offset: number;
  const view = new DataView(blob.buffer, blob.byteOffset, blob.byteLength);
  if ((blob[0] & 0xf0) === 0x90) { count = blob[0] & 0x0f; offset = 1; }
  else if (blob[0] === 0xdc && blob.length >= 3) { count = view.getUint16(1); offset = 3; }
  else if (blob[0] === 0xdd && blob.length >= 5) { count = view.getUint32(1); offset = 5; }
  else return null;
  if (count > (blob.length - offset) / 4) return null;
  try {
    const fields = Array.from(decodeMulti(blob.subarray(offset)));
    if (fields.length !== count * 4) return null;
    const entries: LibraryContentRef[] = [];
    for (let i = 0; i < fields.length; i += 4) {
      const [cid, type, name, sku] = fields.slice(i, i + 4);
      if (typeof cid !== 'number' || !Number.isInteger(cid) ||
          typeof type !== 'number' || !Number.isInteger(type) ||
          typeof name !== 'string' || typeof sku !== 'string') return null;
      entries.push({ cid_: cid, type, name, sku });
    }
    return entries;
  } catch { return null; }
}

export type ExpressionPedalPosition = {
  pedalIndex: number;
  position: number;
  detail: number;
};

export function parseExpressionPedalPosition(values: unknown, pedalIndex: number): ExpressionPedalPosition | null {
  if (!Array.isArray(values) || values.length !== 4 ||
      !values.every((value) => typeof value === 'number' && Number.isInteger(value)) ||
      values[1] !== pedalIndex) return null;
  return { pedalIndex: values[1], position: values[2], detail: values[3] };
}

export type LibraryOperation = {
  kind: 'ir' | 'clone';
  operation: 'import' | 'delete';
  phase: 'begin' | 'progress' | 'end';
  commandId: number;
  sequence: number;
  fields: Array<number | string>;
};

export function parseLibraryOperation(address: string, values: unknown): LibraryOperation | null {
  const match = /^\/(ir|clone)(Import|Delete)(Begin|Progress|End)$/.exec(address);
  if (!match || !Array.isArray(values)) return null;
  const [, kind, operation, phase] = match;
  const fieldCount = phase === 'End' ? (operation === 'Import' ? 4 : 1) : 2;
  if (values.length !== fieldCount + 2 || !values.every((value, index) =>
    phase === 'Begin' && index === 3
      ? typeof value === 'string'
      : typeof value === 'number' && Number.isInteger(value)
  )) return null;
  return {
    kind: kind as LibraryOperation['kind'],
    operation: operation.toLowerCase() as LibraryOperation['operation'],
    phase: phase.toLowerCase() as LibraryOperation['phase'],
    commandId: values[0],
    sequence: values[1],
    // Keep the device fields intact; counters and end fields are not yet documented.
    fields: values.slice(2),
  };
}

export type LibraryActivity = Partial<Record<string, LibraryOperation>>;

export function updateLibraryActivity(active: LibraryActivity, event: LibraryOperation): LibraryActivity {
  const key = `${event.kind}:${event.operation}`;
  const next = { ...active };
  if (event.phase === 'end') delete next[key];
  else next[key] = event;
  return next;
}

export function formatLibraryActivity(active: LibraryActivity): string | null {
  const labels = Object.values(active).filter((event) => event !== undefined).map((event) =>
    `${event.operation === 'import' ? 'Importing' : 'Deleting'} ${event.kind === 'ir' ? 'IRs' : 'clones'}…`
  );
  return labels.length ? labels.join(' · ') : null;
}
