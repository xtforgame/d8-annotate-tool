"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _genStyleCreator = _interopRequireDefault(require("../genStyleCreator"));

var _login = _interopRequireDefault(require("./login"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const subsets = {
  login: _login.default
};

var _default = (0, _genStyleCreator.default)(subsets);

exports.default = _default;