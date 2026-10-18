import assert from 'node:assert/strict';
import test from 'node:test';
import { withDeadline } from './deadline';

test('unresponsive connection attempts time out', async () => {
  await assert.rejects(withDeadline(new Promise(() => {}), 5), /timed out/);
});

test('successful connections and connection errors retain their result', async () => {
  assert.equal(await withDeadline(Promise.resolve('connected'), 500), 'connected');
  await assert.rejects(withDeadline(Promise.reject(new Error('refused')), 500), /refused/);
});
