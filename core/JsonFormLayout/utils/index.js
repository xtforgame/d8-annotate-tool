"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsonConfigHelpers = require("./jsonConfigHelpers");

Object.keys(_jsonConfigHelpers).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _jsonConfigHelpers[key];
    }
  });
});