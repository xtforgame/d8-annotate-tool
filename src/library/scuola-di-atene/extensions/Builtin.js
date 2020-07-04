/* eslint-disable no-underscore-dangle, no-param-reassign */
import SdaExtension from '../SdaExtension';

export default class Builtin extends SdaExtension {
  static $name = 'builtin';

  static $type = 'extension';

  static $inject = [];

  constructor(paper) {
    super();
    this.paper = paper;
  }

  init() {
  }

  destroy() {
  }
}
