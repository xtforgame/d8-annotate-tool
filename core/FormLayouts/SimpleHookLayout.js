"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _Button = _interopRequireDefault(require("@material-ui/core/Button"));

var _FormInputs = require("../FormInputs");

var _useLayoutFeatures = _interopRequireDefault(require("../../hooks/useLayoutFeatures"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const SimpleHookLayout = props => {
  const {
    submitButtonText,
    children
  } = props;
  const {
    il,
    resetIl,
    classesByNs,
    tData: {
      t
    },
    host
  } = (0, _useLayoutFeatures.default)(_objectSpread({}, props, {
    onDidMount: il => {
      console.warn('il :', il);
    },
    onSubmit: outputs => {
      resetIl();
      console.warn('outputs :', outputs);
    }
  }));
  il.updateHost(host);
  return _react.default.createElement("div", null, _react.default.createElement(_FormInputs.FormSpace, {
    variant: "top"
  }), _react.default.createElement(_FormInputs.FormContent, null, il.fieldLinks.map(fieldLink => {
    const space = 'space' in fieldLink.options ? fieldLink.options.space : _react.default.createElement(_FormInputs.FormSpace, {
      variant: "content1"
    });
    return _react.default.createElement(_react.default.Fragment, {
      key: fieldLink.name
    }, il.renderComponent(fieldLink.name, {
      translate: t
    }), space);
  }), _react.default.createElement(_Button.default, {
    variant: "contained",
    fullWidth: true,
    color: "primary",
    className: classesByNs.login.loginBtn,
    onClick: host.handleSubmit
  }, submitButtonText), _react.default.createElement(_FormInputs.FormSpace, {
    variant: "content1"
  })), children);
};

SimpleHookLayout.displayName = 'SimpleHookLayout';
var _default = SimpleHookLayout;
exports.default = _default;