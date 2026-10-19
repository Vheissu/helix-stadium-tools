/* global process, Buffer, URL, console */
import { chmodSync, writeFileSync, mkdirSync, readFileSync } from 'node:fs';
import { createHash, createPrivateKey } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
const target = fileURLToPath(new URL('../src/generated/transfer-credentials.json', import.meta.url));
let keys = [];
if (process.env.STADIUM_SFTP_CREDENTIALS_FILE) {
  keys = JSON.parse(readFileSync(process.env.STADIUM_SFTP_CREDENTIALS_FILE, 'utf8')).keys;
} else if (process.env.STADIUM_SFTP_CREDENTIALS_BASE64) {
  keys = JSON.parse(Buffer.from(process.env.STADIUM_SFTP_CREDENTIALS_BASE64, 'base64').toString()).keys;
} else if (process.platform === 'darwin') {
  try {
    const source = process.env.STADIUM_EDITOR_BINARY || '/Applications/Line6/Helix Stadium.app/Contents/MacOS/Helix Stadium';
    const binary = execFileSync('lipo', ['-thin', 'arm64', source, '-output', '/dev/stdout'], { maxBuffer: 100 * 1024 * 1024 });
    // Addresses belong only to this verified official editor build. Unknown builds fail closed.
    if (createHash('sha256').update(binary).digest('hex') !== 'fd579b070c12566552850454f087c3b059a7728c1e681791bda95d820280e640') throw new Error('Unsupported editor version');
    const segments = []; let offset = 32;
    for (let i = 0; i < binary.readUInt32LE(16); i++) {
      const command = binary.readUInt32LE(offset), size = binary.readUInt32LE(offset + 4);
      if (command === 0x19) segments.push({ address: Number(binary.readBigUInt64LE(offset + 24)), length: Number(binary.readBigUInt64LE(offset + 32)), file: Number(binary.readBigUInt64LE(offset + 40)) });
      offset += size;
    }
    const fileOffset = address => { const segment = segments.find(s => address >= s.address && address < s.address + s.length); if (!segment) throw new Error('Invalid editor data'); return segment.file + address - segment.address; };
    for (const [address, sizeAddress] of [[0x101428c04, 0x101429a94], [0x101427d70, 0x101428c00]]) {
      const size = binary.readUInt32LE(fileOffset(sizeAddress)); const bytes = binary.subarray(fileOffset(address), fileOffset(address) + size); const packed = [];
      for (let i = 0; i < bytes.length;) { if (packed.length % 2) { packed.push(((bytes[i] << 4) | bytes[i + 1]) & 255); i += 2; } else packed.push(bytes[i++]); }
      let previous = 0x65; const plain = packed.map(byte => { const value = byte ^ previous; previous = byte; return value; });
      keys.push(Buffer.from(plain).toString().replace(/\0+$/, '') + '\n');
    }
  } catch { /* Local development without the official editor can use the other features. */ }
}
if (!Array.isArray(keys) || keys.length > 2) throw new Error('Invalid Stadium transfer credentials');
for (const key of keys) createPrivateKey(key);
if (process.argv.includes('--required') && keys.length === 0) throw new Error('Song uploads require STADIUM_SFTP_CREDENTIALS_FILE, STADIUM_SFTP_CREDENTIALS_BASE64 or a supported local Stadium editor.');
mkdirSync(new URL('../src/generated/', import.meta.url), { recursive: true });
writeFileSync(target, JSON.stringify({ keys }) + '\n', { mode: 0o600 });
chmodSync(target, 0o600);
console.log(keys.length ? 'Stadium song upload credentials prepared.' : 'Stadium song upload credentials unavailable; upload will be disabled.');
