import assert from 'node:assert/strict';
import test from 'node:test';
import { clipboardParameterType, validatePathPaste } from './pathPaste';
import type { HelixPathClipboard } from './helixClient';
const entry = (position: number, modelId: number) => ({ position, modelId, enabled: true, params: [] });
test('whole-number float parameters keep their catalogue wire type', () => {
  assert.equal(clipboardParameterType(478, 1, 0), 'f');
  assert.equal(clipboardParameterType(478, 5, true), 'b');
  assert.equal(clipboardParameterType(770, 2, 1), 'i');
});
test('path paste rejects feedback routing, excess amps and DSP before writing', () => {
  const clipboard: HelixPathClipboard = { sourcePath: 0, entries: [entry(3, 475), entry(5, 536), entry(19, 594), entry(8, 478)] };
  assert.doesNotThrow(() => validatePathPaste(clipboard, {}, 1, 66));
  assert.throws(() => validatePathPaste({ ...clipboard, entries: [...clipboard.entries, entry(13, 779)] }, {}, 1, 66), /feeds Path 2/);
  assert.throws(() => validatePathPaste({ ...clipboard, entries: [...clipboard.entries, entry(10, 536)] }, {}, 1, 66), /two amps/);
  assert.throws(() => validatePathPaste(clipboard, {}, 1, 20), /processing budget/);
});
