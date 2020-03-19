"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = require("react");

var _styles = require("@material-ui/core/styles");

var _classnames = _interopRequireDefault(require("classnames"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const useStyles = (0, _styles.makeStyles)(theme => ({
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: 'rotate(180deg)'
  }
}));

var _default = props => {
  const {
    defaultExpanded,
    iconButtonClassName: cn = ''
  } = props;
  const classes = useStyles();
  const [expanded, setExpanded] = (0, _react.useState)(defaultExpanded);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const iconButtonClassName = (0, _classnames.default)(classes.expand, {
    [classes.expandOpen]: expanded
  }, cn);
  return {
    iconButtonClassName,
    expanded,
    setExpanded,
    toggleExpanded
  };
};

exports.default = _default;