/* eslint-disable no-underscore-dangle, no-param-reassign */
import RectDrawer from './RectDrawer';

export default class RectSelection extends RectDrawer {
  static $name = 'rectSelection';

  static $type = 'extension';

  static $inject = ['builtin', 'backgroundRect', 'selectionManager'];

  constructor({ paper }, backgroundRect, selectionManager, options) {
    super({ paper }, backgroundRect, options);
    this.selectionManager = selectionManager;
  }

  init() {}

  onMouseUp = () => {
    this.setSelection();
  };

  defaultCreateRect= rectDefArray => this.paper.rect(...rectDefArray).attr('fill', 'transparent');

  enable(isEnabled = true, {
    getSelectables,
    getSelection,
    setSelection,
  } = {}) {
    super.enable(isEnabled, {
      createRect: this.defaultCreateRect,
    });

    const detectArea = this.backgroundRect.getDetectArea();

    if (detectArea) {
      this.backgroundRect.getDetectArea().unmouseup(this.onMouseUp);
    }

    if (!isEnabled || !getSelectables) {
      return;
    }

    this.getSelectables = getSelectables;
    this.getSelection = getSelection;
    this.setSelection = setSelection;


    if (detectArea) {
      this.backgroundRect.getDetectArea().mouseup(this.onMouseUp);
    }
  }

  _dragend(event) {
    super._dragend(event);
    // get the bounds of the selections
    const bounds = this.drawingBox.getBBox();
    this.drawingBox.remove();
    this.drawingBox = null;

    const selectables = this.getSelectables();
    const selection = [];

    selectables.forEach((item, c) => {
      // here, we want to get the x,y vales of each object regardless of what sort of sdaPaper it is,
      // but rect uses rx and ry, circle uses cx and cy, etc
      // so we'll see if the bounding boxes intercept instead

      const mybounds = item.getBBox();
      // do bounding boxes overlap?
      // is one of this object's x extremes between the selection's xextremes?
      if (
        (mybounds.x >= bounds.x && mybounds.x <= bounds.x2)
          || (mybounds.x2 >= bounds.x && mybounds.x2 <= bounds.x2)
      ) {
        // same for y
        if (
          (mybounds.y >= bounds.y && mybounds.y <= bounds.y2)
            || (mybounds.y2 >= bounds.y && mybounds.y2 <= bounds.y2)
        ) {
          selection.push(item);
        }
      }
      this.setSelection(selection);
    });
  }
}
