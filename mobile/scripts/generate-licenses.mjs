import { readFile, readdir, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import console from 'node:console';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const lock = JSON.parse(await readFile(join(root, 'package-lock.json'), 'utf8'));
const notices = [];
const seen = new Set();
for (const [path, entry] of Object.entries(lock.packages)) {
  if (!path || entry.dev || entry.optional) continue;
  const directory = join(root, path);
  const manifest = JSON.parse(await readFile(join(directory, 'package.json'), 'utf8'));
  const key = `${manifest.name}@${manifest.version}`;
  if (seen.has(key)) continue;
  seen.add(key);
  const files = (await readdir(directory)).filter((file) => /^(licen[cs]e|copying|notice)(\.|$)/i.test(file));
  const texts = await Promise.all(files.map((file) => readFile(join(directory, file), 'utf8').catch(() => '')));
  notices.push({ name: manifest.name, version: manifest.version, license: manifest.license ?? entry.license ?? 'See package source', text: texts.filter(Boolean).join('\n\n') });
}
notices.push(...JSON.parse(await readFile(join(root, 'modules/stadium-transfer/native-notices.json'), 'utf8')));
notices.push({ name: 'Roboto', version: 'bundled fonts', license: 'Apache-2.0', text: await readFile(join(root, 'assets/fonts/LICENSE.txt'), 'utf8') });
notices.sort((left, right) => left.name.localeCompare(right.name));
await writeFile(join(root, 'src/data/thirdPartyNotices.json'), JSON.stringify(notices, null, 2) + '\n');
console.log(`Wrote ${notices.length} third-party notices.`);
