"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Cancel = void 0;

var _react = require("react");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const Cancel = Symbol('Cancel');
exports.Cancel = Cancel;

var _default = ({
  open: openFunc = () => {},
  close: closeFunc = () => {},
  exited: exitedFunc = () => {},
  dialogProps: dp = {}
}) => {
  const [open, setOpen] = (0, _react.useState)(false);
  const [exited, setExited] = (0, _react.useState)(true);

  const handleOpen = (...args) => {
    if (exited) {
      setOpen(true);
      setExited(false);
      openFunc(...args);
    }
  };

  const handleClose = (...args) => {
    const result = closeFunc(...args);

    if (result !== false) {
      setOpen(false);
    }
  };

  const handleExited = () => {
    setExited(true);
    exitedFunc();
  };

  const dialogProps = _objectSpread({}, dp, {
    open,
    onClose: handleClose,
    onExited: handleExited
  });

  return [{
    open,
    exited,
    dialogProps
  }, {
    setOpen,
    setExited,
    handleOpen,
    handleClose,
    handleExited
  }];
};

exports.default = _default;