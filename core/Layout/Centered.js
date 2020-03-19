"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _styles = require("@material-ui/core/styles");

var _classnames = _interopRequireDefault(require("classnames"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const styles = theme => ({
  aligner: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  alignerItem: {
    flex: '1'
  },
  alignerItemTop: {
    alignSelf: 'flex-start'
  },
  alignerItemBottom: {
    alignSelf: 'flex-end'
  },
  alignerItemFixed: {
    flex: 'none'
  }
});

const Centered = props => _react.default.createElement("div", {
  className: (0, _classnames.default)(props.classes.aligner, props.className)
}, _react.default.createElement("div", {
  className: (0, _classnames.default)(props.classes.alignerItem, props.classes.alignerItemTop)
}), _react.default.createElement("div", {
  className: (0, _classnames.default)(props.classes.alignerItemFixed)
}, props.children), _react.default.createElement("div", {
  className: (0, _classnames.default)(props.classes.alignerItem, props.classes.alignerItemBottom)
}));

var _default = (0, _styles.withStyles)(styles)(Centered);

exports.default = _default;