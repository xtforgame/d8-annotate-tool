"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _genStyleCreator = _interopRequireDefault(require("../genStyleCreator"));

var _success = _interopRequireDefault(require("./success"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const subsets = {
  success: _success.default
};

var _default = (0, _genStyleCreator.default)(subsets);

exports.default = _default;