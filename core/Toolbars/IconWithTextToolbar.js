"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _styles = require("@material-ui/core/styles");

var _Toolbar = _interopRequireDefault(require("@material-ui/core/Toolbar"));

var _IconButton = _interopRequireDefault(require("@material-ui/core/IconButton"));

var _Typography = _interopRequireDefault(require("@material-ui/core/Typography"));

var _Close = _interopRequireDefault(require("@material-ui/icons/Close"));

var _common = _interopRequireDefault(require("../../styles/common"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const styles = theme => (0, _common.default)(theme, ['flex', 'appBar']);

class IconWithTextToolbar extends _react.default.PureComponent {
  render() {
    const {
      classes,
      title,
      headerLeftButton,
      headerLeftIcon,
      disableHeaderLeftButton,
      headerContent,
      onLeftButtonClick,
      toolbarProps
    } = this.props;
    return _react.default.createElement(_Toolbar.default, toolbarProps, !disableHeaderLeftButton && (headerLeftButton || _react.default.createElement(_IconButton.default, {
      color: "inherit",
      className: classes.menuButton,
      onClick: onLeftButtonClick,
      "aria-label": "Close"
    }, headerLeftIcon || _react.default.createElement(_Close.default, null))), title && _react.default.createElement(_Typography.default, {
      variant: "h6",
      color: "inherit",
      className: classes.flex1
    }, title), headerContent);
  }

}

var _default = (0, _styles.withStyles)(styles)(IconWithTextToolbar);

exports.default = _default;