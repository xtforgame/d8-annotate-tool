"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _AvatarType = _interopRequireDefault(require("../../misc/AvatarType001"));

var _FormInputs = require("../../FormInputs");

var _InputLinker = require("../../../utils/InputLinker");

var _ConfigCreators = require("../ConfigCreators");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = new _ConfigCreators.EditableConfig({
  component: _AvatarType.default,
  converter: {
    fromView: ([fileInfo]) => fileInfo.dataURL
  },
  mwRender: ({
    value
  }) => ({
    image: value
  })
}, null, null, null, ({
  value,
  handleChange,
  link: {
    uniqueName
  }
}) => ({
  image: value,
  [_InputLinker.ExtraChildren]: _react.default.createElement(_FormInputs.FormImageButtonWithMask, {
    key: `${uniqueName}-img-input-button`,
    id: `${uniqueName}-img-input-button`,
    variant: "avatar",
    onLoadEnd: handleChange
  })
}));

exports.default = _default;