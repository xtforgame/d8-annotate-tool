/* eslint-disable no-underscore-dangle, no-param-reassign */
import SdaExtension from '../SdaExtension';

export default class BoundaryHelper extends SdaExtension {
  static $name = 'boundaryHelper';

  static $type = 'extension';

  static $inject = ['builtin'];

  constructor({ paper }) {
    super();
    this.boundary = {
      x1: 0,
      y1: 0,
      x2: 0,
      y2: 0,
    };
  }

  init() {
  }

  setBoundary(x = 0, y = 0, w = 1, h = 1) {
    this.boundary = {
      x1: x,
      y1: y,
      x2: w,
      y2: h,
    };
  }

  applyBoundaryToShape = (shape, mode = 'move') => {
    const rect = shape.attr(['x', 'y', 'width', 'height']);
    if (mode === 'move') {
      if (rect.x + rect.width > this.boundary.x2) {
        rect.x = this.boundary.x2 - rect.width;
      }
      if (rect.y + rect.height > this.boundary.y2) {
        rect.y = this.boundary.y2 - rect.height;
      }
      if (rect.x < 0) {
        rect.x = 0;
      }
      if (rect.y < 0) {
        rect.y = 0;
      }
    } else if (mode === 'resize') {
      if (rect.x + rect.width > this.boundary.x2) {
        rect.width = this.boundary.x2 - rect.x;
      }
      if (rect.y + rect.height > this.boundary.y2) {
        rect.height = this.boundary.y2 - rect.y;
      }
      if (rect.x < 0) {
        rect.width += rect.x;
        rect.x = 0;
      }
      if (rect.y < 0) {
        rect.height += rect.y;
        rect.y = 0;
      }
    }

    shape.attr(rect);
  }

  destroy() {
  }
}
