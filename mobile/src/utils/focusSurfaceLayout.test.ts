import assert from 'node:assert/strict';
import test from 'node:test';
import { FOCUS_POINTS } from './focus';
import { focusPointAtPosition, focusSurfacePosition } from './focusSurfaceLayout';

test('all five visible tone markers map to their exact sound coordinates at phone and tablet sizes', () => {
  for (const [width, height] of [[335, 360], [1200, 480], [720, 400]]) {
    for (const point of [...FOCUS_POINTS, { x: 0.31, y: -0.67 }]) {
      const screen = focusSurfacePosition(point, width, height);
      assert.deepEqual(focusPointAtPosition(screen.x, screen.y, width, height), point);
    }
  }
});
test('dragging beyond the inset plot stops at the supported edges', () => {
  assert.deepEqual(focusPointAtPosition(-20, -20, 335, 360), { x: -1, y: 1 });
  assert.deepEqual(focusPointAtPosition(400, 500, 335, 360), { x: 1, y: -1 });
});
