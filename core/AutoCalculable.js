"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.defaultIsEqual = void 0;

var _react = _interopRequireWildcard(require("react"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

const defaultIsEqual = (r, v, p) => r === v;

exports.defaultIsEqual = defaultIsEqual;

var _default = props => {
  const {
    Component,
    value: v,
    calculatedValue,
    acOptions: {
      isEqual = defaultIsEqual,
      getExtraProps = () => undefined,
      onAutoCalcChanged = () => undefined,
      normalize = v => v || ''
    } = {}
  } = props,
        rest = _objectWithoutProperties(props, ["Component", "value", "calculatedValue", "acOptions"]);

  const [lastAutoCalc, setLastAutoCalc] = (0, _react.useState)(v == null || isEqual(calculatedValue, v, props));
  const [lastMatchedValue, setLastMatchedValue] = (0, _react.useState)(null);
  const [extraProps, setExtraProps] = (0, _react.useState)(getExtraProps(lastAutoCalc));
  const autoCalc = v == null || isEqual(calculatedValue, v, props) || lastAutoCalc && lastMatchedValue === v;
  const currentValue = autoCalc ? calculatedValue : v;
  (0, _react.useEffect)(() => {
    setLastAutoCalc(autoCalc);
    setLastMatchedValue(autoCalc ? v : null);
    setExtraProps(getExtraProps(autoCalc));
    setTimeout(() => onAutoCalcChanged(autoCalc), 0);
  }, [v, calculatedValue]);
  return _react.default.createElement(Component, _extends({
    value: normalize(currentValue)
  }, rest, extraProps));
};

exports.default = _default;