"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _recompose = require("recompose");

var _styles = require("@material-ui/core/styles");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const styles = theme => ({
  content: {
    margin: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    marginLeft: theme.spacing(4),
    marginRight: theme.spacing(4),
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(12),
      marginRight: theme.spacing(12)
    }
  }
});

const FormContent = props => _react.default.createElement("div", {
  className: props.classes.content
}, props.children);

var _default = (0, _recompose.compose)((0, _styles.withStyles)(styles))(FormContent);

exports.default = _default;