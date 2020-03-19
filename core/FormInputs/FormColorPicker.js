"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactColor = require("react-color");

var _TextFieldFrame = _interopRequireDefault(require("../TextFieldFrame"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

const defaultColor = '#FFFFFF';
const defaultTextColor = '#000000';

function getCorrectTextColor(_h) {
  let hex = _h;

  if (!hex) {
    return defaultTextColor;
  }

  hex = cutHex(hex);

  if (hex.length === 3) {
    const c1 = hex.substr(0, 1);
    const c2 = hex.substr(1, 1);
    const c3 = hex.substr(2, 1);
    hex = `${c1}${c1}${c2}${c2}${c3}${c3}`;
  }

  const threshold = 130;
  const hRed = hexToR(hex);
  const hGreen = hexToG(hex);
  const hBlue = hexToB(hex);

  function hexToR(h) {
    return parseInt(h.substr(0, 2), 16);
  }

  function hexToG(h) {
    return parseInt(h.substr(2, 2), 16);
  }

  function hexToB(h) {
    return parseInt(h.substr(4, 2), 16);
  }

  function cutHex(h) {
    return h.charAt(0) === '#' ? h.substr(1, 7) : h;
  }

  const cBrightness = (hRed * 299 + hGreen * 587 + hBlue * 114) / 1000;

  if (cBrightness > threshold) {
    return '#000000';
  } else {
    return '#FFFFFF';
  }
}

const Content = (_ref) => {
  let {
    inputRef,
    colorProps
  } = _ref,
      props = _objectWithoutProperties(_ref, ["inputRef", "colorProps"]);

  return _react.default.createElement("div", _extends({}, props, {
    style: {
      height: 'auto'
    }
  }), _react.default.createElement("div", {
    style: {
      borderWidth: 1,
      borderColor: 'rgba(0, 0, 0, 0.3)',
      borderStyle: 'solid',
      height: 48,
      marginTop: 6,
      marginBottom: 6,
      color: getCorrectTextColor(colorProps.color),
      background: colorProps.color,
      borderRadius: 6,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative'
    }
  }, colorProps.color && `${colorProps.color.toUpperCase()}`), _react.default.createElement(_reactColor.TwitterPicker, _extends({
    width: "100%",
    triangle: "hide",
    styles: {
      'hide-triangle': {
        card: {
          boxShadow: 'unset'
        },
        body: {
          padding: 0
        }
      }
    }
  }, colorProps)));
};

var _default = (_ref2) => {
  let {
    colors,
    colorProps
  } = _ref2,
      props = _objectWithoutProperties(_ref2, ["colors", "colorProps"]);

  return _react.default.createElement(_TextFieldFrame.default, _extends({}, props, {
    value: " ",
    Content: Content,
    InputLabelProps: {
      shrink: true
    },
    inputProps: {
      colorProps: _objectSpread({}, colorProps, {
        colors: colors || ['#FF6900', '#FCB900', '#7BDCB5', '#00D084', '#8ED1FC', '#0693E3', '#ABB8C3', '#EB144C', '#F78DA7', '#9900EF'],
        color: props.value || defaultColor,
        onChangeComplete: c => {
          const {
            onChange
          } = props;

          if (onChange) {
            onChange(c.hex || c || '');
          }
        }
      })
    }
  }));
};

exports.default = _default;