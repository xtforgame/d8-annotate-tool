"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _useEditableLayoutFeatures = _interopRequireDefault(require("../../hooks/useEditableLayoutFeatures"));

var _Button = _interopRequireDefault(require("@material-ui/core/Button"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const EditableLayout = props => {
  const {
    extraContents,
    children,
    submitButtonText,
    styleNs = []
  } = props;
  const {
    il,
    resetIl,
    classesByNs,
    tData: {
      t
    },
    host,
    Content,
    space,
    topSpace
  } = (0, _useEditableLayoutFeatures.default)(_objectSpread({}, props, {
    styleNs: [...styleNs, 'login']
  }));
  il.updateHost(host);
  return _react.default.createElement(_react.default.Fragment, null, topSpace, _react.default.createElement(Content, null, il.fieldLinks.map(fieldLink => {
    const defaultSpace = 'space' in fieldLink.options ? fieldLink.options.space : space;
    return _react.default.createElement(_react.default.Fragment, {
      key: fieldLink.name
    }, il.renderComponent(fieldLink.name, {
      translate: t
    }), defaultSpace);
  }), extraContents, _react.default.createElement(_Button.default, {
    variant: "contained",
    fullWidth: true,
    color: "primary",
    className: classesByNs.login.loginBtn,
    onClick: host.handleSubmit
  }, submitButtonText)), children);
};

EditableLayout.displayName = 'EditableLayout';
var _default = EditableLayout;
exports.default = _default;