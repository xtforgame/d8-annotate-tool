"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _styles = require("@material-ui/core/styles");

var _IconButton = _interopRequireDefault(require("@material-ui/core/IconButton"));

var _Menu = _interopRequireDefault(require("@material-ui/core/Menu"));

var _MenuItem = _interopRequireDefault(require("@material-ui/core/MenuItem"));

var _recompose = require("recompose");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const styles = theme => ({});

class PhoneRegionSelect extends _react.default.PureComponent {
  constructor(props) {
    super(props);

    _defineProperty(this, "handleClick", event => {
      this.setState({
        open: true,
        anchorEl: event.currentTarget
      });
    });

    _defineProperty(this, "handleRequestClose", () => {
      this.setState({
        open: false
      });
    });

    _defineProperty(this, "handleMenuItemClick", (event, index, locale) => {});

    this.state = {
      anchorEl: null,
      open: false
    };
  }

  getMenuItmes() {
    return ['TW', 'CN'].map((_locale, i) => _react.default.createElement(_MenuItem.default, {
      key: _locale,
      selected: true,
      onClick: event => this.handleMenuItemClick(event, i, _locale)
    }, _locale));
  }

  render() {
    const _this$props = this.props,
          {
      classes,
      locale,
      dispatch,
      changeLocale,
      regionCode
    } = _this$props,
          props = _objectWithoutProperties(_this$props, ["classes", "locale", "dispatch", "changeLocale", "regionCode"]);

    return _react.default.createElement("div", null, _react.default.createElement(_IconButton.default, _extends({
      color: "inherit",
      "aria-owns": this.state.open ? 'language-menu' : null,
      "aria-haspopup": "true"
    }, props, {
      onClick: this.handleClick
    }), _react.default.createElement("img", {
      alt: regionCode,
      src: `https://lipis.github.io/flag-icon-css/flags/4x3/${regionCode.toLowerCase()}.svg`,
      width: "24"
    })), _react.default.createElement(_Menu.default, {
      id: "simple-menu",
      anchorEl: this.state.anchorEl,
      open: this.state.open,
      onClose: this.handleRequestClose
    }, this.getMenuItmes()));
  }

}

var _default = (0, _recompose.compose)((0, _styles.withStyles)(styles))(PhoneRegionSelect);

exports.default = _default;