"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _recompose = require("recompose");

var _styles = require("@material-ui/core/styles");

var _FormPaper = _interopRequireDefault(require("../../styles/FormPaper"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const InternalLink = ({
  text,
  classes
}) => _react.default.createElement("a", {
  role: "button",
  tabIndex: -1,
  className: classes.link,
  onClick: event => {
    event.stopPropagation();
    event.preventDefault();
  }
}, text);

var _default = (0, _recompose.compose)((0, _styles.withStyles)(_FormPaper.default))(InternalLink);

exports.default = _default;