"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _blue = _interopRequireDefault(require("@material-ui/core/colors/blue"));

var _pink = _interopRequireDefault(require("@material-ui/core/colors/pink"));

var _grey = _interopRequireDefault(require("@material-ui/core/colors/grey"));

var _amber = _interopRequireDefault(require("@material-ui/core/colors/amber"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = theme => ({
  unknownColor: {
    backgroundColor: _grey.default[400]
  },
  femaleColor: {
    backgroundColor: _pink.default[400]
  },
  maleColor: {
    backgroundColor: _blue.default[400]
  },
  otherColor: {
    backgroundColor: _amber.default[400]
  }
});

exports.default = _default;