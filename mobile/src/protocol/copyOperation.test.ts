import assert from 'node:assert/strict';
import test from 'node:test';
import { confirmCopyPreset, CopyOperationError, withAutoCabDisabled } from './copyOperation';

test('copy restores Auto-Cab and retries a failed restoration without losing a successful result', async () => {
  let enabled = true, attempts = 0;
  const writes: boolean[] = [];
  const result = await withAutoCabDisabled({ read: async () => enabled, write: async value => {
    writes.push(value);
    if (value && attempts++ === 0) throw new Error('Connection timed out');
    enabled = value;
  } }, async () => { assert.equal(enabled, false); return 42; });
  assert.deepEqual(result, { value: 42, warning: null });
  assert.deepEqual(writes, [false, true, true]);
});

test('a lost restoration acknowledgement is accepted only when readback confirms Auto-Cab', async () => {
  let enabled = true;
  const writes: boolean[] = [];
  const result = await withAutoCabDisabled({ read: async () => enabled, write: async value => {
    writes.push(value); enabled = value;
    if (value) throw new Error('Lost acknowledgement');
  } }, async () => 'copied');
  assert.equal(result.warning, null);
  assert.deepEqual(writes, [false, true]);
});

test('a restoration failure is reported separately and never replaces the original copy failure', async () => {
  let enabled = true;
  const io = { read: async () => enabled, write: async (value: boolean) => { if (value) throw new Error('Restore failed'); enabled = false; } };
  const result = await withAutoCabDisabled(io, async () => 'confirmed');
  assert.equal(result.value, 'confirmed'); assert.match(result.warning!, /Auto-Cab/);
  enabled = true;
  await assert.rejects(withAutoCabDisabled(io, async () => { throw new CopyOperationError('Model was refused', true); }), error => {
    assert.ok(error instanceof CopyOperationError); assert.equal(error.message, 'Model was refused');
    assert.equal(error.mayHaveChanged, true); assert.match(error.warning!, /Auto-Cab/); return true;
  });
});

test('unreadable Auto-Cab and a failed disable prevent all block writes', async () => {
  let operations = 0, restores = 0;
  await assert.rejects(withAutoCabDisabled({ read: async () => null, write: async () => { throw new Error('Unexpected'); } }, async () => operations++), /Could not read/);
  await assert.rejects(withAutoCabDisabled({ read: async () => true, write: async value => { if (!value) throw new Error('Disable failed'); restores++; } }, async () => operations++), /Disable failed/);
  assert.equal(operations, 0); assert.equal(restores, 1);
});

test('a disabled Auto-Cab preference stays disabled and preset timeouts differ from preset changes', async () => {
  const result = await withAutoCabDisabled({ read: async () => false, write: async () => { throw new Error('Must not change'); } }, async () => 1);
  assert.equal(result.value, 1);
  await assert.rejects(confirmCopyPreset(async () => null, 904), /Could not confirm/);
  await assert.rejects(confirmCopyPreset(async () => 905, 904), /preset changed/);
});
