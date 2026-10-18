/** User-facing messages produced by HELYON's direct USB transport. */
export class UsbConnectionError extends Error {
  constructor(message: string) {
    super(message || 'USB connection failed. Reconnect the Stadium and try again.');
    this.name = 'UsbConnectionError';
  }
}
