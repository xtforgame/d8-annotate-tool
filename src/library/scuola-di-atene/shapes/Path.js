/* eslint-disable no-underscore-dangle, no-nested-ternary, no-param-reassign */
import SdaShape from '../SdaShape';

export default class Path extends SdaShape {
  static $type = 'path';

  createShape(args, options) {
    this.rphRef = this.rphPaper.path(...args);
  }
}
