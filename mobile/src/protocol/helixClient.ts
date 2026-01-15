import { Buffer } from 'buffer';
import { decode as decodeMsgpack, encode as encodeMsgpack } from '@msgpack/msgpack';
import { buildOsc } from './osc';
import { ZmtpSocket, zmtpHandshake } from './zmtp';

const fourcc = (text: string) => {
  if (text.length !== 4) throw new Error('fourcc must be 4 chars');
  const b = Buffer.from(text, 'utf8');
  return b.readUInt32BE(0);
};

const encodeMsgpackMap = (entries: Array<[number, any]>) => {
  const chunks: Buffer[] = [];
  const size = entries.length;
  if (size <= 15) {
    chunks.push(Buffer.from([0x80 + size]));
  } else {
    throw new Error('map too large');
  }

  const pushUInt32 = (value: number) => {
    const b = Buffer.alloc(5);
    b[0] = 0xce;
    b.writeUInt32BE(value >>> 0, 1);
    chunks.push(b);
  };

  const pushInt32 = (value: number) => {
    const b = Buffer.alloc(5);
    b[0] = 0xd2;
    b.writeInt32BE(value, 1);
    chunks.push(b);
  };

  const pushString = (value: string) => {
    const strBuf = Buffer.from(value, 'utf8');
    const len = strBuf.length;
    const header = Buffer.alloc(5);
    header[0] = 0xdb;
    header.writeUInt32BE(len, 1);
    chunks.push(header, strBuf);
  };

  for (const [key, val] of entries) {
    pushUInt32(key);
    if (typeof val === 'number') {
      pushInt32(val);
    } else {
      pushString(String(val));
    }
  }

  return Buffer.concat(chunks);
};

const buildPropertyBlob = (key: string, value: any, valueType: 's' | 'i' | 'f' | 'b') => {
  const payload = encodeMsgpackMap([
    [fourcc('key_'), key],
    [fourcc('type'), valueType],
    [fourcc('val_'), valueType === 'i' ? Number(value) : value],
  ]);
  return Buffer.concat([Buffer.from('lavppgsm', 'utf8'), payload]);
};

export class HelixClient {
  private host: string;
  private port2001: number;
  private port2002: number;
  private stream2001 = new ZmtpSocket();
  private stream2002 = new ZmtpSocket();
  private cmdId = 1;
  private listening = false;
  private onEvent: ((event: { addr: string; typetags: string | null; vals: Array<any> }) => void) | null = null;
  private listening2002 = false;
  private pendingResponses = new Map<string, (vals: Array<any>) => void>();

  constructor(host: string, port2001 = 2001, port2002 = 2002) {
    this.host = host;
    this.port2001 = port2001;
    this.port2002 = port2002;
  }

  async connect() {
    await this.stream2001.connect(this.host, this.port2001);
    await this.stream2002.connect(this.host, this.port2002);
    await zmtpHandshake(this.stream2001, 'SUB');
    this.stream2001.sendFrame(Buffer.from([0x01]));
    await zmtpHandshake(this.stream2002, 'DEALER', Buffer.from(''));
  }

  close() {
    this.listening = false;
    this.listening2002 = false;
    this.pendingResponses.clear();
    this.stream2001.close();
    this.stream2002.close();
  }

  private nextCmdId() {
    const id = this.cmdId;
    this.cmdId += 1;
    return id;
  }

  sendOsc(address: string, typetags: string, args: Array<any>) {
    const msg = buildOsc(address, typetags, args);
    this.stream2002.sendFrame(msg);
  }

  startListener(callback: (event: { addr: string; typetags: string | null; vals: Array<any> }) => void) {
    this.onEvent = callback;
    if (this.listening) return;
    this.listening = true;
    this.listenLoop().catch((err) => console.warn('listen loop error', err));
  }

  private async listenLoop() {
    while (this.listening) {
      const { flags, payload } = await this.stream2001.readFrame();
      const data = ensureBuffer(payload);
      if (flags & 0x04) continue;
      if (flags & 0x01) continue;
      const events = decodeFrames(data, true);
      for (const evt of events) {
        this.dispatchEvent(evt);
      }
    }
  }

  private async readFrameWithTimeout(timeoutMs: number) {
    if (timeoutMs <= 0) return null;
    return await Promise.race([
      this.stream2002.readFrame(),
      new Promise<null>((resolve) => setTimeout(() => resolve(null), timeoutMs)),
    ]);
  }

  private async readMultipart2002(timeoutMs: number) {
    const deadline = Date.now() + timeoutMs;
    const first = await this.readFrameWithTimeout(timeoutMs);
    if (!first) return null;
    let { flags } = first;
    const parts: Buffer[] = [];
    const firstPayload = ensureBuffer(first.payload);
    if (firstPayload.length) parts.push(firstPayload);
    while (flags & 0x01) {
      const remaining = Math.max(0, deadline - Date.now());
      const next = await this.readFrameWithTimeout(remaining);
      if (!next) break;
      flags = next.flags;
      const payload = ensureBuffer(next.payload);
      if (payload.length) parts.push(payload);
    }
    if (!parts.length) return Buffer.alloc(0);
    return parts[parts.length - 1];
  }

  private async readOsc2002(timeoutMs = 500) {
    const data = await this.readMultipart2002(timeoutMs);
    if (!data) return null;
    if (data.length === 0) return null;
    if (data[0] === 0x2f) {
      return decodeOsc(data, true);
    }
    const events = decodeFrames(data, true);
    return events[0] ?? null;
  }

  private dispatchEvent(event: { addr: string; typetags: string | null; vals: Array<any> }) {
    this.resolvePending(event.addr, event.vals);
    this.onEvent?.({ ...event, vals: summarizeVals(event.vals ?? []) });
  }

  private resolvePending(addr: string, vals: Array<any>) {
    if (!Array.isArray(vals) || vals.length === 0) return false;
    const cmdId = vals[0];
    if (typeof cmdId !== 'number') return false;
    const key = buildRequestKey(addr, cmdId);
    const resolver = this.pendingResponses.get(key);
    if (!resolver) return false;
    this.pendingResponses.delete(key);
    resolver(vals);
    return true;
  }

  private waitForResponse(expectAddr: string, cmdId: number, timeoutMs: number) {
    const key = buildRequestKey(expectAddr, cmdId);
    let resolved = false;
    let result: Array<any> | null = null;
    let timer: ReturnType<typeof setTimeout> | null = null;
    const promise = new Promise<Array<any> | null>((resolve) => {
      const resolver = (vals: Array<any>) => {
        if (resolved) return;
        resolved = true;
        result = vals;
        if (timer) clearTimeout(timer);
        resolve(vals);
      };
      this.pendingResponses.set(key, resolver);
      timer = setTimeout(() => {
        if (this.pendingResponses.get(key) === resolver) {
          this.pendingResponses.delete(key);
        }
        if (!resolved) resolve(null);
      }, timeoutMs);
    });
    return {
      promise,
      isResolved: () => resolved,
      getResult: () => result,
    };
  }

  private async request(address: string, typetags: string, args: Array<any>, expectAddr: string, timeoutMs = 2000) {
    const cmdId = this.nextCmdId();
    const fullArgs = [cmdId, ...args];
    this.sendOsc(address, `i${typetags}`, fullArgs);
    const wait = this.waitForResponse(expectAddr, cmdId, timeoutMs);
    const deadline = Date.now() + timeoutMs;
    while (Date.now() < deadline && !wait.isResolved()) {
      const remaining = deadline - Date.now();
      const evt = await this.readOsc2002(Math.min(500, remaining));
      if (!evt) continue;
      this.dispatchEvent(evt);
    }
    return wait.getResult() ?? (await wait.promise);
  }

  setProperty(key: string, value: any, valueType: 's' | 'i' | 'f' | 'b' = 's', propertyId = 0) {
    const cmdId = this.nextCmdId();
    const blob = buildPropertyBlob(key, value, valueType);
    this.sendOsc('/PropertyValueSet', 'iib', [cmdId, propertyId, blob]);
  }

  setNotes(text: string) {
    this.setProperty('preset.meta.info', text, 's');
  }

  setNotesVisible(visible: boolean) {
    const key = visible ? 'volatile.presetinfo.open' : 'volatile.presetinfo.close';
    this.setProperty(key, 1, 'i');
  }

  setAutoCab(enabled: boolean) {
    this.setProperty('global.modelselect.addcabblock', enabled ? 1 : 0, 'i');
  }

  setModel(path: number, block: number, modelId: number, slot = 0) {
    const cmdId = this.nextCmdId();
    this.sendOsc('/ModelSet', 'iiiii', [cmdId, path, block, slot, modelId]);
  }

  setParamValue(
    path: number,
    block: number,
    paramId: number,
    value: number | boolean,
    slot = 0,
    flags = -1,
    valueType: 'i' | 'f' | 'b' = 'f'
  ) {
    const cmdId = this.nextCmdId();
    const numericVal = typeof value === 'boolean' ? (value ? 1 : 0) : Number(value);
    if (valueType === 'i') {
      this.sendOsc('/ParamValueSet', 'iiiiiii', [cmdId, path, block, slot, paramId, Math.round(numericVal), flags]);
      return;
    }
    this.sendOsc('/ParamValueSet', 'iiiiifi', [cmdId, path, block, slot, paramId, numericVal, flags]);
  }

  doAgenda(commands: Array<any>) {
    const cmdId = this.nextCmdId();
    const blob = Buffer.from(encodeMsgpack(commands));
    this.sendOsc('/doAgenda', 'ib', [cmdId, blob]);
  }

  clearBlocks(flow: number, blocks: number[]) {
    if (!blocks.length) return;
    const commands = blocks.map((block) => ({ bloc: block, cmnd: fourcc('clrb'), flow }));
    this.doAgenda(commands);
  }

  async getProperty(key: string) {
    const vals = await this.request('/PropertyValueGet', 's', [key], '/getPropertyValue', 2000);
    const blob = extractFirstBlob(vals);
    if (!blob) return null;
    return decodePropertyBlob(blob);
  }

  async getEditBufferState() {
    const vals = await this.request('/EditBufferStateGet', '', [], '/getEditBufferState', 3000);
    return decodeStateFromBlobs(vals);
  }
}

const align4 = (n: number) => n + ((4 - (n % 4)) % 4);

const decodeOsc = (msg: Buffer, keepBlob = false) => {
  const addrEnd = msg.indexOf(0x00);
  if (addrEnd === -1) return null;
  const addr = msg.subarray(0, addrEnd).toString('utf8');
  let idx = align4(addrEnd + 1);
  if (idx >= msg.length || msg[idx] !== 0x2c) return { addr, typetags: null, vals: [] };
  const ttEnd = msg.indexOf(0x00, idx);
  if (ttEnd === -1) return { addr, typetags: null, vals: [] };
  const typetags = msg.subarray(idx, ttEnd).toString('utf8');
  idx = align4(ttEnd + 1);

  const vals: Array<any> = [];
  for (const ch of typetags.slice(1)) {
    if (ch === 'i') {
      vals.push(msg.readInt32BE(idx));
      idx += 4;
    } else if (ch === 'f') {
      vals.push(msg.readFloatBE(idx));
      idx += 4;
    } else if (ch === 's') {
      const end = msg.indexOf(0x00, idx);
      if (end === -1) break;
      vals.push(msg.subarray(idx, end).toString('utf8'));
      idx = align4(end + 1);
    } else if (ch === 'b') {
      const len = msg.readUInt32BE(idx);
      idx += 4;
      const blob = msg.subarray(idx, idx + len);
      vals.push(keepBlob ? blob : `<blob:${len}>`);
      idx = align4(idx + len);
    } else {
      vals.push(null);
      idx += 4;
    }
  }
  return { addr, typetags, vals };
};

const decodeFrames = (payload: Buffer, keepBlob = false) => {
  const events: Array<{ addr: string; typetags: string | null; vals: Array<any> }> = [];
  if (payload.length === 0) return events;
  if (payload[0] === 0x2f) {
    const decoded = decodeOsc(payload, keepBlob);
    if (decoded) events.push(decoded);
    return events;
  }
  let offset = 0;
  while (offset + 12 <= payload.length) {
    const msgLen = payload.readUInt16BE(offset + 10);
    if (msgLen === 0 || offset + 12 + msgLen > payload.length) break;
    const msg = payload.subarray(offset + 12, offset + 12 + msgLen);
    const decoded = decodeOsc(msg, keepBlob);
    if (decoded) events.push(decoded);
    offset += 12 + msgLen;
  }
  return events;
};

const fourccStr = (value: number) => {
  const buf = Buffer.alloc(4);
  buf.writeUInt32BE(value >>> 0, 0);
  const text = buf.toString('utf8');
  if ([...text].every((ch) => ch.charCodeAt(0) >= 32 && ch.charCodeAt(0) <= 126)) {
    return text;
  }
  return null;
};

const normalizeKeys = (obj: any): any => {
  if (obj instanceof Map) {
    const out: Record<string, any> = {};
    for (const [key, val] of obj.entries()) {
      const newKey = typeof key === 'number' ? fourccStr(key) ?? String(key) : String(key);
      out[newKey] = normalizeKeys(val);
    }
    return out;
  }
  if (Array.isArray(obj)) {
    return obj.map((item) => normalizeKeys(item));
  }
  if (obj && typeof obj === 'object') {
    const out: Record<string, any> = {};
    for (const [key, val] of Object.entries(obj)) {
      out[key] = normalizeKeys(val);
    }
    return out;
  }
  return obj;
};

const decodeMsgpackBlob = (blob: Buffer) => {
  const offsets = [0, 4, 8, 12, 16];
  for (const off of offsets) {
    try {
      const decoded = decodeMsgpack(blob.subarray(off));
      return normalizeKeys(decoded);
    } catch (_err) {
      continue;
    }
  }
  return null;
};

const decodePropertyBlob = (blob: Buffer) => {
  const decoded = decodeMsgpackBlob(blob) as any;
  if (!decoded) return null;
  const key = decoded.key_ ?? decoded.key;
  const type = decoded.type;
  const value = decoded.val_ ?? decoded.val;
  return { key, type, value };
};

const summarizeVals = (vals: Array<any>) =>
  vals.map((val) => {
    if (Buffer.isBuffer(val)) {
      return `<blob:${val.length}>`;
    }
    return val;
  });

const ensureBuffer = (payload: Buffer | Uint8Array | null | undefined) => {
  if (!payload) return Buffer.alloc(0);
  if (Buffer.isBuffer(payload)) return payload;
  return Buffer.from(payload);
};

const extractFirstBlob = (vals: Array<any> | null | undefined) => {
  if (!Array.isArray(vals)) return null;
  for (const val of vals) {
    if (Buffer.isBuffer(val)) {
      return val;
    }
  }
  return null;
};

const extractBlobs = (vals: Array<any> | null | undefined) => {
  if (!Array.isArray(vals)) return [];
  return vals.filter((val) => Buffer.isBuffer(val)) as Buffer[];
};

const hasFlowState = (decoded: any) => {
  if (!decoded || typeof decoded !== 'object') return false;
  const sfg = (decoded as any).sfg_;
  if (sfg && typeof sfg === 'object' && Array.isArray((sfg as any).flow)) return true;
  if (Array.isArray((decoded as any).flow)) return true;
  return false;
};

const decodeStateFromBlobs = (vals: Array<any> | null | undefined) => {
  const blobs = extractBlobs(vals);
  if (!blobs.length) return null;
  let fallback: any = null;
  let fallbackSize = -1;
  for (const blob of blobs) {
    const decoded = decodeMsgpackBlob(blob);
    if (!decoded) continue;
    if (hasFlowState(decoded)) return decoded;
    if (blob.length > fallbackSize) {
      fallback = decoded;
      fallbackSize = blob.length;
    }
  }
  return fallback;
};

const buildRequestKey = (addr: string, cmdId: number) => `${addr}:${cmdId}`;
