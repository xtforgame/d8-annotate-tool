export function addNumberOrPercent(value, multiplier = 1, offset = 0) {
  let v = value;
  if (typeof value === 'string' && value.endsWith('%')) {
    v = parseFloat(value.substr(0, value.length - 1));
    if (!Number.isNaN(v)) {
      v *= multiplier / 100.0;
    }
  }
  if (!Number.isNaN(v)) {
    return offset + v;
  }
  return undefined;
}

export const x = 1;
