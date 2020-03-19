"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _Fab = _interopRequireDefault(require("@material-ui/core/Fab"));

var _Edit = _interopRequireDefault(require("@material-ui/icons/Edit"));

var _Close = _interopRequireDefault(require("@material-ui/icons/Close"));

var _helpers = require("../../../utils/InputLinker/helpers");

var _ConfigCreators = require("../ConfigCreators");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = new _ConfigCreators.EditableConfig({
  presets: [(0, _helpers.createIgnoredPreset)(_Fab.default)]
}, null, ({
  link: {
    host
  }
}) => ({
  color: 'secondary',
  'aria-label': 'edit',
  onClick: host.startEditing,
  children: _react.default.createElement(_Edit.default, null)
}), null, ({
  link: {
    host
  }
}) => ({
  color: 'default',
  'aria-label': 'cancel',
  onClick: host.cancelEditing,
  children: _react.default.createElement(_Close.default, null)
}));

exports.default = _default;