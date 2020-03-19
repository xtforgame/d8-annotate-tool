"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _styles = require("@material-ui/core/styles");

var _Dialog = _interopRequireDefault(require("@material-ui/core/Dialog"));

var _AppBar = _interopRequireDefault(require("@material-ui/core/AppBar"));

var _IconWithTextToolbar = _interopRequireDefault(require("../Toolbars/IconWithTextToolbar"));

var _common = _interopRequireDefault(require("../../styles/common"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const styles = theme => _objectSpread({
  appBar: {
    position: 'relative'
  }
}, (0, _common.default)(theme, ['flex', 'appBar']));

class SimpleFullScreenDialog extends _react.default.PureComponent {
  render() {
    const _this$props = this.props,
          {
      classes,
      title,
      headerLeftButton,
      headerLeftIcon,
      disableHeaderLeftButton,
      headerContent,
      children,
      open,
      onClose,
      className,
      toolbar,
      appBarProps,
      toolbarProps,
      PaperProps
    } = _this$props,
          rest = _objectWithoutProperties(_this$props, ["classes", "title", "headerLeftButton", "headerLeftIcon", "disableHeaderLeftButton", "headerContent", "children", "open", "onClose", "className", "toolbar", "appBarProps", "toolbarProps", "PaperProps"]);

    return _react.default.createElement(_Dialog.default, _extends({
      fullScreen: true,
      open: open,
      onClose: onClose,
      className: className,
      PaperProps: _objectSpread({
        square: true
      }, PaperProps)
    }, rest), _react.default.createElement(_AppBar.default, _extends({
      className: classes.appBar
    }, appBarProps), toolbar || _react.default.createElement(_IconWithTextToolbar.default, {
      title: title,
      headerLeftButton: headerLeftButton,
      headerLeftIcon: headerLeftIcon,
      disableHeaderLeftButton: disableHeaderLeftButton,
      headerContent: headerContent,
      toolbarProps: toolbarProps,
      onLeftButtonClick: onClose
    })), children);
  }

}

var _default = (0, _styles.withStyles)(styles)(SimpleFullScreenDialog);

exports.default = _default;