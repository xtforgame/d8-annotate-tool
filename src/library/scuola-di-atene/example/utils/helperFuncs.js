export function getRelativeMousePos({
  clientOffset,
  componentRect,
  scrollOffset = { x: 0, y: 0 },
}) {
  return {
    x: clientOffset.x - componentRect.x + scrollOffset.x,
    y: clientOffset.y - componentRect.y + scrollOffset.y,
  };
}

export const x = 1;
