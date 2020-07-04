/* eslint-disable no-underscore-dangle, no-nested-ternary, no-param-reassign */
import SdaShape from '../SdaShape';

export default class Rect extends SdaShape {
  static $type = 'rect';

  createShape(args, options) {
    this.rphRef = this.rphPaper.rect(...args);
  }
}
