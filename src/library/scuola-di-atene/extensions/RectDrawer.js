/* eslint-disable no-underscore-dangle, no-param-reassign */
import SdaExtension from '../SdaExtension';
import { getClientPos } from '../utils/dom-manipulate';

export default class RectDrawer extends SdaExtension {
  static $name = 'rectDrawer';

  static $type = 'extension';

  static $inject = ['builtin', 'backgroundRect'];

  constructor({ paper }, backgroundRect, options) {
    super();
    this.backgroundRect = backgroundRect;
    this.paper = paper;
    this.rphPaperElem = this.paper.rphPaperElem;

    this.options = options || {};

    this.createRect = this.defaultCreateRect;
  }

  defaultCreateRect= rectArgs => this.paper.combination(...rectArgs).attr('fill', 'transparent');

  // DRAG FUNCTIONS
  // when mouse goes down over background, start drawing selection box
  _dragstart(x, y, event) {
    const offset = getClientPos(this.rphPaperElem);
    this.startPos = {
      x: x - offset.left,
      y: y - offset.top,
    };
    this.drawingBox = this.createRect([this.startPos.x, this.startPos.y, 0, 0]);
  }

  dragstart = (x, y, event) => {
    this._dragstart(x, y, event);
    this.callbacks.dragstart(x, y, event);
  };

  // when mouse moves during drag, adjust this.drawingBox.
  // If to left or above original point, you have to translate the whole box and invert the dx or dy values
  // since .rect() doesn't take negative width or height
  _dragmove(dx, dy, x, y, event) {
    const attrs = {
      x: this.startPos.x,
      y: this.startPos.y,
    };

    if (dx < 0) {
      attrs.width = -dx;
      attrs.x += dx;
    } else {
      attrs.width = dx;
    }

    if (dy < 0) {
      attrs.height = -dy;
      attrs.y += dy;
    } else {
      attrs.height = dy;
    }

    if (this.drawingBox) {
      this.drawingBox.attr(attrs);
    }
  }

  dragmove = (dx, dy, x, y, event) => {
    this._dragmove(dx, dy, x, y, event);
    this.callbacks.dragmove(dx, dy, x, y, event);
  };

  _dragend(event) {
  }

  dragend = (event) => {
    this.callbacks.beforedragend(this, event);
    this._dragend(event);
    this.callbacks.dragend(event);
  };

  enable(isEnabled = true, options = {}) {
    const {
      createRect,
      ...cbs
    } = options;
    this.createRect = createRect || this.defaultCreateRect;
    const detectArea = this.backgroundRect.getDetectArea();
    if (!detectArea) {
      return;
    }
    detectArea.undrag();
    if (!isEnabled) {
      return;
    }
    this.callbacks = {
      dragstart: (x, y, event) => {},
      dragmove: (dx, dy, x, y, event) => {},
      beforedragend: (myRef, event) => {},
      dragend: (event) => {},
      ...cbs,
    };
    detectArea.drag(this.dragmove, this.dragstart, this.dragend);
  }

  destroy() {
    this.enable(false);
  }
}
