import assert from 'node:assert/strict';
import test from 'node:test';
import { fitsDspBudget, getDspHeadroom, getDspLimit } from './dspBudget';

test('normal budget is the default; opt-in restores the historical 82 cap', () => {
  assert.equal(getDspLimit(), 66);
  assert.equal(getDspLimit(true), 82);
  assert.equal(fitsDspBudget(10, getDspHeadroom(60)), false);
  assert.equal(fitsDspBudget(10, getDspHeadroom(60, 0, true)), true);
  assert.equal(fitsDspBudget(23, getDspHeadroom(60, 0, true)), false);
});

test('replacement credits only the removed block; auto-cab cost must also fit', () => {
  assert.equal(fitsDspBudget(16, getDspHeadroom(60, 10)), true);
  assert.equal(fitsDspBudget(16 + 4, getDspHeadroom(60, 10)), false);
});

test('turning off override does not allow further overload, but permits a smaller replacement', () => {
  assert.equal(fitsDspBudget(0, getDspHeadroom(75)), false);
  assert.equal(fitsDspBudget(10, getDspHeadroom(75, 20)), true);
});

test('invalid budgets and costs fail closed', () => {
  for (const bad of [NaN, Infinity, -1]) {
    assert.equal(fitsDspBudget(bad, 66), false);
    assert.equal(fitsDspBudget(1, getDspHeadroom(bad)), false);
  }
});
