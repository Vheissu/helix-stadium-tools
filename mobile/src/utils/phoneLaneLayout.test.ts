import assert from 'node:assert/strict';
import test from 'node:test';
import { centeredColumnOffset, columnSnapOffsets, measurePhoneLanes, revealColumnOffset } from './phoneLaneLayout';

// A small phone with 16pt page margins leaves 343pt for the grid.
const SMALL_PHONE = 343;

test('a small phone keeps full-size tiles and scrolls instead of shrinking', () => {
  const metrics = measurePhoneLanes(SMALL_PHONE);
  assert.equal(metrics.col, 100);
  assert.equal(metrics.tile, 68);
  assert.ok(metrics.tile >= 48);
  assert.equal(metrics.nameSize, 14);
  assert.equal(metrics.nameLines, 2);
  assert.equal(metrics.viewport, SMALL_PHONE - metrics.gutterW);
  assert.equal(metrics.width, metrics.padH * 2 + metrics.pillW * 2 + metrics.gap * 2 + metrics.col * 12);
  assert.ok(metrics.maxOffset > 0);
  assert.equal(metrics.laneHeight, metrics.padV * 2 + metrics.tile + metrics.nameGap + metrics.nameBlock);
  assert.equal(metrics.wireY, metrics.padV + metrics.tile / 2);
});

test('larger system text widens columns and reserves room for longer names', () => {
  const base = measurePhoneLanes(SMALL_PHONE, 1);
  const large = measurePhoneLanes(SMALL_PHONE, 2);
  assert.ok(large.col > base.col);
  assert.ok(large.gutterW > base.gutterW);
  assert.ok(large.pillW > base.pillW);
  assert.equal(large.tile, 72);
  assert.equal(large.nameLines, 3);
  // Three lines of 18pt names at twice the size.
  assert.ok(large.nameBlock >= 3 * 18 * 2);
  // Text beyond twice the size is capped, so the lanes stop growing too.
  assert.deepEqual(measurePhoneLanes(SMALL_PHONE, 3.1), large);
});

test('smaller system text never narrows the columns', () => {
  const small = measurePhoneLanes(SMALL_PHONE, 0.8);
  assert.equal(small.col, 100);
  assert.ok(small.nameBlock < measurePhoneLanes(SMALL_PHONE, 1).nameBlock);
});

test('missing or invalid text sizes fall back to the default', () => {
  assert.deepEqual(measurePhoneLanes(SMALL_PHONE, Number.NaN), measurePhoneLanes(SMALL_PHONE, 1));
  assert.deepEqual(measurePhoneLanes(SMALL_PHONE, 0), measurePhoneLanes(SMALL_PHONE, 1));
});

test('a wide window spreads the twelve positions across the full width', () => {
  const metrics = measurePhoneLanes(1600);
  assert.ok(metrics.col > 100);
  assert.equal(Math.round(metrics.width), metrics.viewport);
  assert.equal(metrics.maxOffset, 0);
  assert.deepEqual(columnSnapOffsets(metrics), []);
});

test('revealing a column leaves the scroll alone when it is already in view', () => {
  const metrics = measurePhoneLanes(SMALL_PHONE);
  assert.equal(revealColumnOffset(metrics, 0, 0), null);
  const offset = centeredColumnOffset(metrics, 6);
  assert.equal(revealColumnOffset(metrics, 6, offset), null);
});

test('revealing an off-screen column centres it within the lanes', () => {
  const metrics = measurePhoneLanes(SMALL_PHONE);
  const target = revealColumnOffset(metrics, 6, 0);
  assert.notEqual(target, null);
  const left = metrics.trackX + metrics.col * 6 - (target ?? 0);
  assert.ok(left >= 0 && left + metrics.col <= metrics.viewport);
  const last = revealColumnOffset(metrics, 11, 0) ?? -1;
  assert.ok(last > 0 && last <= metrics.maxOffset);
  assert.ok(metrics.trackX + metrics.col * 12 - last <= metrics.viewport);
  assert.equal(revealColumnOffset(metrics, 0, metrics.maxOffset), 0);
});

test('snap points run from the start to the end in column steps', () => {
  const metrics = measurePhoneLanes(SMALL_PHONE);
  const offsets = columnSnapOffsets(metrics);
  assert.equal(offsets[0], 0);
  assert.equal(offsets[offsets.length - 1], metrics.maxOffset);
  for (let index = 1; index < offsets.length; index += 1) assert.ok(offsets[index] > offsets[index - 1]);
  assert.ok(offsets.includes(Math.round(metrics.trackX)));
});
