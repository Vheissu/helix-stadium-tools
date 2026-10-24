import type { IOGrid, IOType, RowIOState, SignalFlowGrid } from '../types/signalFlow';
import { isDerivedRoutingIO } from './routing';

const PATH_2_OUTPUTS = new Set([779, 784, 788]);
export function hasIndependentIO(row: RowIOState | undefined): boolean {
  return (typeof row?.input?.modelId === 'number' && row.input.modelId !== 771) ||
    (typeof row?.output?.modelId === 'number' && row.output.modelId !== 789);
}
export function ioModelAllowed(row: number, type: IOType, modelId: number): boolean {
  return !(type === 'output' && row >= 2 && PATH_2_OUTPUTS.has(modelId));
}

export function derivedIOReason(grid: SignalFlowGrid, io: IOGrid, row: number, type: IOType): string | null {
  if (isDerivedRoutingIO(grid, row, type)) return type === 'input' ? 'From split' : 'Into merge';
  if (type === 'input' && row >= 2) {
    const upstream = [io[0]?.output?.modelId, isDerivedRoutingIO(grid, 1, 'output') ? null : io[1]?.output?.modelId];
    if (upstream.some(id => id === 788 || id === (row === 2 ? 779 : 784))) return 'From Path 1';
  }
  return null;
}
