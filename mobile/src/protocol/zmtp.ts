import { Buffer } from 'buffer';
import TcpSocket from 'react-native-tcp-socket';

type Socket = ReturnType<typeof TcpSocket.createConnection>;

const CLIENT_GREETING = Buffer.from(
  'ff00000000000000017f03004e554c4c' +
    '00000000000000000000000000000000' +
    '00000000000000000000000000000000' +
    '00000000000000000000000000000000',
  'hex'
);

const readUint64BE = (buf: Buffer) => {
  let val = 0n;
  for (const byte of buf) {
    val = (val << 8n) + BigInt(byte);
  }
  return Number(val);
};

const writeUint64BE = (value: number) => {
  const buf = Buffer.alloc(8);
  let v = BigInt(value);
  for (let i = 7; i >= 0; i -= 1) {
    buf[i] = Number(v & 0xffn);
    v >>= 8n;
  }
  return buf;
};

class BufferQueue {
  private buffer = Buffer.alloc(0);
  private waiters: Array<{ size: number; resolve: (b: Buffer) => void }> = [];

  push(data: Buffer) {
    this.buffer = Buffer.concat([this.buffer, data]);
    this.flush();
  }

  read(size: number) {
    if (this.buffer.length >= size) {
      const out = this.buffer.subarray(0, size);
      this.buffer = this.buffer.subarray(size);
      return Promise.resolve(out);
    }
    return new Promise<Buffer>((resolve) => {
      this.waiters.push({ size, resolve });
    });
  }

  private flush() {
    let changed = true;
    while (changed) {
      changed = false;
      for (let i = 0; i < this.waiters.length; i += 1) {
        const waiter = this.waiters[i];
        if (this.buffer.length >= waiter.size) {
          const out = this.buffer.subarray(0, waiter.size);
          this.buffer = this.buffer.subarray(waiter.size);
          waiter.resolve(out);
          this.waiters.splice(i, 1);
          changed = true;
          break;
        }
      }
    }
  }
}

export class ZmtpSocket {
  private socket: Socket | null = null;
  private queue = new BufferQueue();

  async connect(host: string, port: number) {
    if (this.socket) return;
    await new Promise<void>((resolve, reject) => {
      const sock = TcpSocket.createConnection({ host, port }, () => undefined);
      this.socket = sock;
      sock.once('connect', () => resolve());
      sock.once('error', (err) => reject(err));
      sock.on('data', (data) => this.queue.push(Buffer.from(data)));
      sock.on('error', (err) => console.warn('socket error', err));
    });
  }

  close() {
    if (!this.socket) return;
    this.socket.destroy();
    this.socket = null;
  }

  write(payload: Buffer) {
    if (!this.socket) throw new Error('socket not connected');
    this.socket.write(payload);
  }

  async readBytes(size: number) {
    return this.queue.read(size);
  }

  sendFrame(payload: Buffer, flags = 0x00) {
    if (payload.length < 256) {
      this.write(Buffer.concat([Buffer.from([flags, payload.length]), payload]));
    } else {
      this.write(Buffer.concat([Buffer.from([flags | 0x02]), writeUint64BE(payload.length), payload]));
    }
  }

  async readFrame() {
    const flagsBuf = await this.readBytes(1);
    const flags = flagsBuf[0];
    let size = 0;
    if (flags & 0x02) {
      const lenBuf = await this.readBytes(8);
      size = readUint64BE(lenBuf);
    } else {
      const lenBuf = await this.readBytes(1);
      size = lenBuf[0];
    }
    const payload = await this.readBytes(size);
    return { flags, payload };
  }
}

const readyPayload = (socketType: string, identity?: Buffer | null) => {
  const parts: Buffer[] = [];
  const ready = Buffer.from('READY', 'utf8');
  parts.push(Buffer.from([ready.length]), ready);

  const socketKey = Buffer.from('Socket-Type', 'utf8');
  parts.push(Buffer.from([socketKey.length]), socketKey);
  const st = Buffer.from(socketType, 'utf8');
  const stLen = Buffer.alloc(4);
  stLen.writeUInt32BE(st.length, 0);
  parts.push(stLen, st);

  if (identity) {
    const idKey = Buffer.from('Identity', 'utf8');
    parts.push(Buffer.from([idKey.length]), idKey);
    const idLen = Buffer.alloc(4);
    idLen.writeUInt32BE(identity.length, 0);
    parts.push(idLen, identity);
  }

  return Buffer.concat(parts);
};

export const zmtpHandshake = async (sock: ZmtpSocket, socketType: 'SUB' | 'DEALER', identity?: Buffer | null) => {
  sock.write(CLIENT_GREETING);
  await sock.readBytes(64);
  const ready = readyPayload(socketType, identity ?? undefined);
  sock.sendFrame(ready, 0x04);
  await sock.readFrame();
};
