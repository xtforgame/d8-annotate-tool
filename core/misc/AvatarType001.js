"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _styles = require("@material-ui/core/styles");

var _Avatar = _interopRequireDefault(require("@material-ui/core/Avatar"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

const styles = theme => ({
  avatarImage: {
    width: '100%',
    height: '100%',
    textAlign: 'center',
    objectFit: 'cover'
  }
});

class AvatarType001 extends _react.default.PureComponent {
  render() {
    const _this$props = this.props,
          {
      classes,
      image,
      children
    } = _this$props,
          rest = _objectWithoutProperties(_this$props, ["classes", "image", "children"]);

    return _react.default.createElement(_Avatar.default, rest, _react.default.createElement("img", {
      alt: "me",
      src: image,
      className: classes.avatarImage
    }), children);
  }

}

var _default = (0, _styles.withStyles)(styles)(AvatarType001);

exports.default = _default;