"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _colorManipulator = require("@material-ui/core/styles/colorManipulator");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = theme => ({
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  appBarPlaceholder: _objectSpread({}, theme.mixins.toolbar, {
    flexShrink: 0
  }),
  toolbar: {},
  appBarChip: {
    color: theme.palette.common.white,
    margin: theme.spacing(1),
    background: (0, _colorManipulator.fade)(theme.palette.common.white, 0.15),
    '&:hover, &:focus': {
      background: (0, _colorManipulator.fade)(theme.palette.common.white, 0.15)
    },
    '&:active': {
      background: (0, _colorManipulator.fade)(theme.palette.common.white, 0.15)
    }
  }
});

exports.default = _default;