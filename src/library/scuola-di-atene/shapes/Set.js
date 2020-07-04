/* eslint-disable no-underscore-dangle, no-param-reassign */
import SdaShape from '../SdaShape';

export default class Set extends SdaShape {
  static $type = 'set';

  constructor(...args) {
    super(...args);
    this.items = [];
  }

  createShape(args, options = {}) {
    this.rphRef = this.rphPaper.set();
  }

  push(...args) {
    this.items.push(...args);
  }

  splice(...args) {
    this.items.splice(...args);
  }

  clear() {
    this.items = [];
  }
}
