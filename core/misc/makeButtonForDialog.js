"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _Button = _interopRequireDefault(require("@material-ui/core/Button"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function getDisplayName(WrappedComponent) {
  return WrappedComponent && (WrappedComponent.displayName || WrappedComponent.name) || 'Component';
}

var _default = (options = {}) => (Dialog, Button = _Button.default) => {
  var _class, _temp;

  const {
    buttonProps: staticButtonProps,
    dialogProps: staticDialogProps
  } = options;
  const DialogButtonHoc = (_temp = _class = class DialogButtonHoc extends _react.default.PureComponent {
    constructor(...args) {
      super(...args);

      _defineProperty(this, "state", {
        dialogOpen: false
      });

      _defineProperty(this, "handleOpen", () => {
        this.setState({
          dialogOpen: true
        });
      });

      _defineProperty(this, "handleClose", result => {
        this.setState({
          dialogOpen: false
        });
        const {
          onClose
        } = this.props;

        if (onClose) {
          onClose(result);
        }
      });
    }

    render() {
      const {
        text = 'Open Dialog',
        buttonProps,
        dialogProps,
        children
      } = this.props;
      const {
        dialogOpen
      } = this.state;

      const bP = _objectSpread({}, staticButtonProps, {}, buttonProps);

      const dP = _objectSpread({}, staticDialogProps, {}, dialogProps);

      bP.children = children || bP.children || text;
      return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(Button, _extends({}, bP, {
        onClick: this.handleOpen
      })), dialogOpen && _react.default.createElement(Dialog, _extends({}, dP, {
        open: dialogOpen,
        onClose: this.handleClose
      })));
    }

  }, _defineProperty(_class, "displayName", `makeButtonForDialog(${getDisplayName(Dialog)})`), _temp);
  return DialogButtonHoc;
};

exports.default = _default;