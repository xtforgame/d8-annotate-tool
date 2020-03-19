"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _ImagesInput = _interopRequireDefault(require("./ImagesInput"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var _default = props => {
  const {
    imagesInputProps = {}
  } = props;
  return _react.default.createElement("div", {
    style: {
      width: '100%',
      paddingTop: 8,
      paddingBottom: 4,
      paddingLeft: 4,
      paddingRight: 4
    }
  }, _react.default.createElement(_ImagesInput.default, _extends({}, props, imagesInputProps)));
};

exports.default = _default;