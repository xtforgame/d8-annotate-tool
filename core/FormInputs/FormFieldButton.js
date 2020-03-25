"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _styles = require("@material-ui/core/styles");

var _TextField = _interopRequireDefault(require("@material-ui/core/TextField"));

var _withOnPressEnterEvent = _interopRequireDefault(require("./withOnPressEnterEvent"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

const useStyles = (0, _styles.makeStyles)(theme => ({
  content: {
    height: 'auto',
    cursor: 'pointer'
  }
}));

const Content = (_ref) => {
  let {
    inputRef,
    className
  } = _ref,
      props = _objectWithoutProperties(_ref, ["inputRef", "className"]);

  const classes = useStyles();
  return _react.default.createElement("div", _extends({}, props, {
    className: (0, _classnames.default)(classes.content, className)
  }), props.value || _react.default.createElement("br", null));
};

var _default = (0, _withOnPressEnterEvent.default)(props => {
  const {
    inputComponent,
    inputProps
  } = props;
  return _react.default.createElement(_TextField.default, _extends({
    variant: "outlined"
  }, props, {
    InputLabelProps: {
      shrink: !!props.value
    },
    InputProps: {
      inputComponent: inputComponent || Content,
      inputProps: _objectSpread({}, inputProps)
    },
    onClick: e => {
      e.stopPropagation();
      e.preventDefault();
      const {
        onClick,
        disabled
      } = props;

      if (!disabled && onClick) {
        onClick(e);
      }
    }
  }));
});

exports.default = _default;