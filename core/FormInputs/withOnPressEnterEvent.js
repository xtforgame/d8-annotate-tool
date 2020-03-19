"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = withOnPressEnterEvent;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function withOnPressEnterEvent(TextFieldComponent) {
  var _temp;

  return _temp = class extends _react.default.PureComponent {
    constructor(...args) {
      super(...args);

      _defineProperty(this, "state", {
        isOnComposition: false
      });

      _defineProperty(this, "onKeyPressed", e => {
        const {
          onPressEnter = () => {},
          multiline
        } = this.props;
        const {
          onPressEnterCheckCondition = event => !multiline || event.nativeEvent.shiftKey
        } = this.props;
        const {
          isOnComposition
        } = this.state;

        if (!isOnComposition && e.keyCode === 13 && onPressEnterCheckCondition(e)) {
          onPressEnter(e);
        }
      });

      _defineProperty(this, "handleComposition", e => {
        if (e.type === 'compositionend') {
          this.setState({
            isOnComposition: false
          });
        } else {
          this.setState({
            isOnComposition: true
          });
        }
      });
    }

    render() {
      const _this$props = this.props,
            {
        onKeyDown = () => {},
        onCompositionStart = () => {},
        onCompositionUpdate = () => {},
        onCompositionEnd = () => {},
        onPressEnter,
        onPressEnterCheckCondition
      } = _this$props,
            rest = _objectWithoutProperties(_this$props, ["onKeyDown", "onCompositionStart", "onCompositionUpdate", "onCompositionEnd", "onPressEnter", "onPressEnterCheckCondition"]);

      return _react.default.createElement(TextFieldComponent, _extends({
        onKeyDown: e => {
          onKeyDown(e);
          this.onKeyPressed(e);
        },
        onCompositionStart: e => {
          onCompositionStart(e);
          this.handleComposition(e);
        },
        onCompositionUpdate: e => {
          onCompositionUpdate(e);
          this.handleComposition(e);
        },
        onCompositionEnd: e => {
          onCompositionEnd(e);
          this.handleComposition(e);
        }
      }, rest));
    }

  }, _temp;
}