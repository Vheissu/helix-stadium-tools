import { Buffer } from 'buffer';
import { UsbConnectionError } from '../utils/usbConnectionError';

export interface UsbEvent { id: number; kind: number; data?: string; message?: string }
export interface UsbNativeTransport {
  open(id: number, port: number): Promise<void>;
  write(id: number, data: string): void;
  close(id: number): void;
  subscribe(listener: (event: UsbEvent) => void): () => void;
}
let nextId = 1;

export class UsbSocketSession {
  private readonly id = nextId++;
  private unsubscribe: (() => void) | undefined;
  private closed = false;
  private rejectPending: ((error: Error) => void) | undefined;

  constructor(
    private readonly native: UsbNativeTransport,
    private readonly onData: (data: Buffer) => void,
    private readonly onError: (error: Error) => void,
  ) {}

  async connect(port: number) {
    if (this.closed) throw new Error('Connection cancelled');
    this.unsubscribe = this.native.subscribe((event) => {
      if (this.closed || event.id !== this.id) return;
      if (event.kind === 2 && event.data) this.onData(Buffer.from(event.data, 'base64'));
      else if (event.kind === 3 || event.kind === 4) {
        const error = new UsbConnectionError(event.message || 'USB connection closed');
        this.onError(error);
        this.close(error);
      }
    });
    await new Promise<void>((resolve, reject) => {
      this.rejectPending = reject;
      this.native.open(this.id, port).then(() => {
        if (this.closed) { reject(new Error('Connection cancelled')); return; }
        this.rejectPending = undefined;
        resolve();
      }, (error: Error) => {
        const usbError = new UsbConnectionError(error.message);
        this.close(usbError);
        reject(usbError);
      });
    });
  }

  write(data: Buffer) {
    if (this.closed) throw new Error('USB connection closed');
    this.native.write(this.id, data.toString('base64'));
  }

  close(error = new Error('Connection cancelled')) {
    if (this.closed) return;
    this.closed = true;
    this.unsubscribe?.();
    this.unsubscribe = undefined;
    this.rejectPending?.(error);
    this.rejectPending = undefined;
    this.native.close(this.id);
  }
}
