"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styles = require("@material-ui/core/styles");

var _classnames = _interopRequireDefault(require("classnames"));

var _Card = _interopRequireDefault(require("@material-ui/core/Card"));

var _CardContent = _interopRequireDefault(require("@material-ui/core/CardContent"));

var _CardActions = _interopRequireDefault(require("@material-ui/core/CardActions"));

var _Collapse = _interopRequireDefault(require("@material-ui/core/Collapse"));

var _List = _interopRequireDefault(require("@material-ui/core/List"));

var _ListItem = _interopRequireDefault(require("@material-ui/core/ListItem"));

var _ListItemText = _interopRequireDefault(require("@material-ui/core/ListItemText"));

var _IconButton = _interopRequireDefault(require("@material-ui/core/IconButton"));

var _Typography = _interopRequireDefault(require("@material-ui/core/Typography"));

var _red = _interopRequireDefault(require("@material-ui/core/colors/red"));

var _Refresh = _interopRequireDefault(require("@material-ui/icons/Refresh"));

var _Launch = _interopRequireDefault(require("@material-ui/icons/Launch"));

var _ExpandMore = _interopRequireDefault(require("@material-ui/icons/ExpandMore"));

var _Chip = _interopRequireDefault(require("@material-ui/core/Chip"));

var _Divider = _interopRequireDefault(require("@material-ui/core/Divider"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const styles = theme => ({
  card: {
    maxWidth: 350,
    height: 'fit-content',
    margin: theme.spacing(1)
  },
  cardLayout: {
    display: 'flex'
  },
  details: {
    display: 'flex',
    flexDirection: 'column'
  },
  content: {
    flex: '1 0 auto'
  },
  cover: {
    width: 151,
    height: 151
  },
  controls: {
    display: 'flex',
    alignItems: 'baseline',
    padding: 16
  },
  playIcon: {
    height: 38,
    width: 38
  },
  media: {
    height: 0,
    paddingTop: '56.25%'
  },
  actions: {
    display: 'flex'
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    }),
    marginLeft: 'auto'
  },
  expandOpen: {
    transform: 'rotate(180deg)'
  },
  avatar: {
    backgroundColor: _red.default[500]
  },
  healthy: {
    color: theme.status.success.main
  },
  warning: {
    color: theme.status.warning.main
  },
  danger: {
    color: theme.status.danger.main
  },
  unknown: {
    color: theme.palette.action.disabled
  },
  inactive: {
    color: theme.palette.action.disabled
  },
  flex1: {
    flex: 1
  },
  chip: {
    margin: 2
  },
  chipContainer: {
    display: 'flex',
    flexWrap: 'wrap'
  }
});

class ContainerCard extends _react.default.PureComponent {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", {
      expanded: false
    });

    _defineProperty(this, "handleExpandClick", () => {
      this.setState({
        expanded: !this.state.expanded
      });
    });
  }

  render() {
    const {
      classes,
      name,
      status = {
        type: 'unknown',
        state: 'unknown'
      },
      tags = {},
      ports = [],
      image
    } = this.props;
    const tagList = Object.keys(tags).sort().map(key => ({
      key,
      value: tags[key],
      label: `${key} : ${tags[key]}`
    }));
    const portList = ports.sort((a, b) => a.number - b.number).map(({
      type,
      number
    }) => `${number} : ${type}`);
    return _react.default.createElement(_Card.default, {
      className: classes.card
    }, _react.default.createElement("div", {
      className: classes.cardLayout
    }, _react.default.createElement("div", {
      className: classes.details
    }, _react.default.createElement(_CardContent.default, {
      className: classes.content
    }, _react.default.createElement(_Typography.default, {
      variant: "subtitle1"
    }, name), _react.default.createElement(_Typography.default, {
      variant: "subtitle1",
      color: "textSecondary",
      classes: {
        subtitle1: classes[status.type]
      }
    }, status.state)), _react.default.createElement(_Divider.default, null), _react.default.createElement(_List.default, null, _react.default.createElement(_ListItem.default, null, _react.default.createElement(_ListItemText.default, {
      primary: "Image",
      secondary: image
    })), _react.default.createElement(_ListItem.default, null, _react.default.createElement(_ListItemText.default, {
      disableTypography: true,
      primary: _react.default.createElement(_Typography.default, {
        variant: "subtitle1"
      }, "Tags"),
      secondary: _react.default.createElement("div", {
        className: classes.chipContainer
      }, tagList.map(tag => _react.default.createElement(_Chip.default, {
        key: tag.key,
        label: tag.label,
        className: classes.chip
      })))
    }))))), _react.default.createElement(_CardActions.default, {
      className: classes.actions
    }, _react.default.createElement(_IconButton.default, {
      "aria-label": "Refresh"
    }, _react.default.createElement(_Refresh.default, null)), _react.default.createElement(_IconButton.default, {
      "aria-label": "Launch"
    }, _react.default.createElement(_Launch.default, null)), _react.default.createElement(_IconButton.default, {
      className: (0, _classnames.default)(classes.expand, {
        [classes.expandOpen]: this.state.expanded
      }),
      onClick: this.handleExpandClick,
      "aria-expanded": this.state.expanded,
      "aria-label": "Show more"
    }, _react.default.createElement(_ExpandMore.default, null))), _react.default.createElement(_Collapse.default, {
      in: this.state.expanded,
      timeout: "auto",
      unmountOnExit: true
    }, _react.default.createElement(_List.default, null, _react.default.createElement(_ListItem.default, null, _react.default.createElement(_ListItemText.default, {
      disableTypography: true,
      primary: _react.default.createElement(_Typography.default, {
        variant: "subtitle1"
      }, "Ports"),
      secondary: _react.default.createElement("div", {
        className: classes.chipContainer
      }, portList.map(port => _react.default.createElement(_Chip.default, {
        key: port,
        label: port,
        className: classes.chip
      })))
    })))));
  }

}

_defineProperty(ContainerCard, "propTypes", {
  status: _propTypes.default.shape({
    type: _propTypes.default.oneOf(['healthy', 'warning', 'danger', 'inactive', 'unknown']).isRequired,
    state: _propTypes.default.string.isRequired
  })
});

var _default = (0, _styles.withStyles)(styles, {
  withTheme: true
})(ContainerCard);

exports.default = _default;