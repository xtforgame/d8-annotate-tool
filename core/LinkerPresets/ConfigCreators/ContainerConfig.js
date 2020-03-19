"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _FormInputs = require("../../FormInputs");

var _InputLinker = require("../../../utils/InputLinker");

var _helpers = require("../../../utils/InputLinker/helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const defaultGetSpace = ({
  key
}) => _react.default.createElement(_FormInputs.FormSpace, {
  key: key,
  variant: "content2"
});

class ContainerConfig {
  constructor(children, presets, getSpace = defaultGetSpace) {
    this._children = (0, _InputLinker.toArray)(children);
    this.getSpace = getSpace;
    this.presets = [(0, _helpers.createDefaultContainer)(this.getSpace)(this._children), ...(0, _InputLinker.toArray)(presets)];
  }

}

exports.default = ContainerConfig;