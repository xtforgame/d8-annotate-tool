"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _BasicFormLayout = _interopRequireDefault(require("./BasicFormLayout"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const DialogLayout = (...args) => (0, _BasicFormLayout.default)(...args);

DialogLayout.displayName = 'DialogLayout';
var _default = DialogLayout;
exports.default = _default;