"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _styles = require("@material-ui/core/styles");

var _Card = _interopRequireDefault(require("@material-ui/core/Card"));

var _ButtonBase = _interopRequireDefault(require("@material-ui/core/ButtonBase"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

const styles = theme => ({
  buttonBase: {
    marginTop: 8,
    marginBottom: 8,
    position: 'relative',
    textAlign: 'left',
    padding: 0
  }
});

class BotCard extends _react.default.PureComponent {
  render() {
    const _this$props = this.props,
          {
      classes,
      buttonProps: {
        className: buttonClassName
      } = {}
    } = _this$props,
          buttonProps = _objectWithoutProperties(_this$props.buttonProps, ["className"]),
          cardProps = _objectWithoutProperties(_this$props, ["classes", "buttonProps"]);

    return _react.default.createElement(_ButtonBase.default, _extends({
      focusRipple: true,
      className: (0, _classnames.default)(classes.buttonBase, buttonClassName)
    }, buttonProps), _react.default.createElement(_Card.default, cardProps));
  }

}

var _default = (0, _styles.withStyles)(styles, {
  withTheme: true
})(BotCard);

exports.default = _default;