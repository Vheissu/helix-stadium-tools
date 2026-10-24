import type { BlockData, BlockSlot, SignalFlowGrid } from '../types/signalFlow';

// Public Stadium 1.4 limits: primary paths include both their A and B rows.
// https://manuals.line6.com/en/helix-stadium/live/dynamic-dsp
const POLY_MODELS = new Set([480, 481, 482, 520, 521, 522, 523]);
const CLONE_MODELS = new Set([836, 838, 839, 840]);
const isAmp = (block: Pick<BlockData, 'kind'>) => block.kind === 'amp' || block.kind === 'preamp';

export function blockLimitReason(grid: SignalFlowGrid, slot: BlockSlot, model: Pick<BlockData, 'id' | 'kind'>, autoCab = false): string | null {
  const others = grid.flatMap((row, rowIndex) => row.flatMap((block, index) =>
    block && !(rowIndex === slot.path && index === slot.block) ? [{ ...block, row: rowIndex }] : []));
  const path = others.filter(block => Math.floor(block.row / 2) === Math.floor(slot.path / 2));
  if (CLONE_MODELS.has(model.id) && path.filter(block => CLONE_MODELS.has(block.id)).length >= 2) return 'This path already has two Clone blocks.';
  if (isAmp(model) && path.filter(isAmp).length >= 2) return 'This path already has two amps or preamps. Use the other path for another amp.';
  if ((model.kind === 'cab' || autoCab) && path.filter(block => block.kind === 'cab').length >= 2) return autoCab
    ? 'Auto-cab would add a third cab to this path. Turn off Auto-cab or remove a cab first.'
    : 'This path already has two cab blocks.';
  if (POLY_MODELS.has(model.id) && path.some(block => POLY_MODELS.has(block.id))) return 'Only one Poly or high-DSP effect is available per path.';
  if (model.kind === 'looper' && others.some(block => block.kind === 'looper')) return 'Only one looper is available per preset.';
  return null;
}
