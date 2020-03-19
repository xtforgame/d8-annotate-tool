"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = require("react");

var _default = () => {
  const [, updateState] = (0, _react.useState)();
  return (0, _react.useCallback)(() => updateState({}), []);
};

exports.default = _default;