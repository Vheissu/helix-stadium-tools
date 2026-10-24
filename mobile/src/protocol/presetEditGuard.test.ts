import assert from 'node:assert/strict';
import test from 'node:test';
import { blockActionMessage, PresetEditGuard } from './presetEditGuard';
test('a new preset cannot be edited using the old grid or a read started before its notification', () => {
  const guard = new PresetEditGuard();
  assert.equal(guard.ready(null), false);
  assert.equal(guard.acceptSync(guard.beginSync(), null), false);
  assert.equal(guard.acceptSync(guard.beginSync(), 904), true);
  assert.equal(guard.ready(904), true);
  const inFlight = guard.beginSync();
  guard.invalidate();
  assert.equal(guard.ready(904), false); assert.equal(guard.ready(905), false);
  assert.equal(guard.acceptSync(inFlight, 905), false);
  assert.equal(guard.acceptSync(guard.beginSync(), 905), true);
  assert.equal(guard.ready(905), true); assert.equal(guard.ready(904), false);
});
test('block failures keep protocol details out of user messages and acknowledge uncertain outcomes', () => {
  assert.match(blockActionMessage(new Error('/undo timed out')), /Sync to check whether/);
  assert.match(blockActionMessage(new Error('/SplitDestinationSet failed (-4, 1)')), /refused/);
  assert.match(blockActionMessage(new Error('decode failed')), /did not respond/);
  assert.match(blockActionMessage(new Error('Not enough processing headroom')), /processing capacity/);
  assert.equal(blockActionMessage(new Error('The preset changed.')), 'The preset changed.');
});
