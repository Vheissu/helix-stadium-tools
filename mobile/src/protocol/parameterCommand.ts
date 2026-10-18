export function parameterValueCommand(
  path: number, block: number, paramId: number, value: number | boolean,
  slot = 0, flags = -1, valueType: 'i' | 'f' | 'b' = 'f',
) {
  const wireValue = valueType === 'b' ? Boolean(value) : valueType === 'i' ? Math.round(Number(value)) : Number(value);
  if (typeof wireValue === 'number' && !Number.isFinite(wireValue)) throw new Error('Choose a valid parameter value.');
  const tag = valueType === 'b' ? (wireValue ? 'T' : 'F') : valueType;
  return { address: '/ParamValueSet', types: `iiii${tag}i`, args: [path, block, slot, paramId, wireValue, flags] };
}
