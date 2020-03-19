"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styles = require("@material-ui/core/styles");

var _IconButton = _interopRequireDefault(require("@material-ui/core/IconButton"));

var _PhotoCamera = _interopRequireDefault(require("@material-ui/icons/PhotoCamera"));

var _FormFileInputWithMask = _interopRequireDefault(require("./FormFileInputWithMask"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

const styles = theme => ({
  avatar: {
    color: theme.palette.common.white,
    margin: 'auto',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0
  },
  default: {
    color: theme.palette.common.white,
    margin: 'auto',
    position: 'absolute',
    top: 0,
    right: 0,
    width: 56,
    height: 56
  }
});

const FormImageButtonWithMask = props => {
  const {
    classes,
    variant = 'default',
    Icon = _PhotoCamera.default,
    buttonProps,
    iconProps
  } = props,
        inputProps = _objectWithoutProperties(props, ["classes", "variant", "Icon", "buttonProps", "iconProps"]);

  return _react.default.createElement(_FormFileInputWithMask.default, _extends({
    accept: "image/*"
  }, inputProps), _react.default.createElement(_IconButton.default, _extends({
    component: "span",
    className: classes[variant]
  }, buttonProps), _react.default.createElement(Icon, iconProps)));
};

FormImageButtonWithMask.propTypes = {
  id: _propTypes.default.string.isRequired
};

var _default = (0, _styles.withStyles)(styles)(FormImageButtonWithMask);

exports.default = _default;