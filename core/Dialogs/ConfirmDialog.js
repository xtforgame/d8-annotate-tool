"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Button = _interopRequireDefault(require("@material-ui/core/Button"));

var _Dialog = _interopRequireDefault(require("@material-ui/core/Dialog"));

var _DialogActions = _interopRequireDefault(require("@material-ui/core/DialogActions"));

var _DialogContent = _interopRequireDefault(require("@material-ui/core/DialogContent"));

var _DialogContentText = _interopRequireDefault(require("@material-ui/core/DialogContentText"));

var _DialogTitle = _interopRequireDefault(require("@material-ui/core/DialogTitle"));

var _AppBar = _interopRequireDefault(require("@material-ui/core/AppBar"));

var _Toolbar = _interopRequireDefault(require("@material-ui/core/Toolbar"));

var _IconButton = _interopRequireDefault(require("@material-ui/core/IconButton"));

var _Close = _interopRequireDefault(require("@material-ui/icons/Close"));

var _Typography = _interopRequireDefault(require("@material-ui/core/Typography"));

var _styles = require("@material-ui/core/styles");

var _recompose = require("recompose");

var _common = _interopRequireDefault(require("../../styles/common"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const styles = theme => _objectSpread({}, (0, _common.default)(theme, ['flex', 'appBar']), {
  appBar: {
    position: 'relative'
  },
  paper: {
    margin: 'auto'
  }
});

class ConfirmDialog extends _react.default.PureComponent {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "handleClose", result => () => {
      this.props.onClose(result);
    });
  }

  render() {
    const {
      title,
      contents,
      contentText,
      buttonComponents = {},
      buttonTexts = {},
      dialogProps,
      children,
      classes,
      fullScreen
    } = this.props;
    const ConfirmButton = buttonComponents.yes || buttonComponents.confirm || _Button.default;
    const CancelButton = buttonComponents.no || buttonComponents.cancel || _Button.default;
    const ConfirmButtonText = buttonTexts.yes || buttonTexts.confirm || 'Confirm';
    const CancelButtonText = buttonTexts.no || buttonTexts.cancel || 'Cancel';
    return _react.default.createElement(_Dialog.default, _extends({
      fullWidth: true,
      fullScreen: fullScreen,
      open: this.props.open,
      onClose: this.handleClose(),
      scroll: "paper",
      "aria-labelledby": "form-dialog-title",
      classes: {
        paper: classes.paper
      }
    }, dialogProps), fullScreen && _react.default.createElement(_AppBar.default, {
      className: classes.appBar
    }, _react.default.createElement(_Toolbar.default, null, _react.default.createElement(_IconButton.default, {
      color: "inherit",
      className: classes.menuButton,
      onClick: this.handleClose(false),
      "aria-label": "Close"
    }, _react.default.createElement(_Close.default, null)), _react.default.createElement(_Typography.default, {
      variant: "h6",
      color: "inherit",
      className: classes.flex1
    }, title || ''))), !fullScreen && _react.default.createElement(_DialogTitle.default, {
      id: "form-dialog-title"
    }, title || ''), !!(contents || contentText) && _react.default.createElement(_DialogContent.default, null, contents, !contents && _react.default.createElement(_DialogContentText.default, null, contentText)), children, _react.default.createElement(_DialogActions.default, null, _react.default.createElement(CancelButton, {
      onClick: this.handleClose(false)
    }, CancelButtonText), _react.default.createElement(ConfirmButton, {
      onClick: this.handleClose(true),
      variant: "contained",
      color: "primary"
    }, ConfirmButtonText)));
  }

}

_defineProperty(ConfirmDialog, "propTypes", {
  open: _propTypes.default.bool.isRequired,
  onClose: _propTypes.default.func.isRequired
});

var _default = (0, _recompose.compose)((0, _styles.withStyles)(styles))(ConfirmDialog);

exports.default = _default;