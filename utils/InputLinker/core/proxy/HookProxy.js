"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class StateProxy {
  constructor(type, link) {
    _defineProperty(this, "type", void 0);

    _defineProperty(this, "link", void 0);

    _defineProperty(this, "linker", void 0);

    _defineProperty(this, "setter", void 0);

    _defineProperty(this, "_getUpdatedState", (prevState, fieldName, value) => ({
      [this.linker.sliceNameInState[this.type]]: _objectSpread({}, this.linker.getDataFromSlice(this.type, prevState), {
        [fieldName]: value
      })
    }));

    _defineProperty(this, "updateSetter", setter => this.setter = setter);

    _defineProperty(this, "getValue", () => this.linker.getDataFromSliceByName(this.type, this.link.name));

    _defineProperty(this, "setValue", (value, rawArgs) => this.setter(value));

    this.type = type;
    this.link = link;
    this.linker = this.link.linker;

    this.setter = () => {};
  }

  get host() {
    return this.linker.host;
  }

}

exports.default = StateProxy;