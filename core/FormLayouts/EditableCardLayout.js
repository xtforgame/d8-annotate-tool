"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _useLayoutFeatures = _interopRequireDefault(require("../../hooks/useLayoutFeatures"));

var _Card = _interopRequireDefault(require("@material-ui/core/Card"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const EditableCardLayout = props => {
  const {
    Card = _Card.default,
    className,
    cardProps,
    onStartEditing,
    onCancelEditing
  } = props;
  const extraProps = {};

  if (className) {
    extraProps.className = className;
  }

  const {
    il,
    resetIl,
    classesByNs,
    tData: {
      t
    },
    host
  } = (0, _useLayoutFeatures.default)(props);
  il.updateHost(_objectSpread({}, host, {
    startEditing: () => {
      if (onStartEditing) {
        onStartEditing();
      }
    },
    cancelEditing: () => {
      if (onCancelEditing) {
        onCancelEditing();
      }
    }
  }));
  return _react.default.createElement(Card, _extends({}, extraProps, cardProps), il.fieldLinks.map(fieldLink => il.renderComponent(fieldLink.name, {
    translate: t
  })));
};

EditableCardLayout.displayName = 'EditableCardLayout';
var _default = EditableCardLayout;
exports.default = _default;