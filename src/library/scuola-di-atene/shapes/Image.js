/* eslint-disable no-underscore-dangle, no-nested-ternary, no-param-reassign */
import SdaShape from '../SdaShape';

export default class Image extends SdaShape {
  static $type = 'image';

  createShape(args, options) {
    this.rphRef = this.rphPaper.image(...args);
  }
}
