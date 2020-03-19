"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styles = require("@material-ui/core/styles");

var _classnames = _interopRequireDefault(require("classnames"));

var _Card = _interopRequireDefault(require("@material-ui/core/Card"));

var _CardHeader = _interopRequireDefault(require("@material-ui/core/CardHeader"));

var _CardContent = _interopRequireDefault(require("@material-ui/core/CardContent"));

var _Collapse = _interopRequireDefault(require("@material-ui/core/Collapse"));

var _IconButton = _interopRequireDefault(require("@material-ui/core/IconButton"));

var _ExpandMore = _interopRequireDefault(require("@material-ui/icons/ExpandMore"));

var _useExpansion = _interopRequireDefault(require("../Card/useExpansion"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const useStyles = (0, _styles.makeStyles)(theme => ({
  card: {
    marginTop: 8,
    marginBottom: 8,
    maxWidth: 400
  },
  expand: {
    marginLeft: 'auto',
    marginRight: -8,
    [theme.breakpoints.up('sm')]: {
      marginRight: 0
    }
  },
  headerRoot: {},
  headerAction: {
    marginTop: 'auto',
    marginBottom: 'auto'
  },
  headerContent: {
    overflowX: 'hidden',
    [theme.breakpoints.up('sm')]: {
      maxWidth: 'unset'
    }
  },
  contentRoot: {
    padding: 8,
    '&:last-child': {
      paddingBottom: 8
    },
    [theme.breakpoints.up('sm')]: {
      padding: 24,
      '&:last-child': {
        paddingBottom: 24
      }
    }
  }
}));

var _default = props => {
  const {
    avatar,
    title,
    subheader,
    children,
    cardClassName,
    headerClassName,
    withoutCardContent
  } = props;
  const classes = useStyles();
  const {
    iconButtonClassName,
    expanded,
    toggleExpanded
  } = (0, _useExpansion.default)({
    defaultExpanded: 'defaultExpanded' in props ? props.defaultExpanded : false,
    iconButtonClassName: classes.expand
  });
  const content = withoutCardContent ? children : _react.default.createElement(_CardContent.default, {
    classes: {
      root: classes.contentRoot
    }
  }, children);
  return _react.default.createElement(_Card.default, {
    className: (0, _classnames.default)(classes.card, cardClassName)
  }, _react.default.createElement(_CardHeader.default, {
    avatar: avatar,
    classes: {
      root: classes.headerRoot,
      action: classes.headerAction,
      content: classes.headerContent
    },
    className: headerClassName,
    action: _react.default.createElement(_IconButton.default, {
      className: iconButtonClassName,
      onClick: toggleExpanded,
      "aria-expanded": expanded,
      "aria-label": "Show more"
    }, _react.default.createElement(_ExpandMore.default, null)),
    title: title,
    subheader: subheader
  }), _react.default.createElement(_Collapse.default, {
    in: expanded,
    timeout: "auto",
    unmountOnExit: true
  }, content));
};

exports.default = _default;