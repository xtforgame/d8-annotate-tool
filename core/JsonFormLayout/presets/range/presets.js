"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _presets = require("./dateTime/presets");

Object.keys(_presets).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _presets[key];
    }
  });
});