"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _useDialogWithButtonState = _interopRequireWildcard(require("../../../hooks/useDialogWithButtonState"));

var _FdiDialog = _interopRequireDefault(require("./FdiDialog"));

var _FdiButton = _interopRequireDefault(require("./FdiButton"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var _default = props => {
  const {
    Button = _FdiButton.default,
    Dialog = _FdiDialog.default,
    label,
    title,
    value,
    displayValue = v => v,
    renderButton,
    buttonProps: bp,
    renderDialog,
    dialogProps: dp,
    onChange = () => {}
  } = props;
  const [{
    open,
    exited,
    dialogProps,
    buttonProps
  }, {
    handleOpen,
    handleClose,
    handleExited
  }] = (0, _useDialogWithButtonState.default)({
    open: () => {},
    close: v => {
      if (v !== undefined && v !== _useDialogWithButtonState.Cancel) {
        onChange(v);
      }
    },
    dialogProps: dp,
    buttonProps: bp
  });
  const valueForDisplay = displayValue(value);
  const propsForButton = {
    label,
    title,
    handleOpen,
    value,
    valueForDisplay,
    buttonProps
  };
  const propsForDialog = {
    label,
    title,
    open,
    handleClose,
    handleExited,
    value,
    dialogProps
  };
  return _react.default.createElement(_react.default.Fragment, null, renderButton ? renderButton(propsForButton) : _react.default.createElement(Button, _extends({
    label: label,
    value: valueForDisplay,
    onClick: handleOpen,
    onKeyDown: handleOpen
  }, buttonProps)), !exited && (renderDialog ? renderDialog(propsForDialog) : _react.default.createElement(Dialog, _extends({
    title: title != null ? title : label,
    value: value
  }, dialogProps))));
};

exports.default = _default;