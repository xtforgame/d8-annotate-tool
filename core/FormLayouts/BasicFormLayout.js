"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _useLayoutFeaturesEx = _interopRequireDefault(require("../../hooks/useLayoutFeaturesEx"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const BasicFormLayout = props => {
  const {
    extraContents,
    children
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
  } = (0, _useLayoutFeaturesEx.default)(props);
  il.updateHost(host);
  return _react.default.createElement(_react.default.Fragment, null, topSpace, _react.default.createElement(Content, null, il.fieldLinks.map(fieldLink => {
    const defaultSpace = 'space' in fieldLink.options ? fieldLink.options.space : space;
    return _react.default.createElement(_react.default.Fragment, {
      key: fieldLink.name
    }, il.renderComponent(fieldLink.name, {
      translate: t
    }), defaultSpace);
  }), extraContents), children);
};

BasicFormLayout.displayName = 'BasicFormLayout';
var _default = BasicFormLayout;
exports.default = _default;