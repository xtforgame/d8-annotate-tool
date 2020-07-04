export function getClientPos(element) {
  let el = element;
  let top = el.offsetTop - el.scrollTop;
  let left = el.offsetLeft - el.scrollLeft;

  while (el.offsetParent) {
    el = el.offsetParent;
    top += el.offsetTop - el.scrollTop;
    left += el.offsetLeft - el.scrollLeft;
  }

  return {
    top,
    left,
  };
}

export const x = 1;
