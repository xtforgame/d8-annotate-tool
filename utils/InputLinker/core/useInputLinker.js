"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = require("react");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const ilCreator = (host, Linker, options, createOptions = {}, cb = () => undefined) => () => {
  const rest = _extends({}, options);

  const il = new Linker(host, _objectSpread({}, rest, {
    stateMode: 'hook'
  }));
  cb(il, createOptions);
  return il;
};

var _default = (host, Linker, options, cb) => {
  const [il, setIl] = (0, _react.useState)(ilCreator(host, Linker, options, {
    reset: false
  }, cb));

  const resetIl = (resetOptions = {}) => {
    if (resetOptions.defaultValues) {
      il.setDefaultValues(resetOptions.defaultValues);
    }

    if (!resetOptions.ignoreResetValues) {
      const changeMap = {};
      Object.values(il.fieldMap).forEach(f => {
        changeMap[f.name] = f.defaultValue;
        f.setError(undefined, []);
      });
      il.changeValues(changeMap);
    }

    const newIl = ilCreator(host, options, _objectSpread({}, resetOptions, {
      reset: true
    }), cb)();
    setIl(newIl);
    return newIl;
  };

  return {
    il,
    setIl,
    resetIl
  };
};

exports.default = _default;