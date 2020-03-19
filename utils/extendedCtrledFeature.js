"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.normalizeValue = exports.defaults = exports.overwrites = void 0;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const overwrites = Symbol('overwrites');
exports.overwrites = overwrites;
const defaults = Symbol('defaults');
exports.defaults = defaults;

const normalizeValue = d => {
  const data = _objectSpread({}, d);

  if (data[defaults]) {
    Object.keys(data[defaults]).forEach(key => {
      if (data[key] === undefined && data[defaults][key] !== undefined) {
        data[key] = data[defaults][key];
      }
    });
  }

  if (data[overwrites]) {
    Object.keys(data[overwrites]).forEach(key => {
      data[key] = data[overwrites][key];
    });
  }

  return data;
};

exports.normalizeValue = normalizeValue;