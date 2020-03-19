"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Linker = _interopRequireDefault(require("../../../utils/InputLinker/core/Linker"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class JsonFormLinker extends _Linker.default {
  constructor(host, options) {
    super(host, options);

    _defineProperty(this, "basicValidate", void 0);

    console.log('JsonFormLinker');
    this.basicValidate = super.validate.bind(this);
  }

  validate() {
    if (this.options.globalValidator) {
      return this.options.globalValidator({
        linker: this,
        validate: this.basicValidate
      });
    }

    return super.validate();
  }

}

exports.default = JsonFormLinker;