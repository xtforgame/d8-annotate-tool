"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _styles = require("@material-ui/core/styles");

var _DialogContent = _interopRequireDefault(require("@material-ui/core/DialogContent"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const styles = theme => ({
  root: {
    minWidth: 300
  }
});

const InputFormDialogContent = props => _react.default.createElement(_DialogContent.default, props);

var _default = (0, _styles.withStyles)(styles)(InputFormDialogContent);

exports.default = _default;