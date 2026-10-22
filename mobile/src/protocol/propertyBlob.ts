import { Buffer } from 'buffer';
import { validateTempoProperty } from './tempo';

export type PropertyType = 's' | 'i' | 'f' | 'b';

const uint32 = (value: number) => {
  const bytes = Buffer.alloc(5);
  bytes[0] = 0xce;
  bytes.writeUInt32BE(value, 1);
  return bytes;
};

const string = (value: string) => {
  const bytes = Buffer.from(value, 'utf8');
  const header = Buffer.alloc(5);
  header[0] = 0xdb;
  header.writeUInt32BE(bytes.length, 1);
  return Buffer.concat([header, bytes]);
};

function encodeValue(value: unknown, type: PropertyType): Buffer {
  switch (type) {
    case 's':
      if (typeof value !== 'string') throw new Error('Expected a text property value.');
      return string(value);
    case 'b':
      if (typeof value !== 'boolean') throw new Error('Expected a boolean property value.');
      return Buffer.from([value ? 0xc3 : 0xc2]);
    case 'i': {
      if (typeof value !== 'number' || !Number.isInteger(value) || value < -0x80000000 || value > 0x7fffffff) {
        throw new Error('Expected a signed 32-bit integer property value.');
      }
      const bytes = Buffer.alloc(5);
      bytes[0] = 0xd2;
      bytes.writeInt32BE(value, 1);
      return bytes;
    }
    case 'f': {
      if (typeof value !== 'number' || !Number.isFinite(value) || !Number.isFinite(Math.fround(value))) {
        throw new Error('Expected a finite float property value.');
      }
      // Whole-number floats must still be MessagePack FLOAT32, never INT32.
      const bytes = Buffer.alloc(5);
      bytes[0] = 0xca;
      bytes.writeFloatBE(value, 1);
      return bytes;
    }
    default:
      throw new Error('Unsupported property type.');
  }
}

export function buildPropertyBlob(key: string, value: unknown, valueType: PropertyType): Buffer {
  validateTempoProperty(key, value, valueType);
  return Buffer.concat([
    Buffer.from('lavppgsm', 'utf8'), Buffer.from([0x83]),
    uint32(0x6b65795f), string(key),
    uint32(0x74797065), string(valueType),
    uint32(0x76616c5f), encodeValue(value, valueType),
  ]);
}
