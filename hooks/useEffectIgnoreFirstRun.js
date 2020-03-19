"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = require("react");

var _default = (cb = () => undefined, ...args) => {
  const isFirstRun = (0, _react.useRef)(true);
  return (0, _react.useEffect)(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }

    cb();
  }, ...args);
};

exports.default = _default;