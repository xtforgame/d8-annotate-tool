"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ProxyTypeName = exports.ProxyMode = void 0;
let ProxyMode;
exports.ProxyMode = ProxyMode;

(function (ProxyMode) {
  ProxyMode["State"] = "state";
  ProxyMode["Hook"] = "hook";
  ProxyMode["Props"] = "props";
})(ProxyMode || (exports.ProxyMode = ProxyMode = {}));

let ProxyTypeName;
exports.ProxyTypeName = ProxyTypeName;

(function (ProxyTypeName) {
  ProxyTypeName["Value"] = "value";
  ProxyTypeName["Error"] = "error";
  ProxyTypeName["CustomState"] = "customState";
})(ProxyTypeName || (exports.ProxyTypeName = ProxyTypeName = {}));