"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _recompose = require("recompose");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styles = require("@material-ui/core/styles");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const styles = theme => ({
  content0: {
    height: 0,
    flexShrink: 0
  },
  content1: {
    height: theme.spacing(1),
    flexShrink: 0
  },
  content2: {
    height: theme.spacing(2),
    flexShrink: 0
  },
  content4: {
    height: theme.spacing(4),
    flexShrink: 0
  },
  content8: {
    height: theme.spacing(8),
    flexShrink: 0
  },
  top: {
    height: theme.spacing(8),
    flexShrink: 0
  },
  'h-content0': {
    width: 0,
    flexShrink: 0
  },
  'h-content1': {
    width: theme.spacing(1),
    flexShrink: 0
  },
  'h-content2': {
    width: theme.spacing(2),
    flexShrink: 0
  },
  'h-content4': {
    width: theme.spacing(4),
    flexShrink: 0
  },
  'h-content8': {
    width: theme.spacing(8),
    flexShrink: 0
  }
});

const FormSpace = props => {
  const {
    variant = 'content1'
  } = props;
  return _react.default.createElement("div", {
    className: props.classes[variant]
  });
};

FormSpace.propTypes = {
  variant: _propTypes.default.oneOf(['top', 'content0', 'content1', 'content2', 'content4', 'content8', 'h-content0', 'h-content1', 'h-content2', 'h-content4', 'h-content8'])
};

var _default = (0, _recompose.compose)((0, _styles.withStyles)(styles))(FormSpace);

exports.default = _default;