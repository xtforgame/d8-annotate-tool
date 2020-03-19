"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.proxyTypeMap = exports.proxyTypes = exports.proxyTypeArray = void 0;

var _interfaces = require("../interfaces");

const proxyTypeArray = [{
  name: _interfaces.ProxyTypeName.Value,
  defaultSliceName: 'fields'
}, {
  name: _interfaces.ProxyTypeName.Error,
  defaultSliceName: 'errors'
}, {
  name: _interfaces.ProxyTypeName.CustomState
}];
exports.proxyTypeArray = proxyTypeArray;
const proxyTypes = {};
exports.proxyTypes = proxyTypes;
const proxyTypeMap = {};
exports.proxyTypeMap = proxyTypeMap;
proxyTypeArray.forEach(t => {
  proxyTypes[t.name] = t.name;
  proxyTypeMap[t.name] = t;
});