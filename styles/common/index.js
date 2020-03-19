"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _genStyleCreator = _interopRequireDefault(require("../genStyleCreator"));

var _flex = _interopRequireDefault(require("./flex"));

var _appBar = _interopRequireDefault(require("./appBar"));

var _mobile = _interopRequireDefault(require("./mobile"));

var _genderColors = _interopRequireDefault(require("./genderColors"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const subsets = {
  flex: _flex.default,
  appBar: _appBar.default,
  mobile: _mobile.default,
  genderColors: _genderColors.default
};

var _default = (0, _genStyleCreator.default)(subsets);

exports.default = _default;