"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getHeaders = exports.default = void 0;
const headers = {};

class HeaderManager {
  static get() {
    return headers;
  }

  static set(key, value) {
    headers[key] = value;
  }

  static delete(key) {
    delete headers[key];
  }

}

exports.default = HeaderManager;
const getHeaders = HeaderManager.get;
exports.getHeaders = getHeaders;