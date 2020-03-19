"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildJsonConfig = exports.formFunctionNameList = exports.normalizeJsonConfig = void 0;

var _amdLight = require("../../../utils/amd-light");

var _InputLinker = require("../../../utils/InputLinker");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const normalizeJsonConfig = json => {
  if (Array.isArray(json.preRender)) {
    json.preRender = new Function(...json.preRender);
  }

  if (Array.isArray(json.globalValidator)) {
    json.globalValidator = new Function(...json.globalValidator);
  }

  json.fields.forEach(field => {
    if (field.type) {
      field.presets = (0, _InputLinker.toArray)(field.type).concat([{
        extraOptions: {
          jflType: field.type
        }
      }]).concat((0, _InputLinker.toArray)(field.preset)).concat((0, _InputLinker.toArray)(field.presets));
      delete field.type;
      delete field.preset;
    }
  });
  return _objectSpread({
    globalValidator: () => undefined,
    preRender: () => undefined,
    normalizeInitValues: () => undefined
  }, json);
};

exports.normalizeJsonConfig = normalizeJsonConfig;
const formFunctionNameList = ['preRender', 'globalValidator', 'normalizeInitValues'];
exports.formFunctionNameList = formFunctionNameList;

const buildJsonConfig = jsonConfig => {
  jsonConfig.amdEnv = (0, _amdLight.createEnv)(jsonConfig.modules || {});
  return jsonConfig.amdEnv.build().then(() => {
    formFunctionNameList.forEach(functionName => {
      const exports = jsonConfig.amdEnv.getExports(functionName);
      jsonConfig[functionName] = exports && exports.default;
    });
  });
};

exports.buildJsonConfig = buildJsonConfig;