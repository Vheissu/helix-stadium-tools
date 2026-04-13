import { Buffer } from 'buffer';

const pad4 = (buf: Buffer) => {
  const pad = (4 - (buf.length % 4)) % 4;
  if (!pad) return buf;
  return Buffer.concat([buf, Buffer.alloc(pad)]);
};

export const buildOsc = (address: string, typetags: string, args: Array<any>) => {
  if (!address.startsWith('/')) {
    throw new Error('OSC address must start with /');
  }
  const addr = pad4(Buffer.from(`${address}\0`, 'utf8'));
  const tt = pad4(Buffer.from(`,${typetags}\0`, 'utf8'));

  const payload: Buffer[] = [];
  for (let i = 0; i < typetags.length; i += 1) {
    const t = typetags[i];
    const a = args[i];
    if (t === 'i') {
      const b = Buffer.alloc(4);
      b.writeInt32BE(Number(a), 0);
      payload.push(b);
    } else if (t === 'h') {
      const b = Buffer.alloc(8);
      const n = BigInt(a);
      b.writeBigInt64BE(n, 0);
      payload.push(b);
    } else if (t === 'f') {
      const b = Buffer.alloc(4);
      b.writeFloatBE(Number(a), 0);
      payload.push(b);
    } else if (t === 's') {
      payload.push(pad4(Buffer.from(`${String(a)}\0`, 'utf8')));
    } else if (t === 'b') {
      const blob = Buffer.isBuffer(a) ? a : Buffer.from(a);
      const len = Buffer.alloc(4);
      len.writeUInt32BE(blob.length, 0);
      payload.push(Buffer.concat([len, blob, Buffer.alloc((4 - (blob.length % 4)) % 4)]));
    } else if (t === 'T' || t === 'F') {
      continue;
    } else {
      throw new Error(`Unsupported OSC type: ${t}`);
    }
  }

  return Buffer.concat([addr, tt, ...payload]);
};
