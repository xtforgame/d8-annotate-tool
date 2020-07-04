/* eslint-disable no-nested-ternary, no-param-reassign */
/* eslint-disable no-underscore-dangle, object-curly-newline */
import SdaExtension from '../SdaExtension';
import SdaShapeExtension from '../SdaShapeExtension';
import { getClientPos } from '../utils/dom-manipulate';

const oppositeSide = {
  'nw-resize': 'se-resize',
  'ne-resize': 'sw-resize',
  'sw-resize': 'ne-resize',
  'se-resize': 'nw-resize',
  'n-resize': 's-resize',
  'e-resize': 'w-resize',
  's-resize': 'n-resize',
  'w-resize': 'e-resize',
  move: 'move',
};

const getPointFuncs = {
  'nw-resize': ({ x, y }) => ({ x, y }),
  'ne-resize': ({ x, y, width }) => ({ x: x + width, y }),
  'sw-resize': ({ x, y, height }) => ({ x, y: y + height }),
  'se-resize': ({ x, y, width, height }) => ({ x: x + width, y: y + height }),
  'n-resize': ({ y }) => ({ y }),
  'e-resize': ({ x, width }) => ({ x: x + width }),
  's-resize': ({ y, height }) => ({ y: y + height }),
  'w-resize': ({ x }) => ({ x }),
  move: () => ({}),
};

const getPos = (type, rect) => {
  const func = getPointFuncs[type] || (() => ({}));
  return func(rect);
};

const getFixedPoint = (type, rect) => {
  const func = getPointFuncs[oppositeSide[type]] || (() => ({}));
  return func(rect);
};

class RectMoveAndResizeForShape extends SdaShapeExtension {
  constructor(paper, shape) {
    super();
    this.paper = paper;
    this.rphPaper = this.paper.rphPaper;
    this.rphPaperElem = this.paper.rphPaperElem;

    this.shape = shape;

    this.mode = null;

    this.isMovable = false;
    this.isResizable = false;
    this.reset();
  }

  reset() {
    this.originRect = {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
    };
    this.startPos = {
      x: 0,
      y: 0,
    };
    this.fixedPos = {
      x: 0,
      y: 0,
    };
    this.moved = false;
    this.dragging = false;
  }

  calcDragType = ({ mouseX, mouseY }) => {
    if (this.isResizable) {
      const shapeWidth = this.shape.attr('width');
      const shapeHeight = this.shape.attr('height');

      const resizeBorder = Math.min(15, shapeWidth / 3, shapeHeight / 3);

      const offset = getClientPos(this.rphPaperElem);
      // X,Y Coordinates relative to shape's orgin
      const relativeX = mouseX - offset.left - this.shape.attr('x');
      const relativeY = mouseY - offset.top - this.shape.attr('y');

      // Change cursor
      if (relativeX < resizeBorder) {
        return relativeY < resizeBorder ? 'nw-resize' : (relativeY > shapeHeight - resizeBorder ? 'sw-resize' : 'w-resize');
      } else if (relativeX > shapeWidth - resizeBorder) {
        return relativeY < resizeBorder ? 'ne-resize' : (relativeY > shapeHeight - resizeBorder ? 'se-resize' : 'e-resize');
      } else if (relativeY < resizeBorder) {
        return 'n-resize';
      } else if (relativeY > shapeHeight - resizeBorder) {
        return 's-resize';
      }
    }
    return this.isMovable ? 'move' : 'unset';
  };

  _dragstart(_x, _y, event) {
    const dragType = this.calcDragType({
      mouseX: _x,
      mouseY: _y,
    });
    this.setMode(dragType);
    // Save some starting values
    this.originRect = this.shape.attr(['x', 'y', 'width', 'height']);
    this.startPos = getPos(this.mode, this.originRect);
    this.fixedPos = getFixedPoint(this.mode, this.originRect);
    this.dragging = true;
  }

  dragstart = (x, y, event) => {
    this._dragstart(x, y, event);
    this.callbacks.dragstart(x, y, event);
  };

  _dragmove(dx, dy) {
    if (Math.abs(dx) >= 0.9 || Math.abs(dy) >= 0.9) {
      // ignore short distance movements
      this.moved = true;
    }
    this.shape.attr('cursor', 'unset');
    if (this.mode === 'unset') {
      return this.shape;
    } else if (this.mode === 'move') {
      return this.shape.attr({
        x: this.originRect.x + dx,
        y: this.originRect.y + dy,
      });
    }

    const nx = this.startPos.x + dx;
    const ny = this.startPos.y + dy;

    const newRect = {};
    if (this.fixedPos.x != null) {
      if (nx >= this.fixedPos.x) {
        newRect.x = this.fixedPos.x;
        newRect.width = nx - this.fixedPos.x;
      } else {
        newRect.x = nx;
        newRect.width = this.fixedPos.x - nx;
      }
    }

    if (this.fixedPos.y != null) {
      if (ny >= this.fixedPos.y) {
        newRect.y = this.fixedPos.y;
        newRect.height = ny - this.fixedPos.y;
      } else {
        newRect.y = ny;
        newRect.height = this.fixedPos.y - ny;
      }
    }

    return this.shape.attr(newRect);
  }

  dragmove = (dx, dy, x, y, event) => {
    this._dragmove(dx, dy, x, y, event);
    this.callbacks.dragmove(dx, dy, x, y, event);
  };

  _dragend() {
    this.reset();
  }

  dragend = (event) => {
    const { originRect, moved } = this;
    const newRect = this.shape.attr(['x', 'y', 'width', 'height']);
    this.callbacks.beforedragend(this, event);
    this._dragend(event);
    this.callbacks.dragend(event);
    if (moved) {
      this.paper.events.emit('onRectPosAndSizeChange', {
        mode: this.mode,
        originRect,
        newRect,
      }, {});
    }
  };

  setMode = (mode) => {
    this.shape.attr('cursor', mode);
    this.mode = mode;
  }

  _mousemove(e, mouseX, mouseY) {
    // Don't change cursor during a drag operation
    if (this.dragging === true) {
      return;
    }

    const dragType = this.calcDragType({
      mouseX,
      mouseY,
    });

    this.setMode(dragType);
  }

  mousemove = (e, mouseX, mouseY) => {
    this._mousemove(e, mouseX, mouseY);
    this.callbacks.mousemove(e, mouseX, mouseY);
  };

  enable(enableDrag = true, enableResize = true, cbs = {}) {
    if (this.isMovable || this.isResizable) {
      // remove previous events (not really necessary)
      this.shape.unmousemove();
      this.shape.undrag();
    }

    if (!enableDrag && !enableResize) {
      // disable
      return;
    }

    this.isMovable = enableDrag;
    this.isResizable = enableResize;

    this.callbacks = {
      dragstart: (x, y, event) => { },
      dragmove: (dx, dy, x, y, event) => { },
      beforedragend: (myRef, event) => {},
      dragend: (event) => { },
      mousemove: (e, mouseX, mouseY) => { },
      ...cbs,
    };

    // Attach "Mouse Over" handler to rectangle
    this.shape.mousemove(this.mousemove);

    // Attach "Drag" handlers to rectangle
    this.shape.drag(this.dragmove, this.dragstart, this.dragend);
  }

  destroy() {
    this.enable(false);
  }
}

export default class RectMoveAndResize extends SdaExtension {
  static $name = 'rectMoveAndResize';

  static $type = 'extension';

  static $inject = ['builtin'];

  constructor({ paper }) {
    super();
    this.paper = paper;
  }

  createExtensionForShape(injectedResult, shape, options) {
    return new RectMoveAndResizeForShape(this.paper, shape, options);
  }
}
