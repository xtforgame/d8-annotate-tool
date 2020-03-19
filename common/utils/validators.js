"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isValidPassword = isValidPassword;
exports.isAllDigital = isAllDigital;
exports.isValidEmail = isValidEmail;
Object.defineProperty(exports, "validator", {
  enumerable: true,
  get: function () {
    return _validator.default;
  }
});

var _validator = _interopRequireDefault(require("validator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isValidPassword(value) {
  const reg = /^(?=.*[a-zA-Z\d#$^+=!*()@%&])(?!.*\s).{8,128}/;
  return !!value && reg.test(value);
}

function isAllDigital(value) {
  const reg = /^\d+$/;
  return !!value && reg.test(value);
}

function isValidEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}