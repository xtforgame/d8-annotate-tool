"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _IconButton = _interopRequireDefault(require("@material-ui/core/IconButton"));

var _Menu = _interopRequireDefault(require("@material-ui/core/Menu"));

var _MoreVert = _interopRequireDefault(require("@material-ui/icons/MoreVert"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class EnhancedTableActionMenuButton extends _react.default.PureComponent {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", {
      anchorEl: null,
      open: false
    });

    _defineProperty(this, "handleClick", event => {
      this.setState({
        anchorEl: event.currentTarget,
        open: true
      });
    });

    _defineProperty(this, "handleClose", () => {
      this.setState({
        anchorEl: null,
        open: false
      });
    });
  }

  render() {
    const _this$props = this.props,
          {
      parentId,
      getActionMenuItems = () => null
    } = _this$props,
          props = _objectWithoutProperties(_this$props, ["parentId", "getActionMenuItems"]);

    const {
      anchorEl,
      open
    } = this.state;
    return _react.default.createElement("div", null, _react.default.createElement(_IconButton.default, {
      "aria-label": "More",
      "aria-haspopup": "true",
      onClick: this.handleClick
    }, _react.default.createElement(_MoreVert.default, null)), _react.default.createElement(_Menu.default, _extends({
      anchorEl: anchorEl,
      open: open,
      onClose: this.handleClose
    }, props), getActionMenuItems(this.handleClose)));
  }

}

var _default = EnhancedTableActionMenuButton;
exports.default = _default;