"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _TextField = _interopRequireDefault(require("@material-ui/core/TextField"));

var _styles = require("@material-ui/core/styles");

var _withOnPressEnterEvent = _interopRequireDefault(require("./withOnPressEnterEvent"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

const paddingSize = 20;

const styles = theme => ({
  inputStyle: {
    paddingTop: paddingSize,
    paddingBottom: paddingSize,
    fontSize: 50
  },
  marginDenseLabelStyle: {
    transform: 'translate(0, 21px) scale(1)'
  },
  shrinkLabelStyle: {
    transform: 'translate(0, 1.5px) scale(0.75)',
    transformOrigin: 'top left'
  },
  outlinedLabelStyle: {
    fontSize: 50,
    transform: `translate(14px, ${24 + paddingSize + 17}px) scale(1)`,
    '&$marginDenseLabelStyle': {
      transform: `translate(14px, ${17 + paddingSize + 17}px) scale(1)`
    },
    '&$shrinkLabelStyle': {
      transform: `translate(14px, ${-6 + 6}px) scale(0.75)`
    }
  }
});

const LargeFormTextField = (_ref) => {
  let {
    classes: {
      inputStyle,
      outlinedLabelStyle,
      marginDenseLabelStyle,
      shrinkLabelStyle
    },
    InputProps,
    InputLabelProps
  } = _ref,
      classes = _objectWithoutProperties(_ref.classes, ["inputStyle", "outlinedLabelStyle", "marginDenseLabelStyle", "shrinkLabelStyle"]),
      props = _objectWithoutProperties(_ref, ["classes", "InputProps", "InputLabelProps"]);

  return _react.default.createElement(_TextField.default, _extends({
    variant: "outlined",
    className: inputStyle,
    InputProps: _objectSpread({}, InputProps, {
      classes: {
        root: inputStyle
      }
    }),
    InputLabelProps: _objectSpread({}, InputLabelProps, {
      classes: {
        marginDense: marginDenseLabelStyle,
        shrink: shrinkLabelStyle,
        outlined: outlinedLabelStyle
      }
    }),
    classes: classes
  }, props));
};

var _default = (0, _withOnPressEnterEvent.default)((0, _styles.withStyles)(styles)(LargeFormTextField));

exports.default = _default;