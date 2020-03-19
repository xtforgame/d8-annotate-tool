"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.defaultScope = void 0;

var _react = require("react");

var _styles = require("@material-ui/core/styles");

var _global = _interopRequireDefault(require("../common/global"));

var _login = _interopRequireDefault(require("../FormPaper/login"));

var _flex = _interopRequireDefault(require("../common/flex"));

var _appBar = _interopRequireDefault(require("../common/appBar"));

var _mobile = _interopRequireDefault(require("../common/mobile"));

var _genderColors = _interopRequireDefault(require("../common/genderColors"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const stylesNsMap = {
  global: _global.default,
  login: _login.default,
  flex: _flex.default,
  appBar: _appBar.default,
  mobile: _mobile.default,
  genderColors: _genderColors.default
};
const defaultScope = 'default';
exports.defaultScope = defaultScope;
const nsScopeMap = {
  [defaultScope]: Object.keys(stylesNsMap).reduce((r, name) => _objectSpread({}, r, {
    [name]: (0, _styles.makeStyles)(stylesNsMap[name])
  }), {})
};

var _default = (ns, scope = defaultScope) => {
  const [namespaces] = (0, _react.useState)(() => {
    let namespaces = ns;

    if (!Array.isArray(namespaces)) {
      namespaces = [namespaces].filter(ns => ns);
    }

    return namespaces;
  });
  nsScopeMap[scope] = nsScopeMap[scope] || {};
  return namespaces.reduce((r, nsName) => {
    nsScopeMap[scope][nsName] = nsScopeMap[scope][nsName] || (0, _styles.makeStyles)(stylesNsMap[nsName] || (() => ({})));
    r[nsName] = nsScopeMap[scope][nsName]();
    return r;
  }, {});
};

exports.default = _default;