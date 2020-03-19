"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  useJsonForm: true,
  JsonFormLinker: true,
  RenderSession: true
};
Object.defineProperty(exports, "useJsonForm", {
  enumerable: true,
  get: function () {
    return _useJsonForm.default;
  }
});
Object.defineProperty(exports, "JsonFormLinker", {
  enumerable: true,
  get: function () {
    return _core.JsonFormLinker;
  }
});
Object.defineProperty(exports, "RenderSession", {
  enumerable: true,
  get: function () {
    return _core.RenderSession;
  }
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _FormInputs = require("../FormInputs");

var _useJsonForm = _interopRequireDefault(require("./useJsonForm"));

var _interfaces = require("./interfaces");

Object.keys(_interfaces).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _interfaces[key];
    }
  });
});

var _core = require("./core");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const JsonFormLayout = p => {
  const {
    renderSpace,
    il,
    props,
    layoutFeature,
    renderSession
  } = (0, _useJsonForm.default)(p);
  const {
    children
  } = props;
  const {
    tData: {
      t
    }
  } = layoutFeature;
  return _react.default.createElement("div", null, _react.default.createElement(_FormInputs.FormSpace, {
    variant: "top"
  }), _react.default.createElement(_FormInputs.FormContent, null, il.fieldLinks.map(fieldLink => {
    const space = renderSpace(fieldLink);
    return _react.default.createElement(_react.default.Fragment, {
      key: fieldLink.name
    }, il.renderComponent(fieldLink.name, {
      translate: t,
      renderSession
    }), space);
  })), children);
};

JsonFormLayout.displayName = 'JsonFormLayout';
var _default = JsonFormLayout;
exports.default = _default;