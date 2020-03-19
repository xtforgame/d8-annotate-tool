"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.EditorWrapper = void 0;

var _react = _interopRequireDefault(require("react"));

var _editorjs = _interopRequireDefault(require("@editorjs/editorjs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class EditorWrapper extends _react.default.PureComponent {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "editor", void 0);

    _defineProperty(this, "node", _react.default.createRef());

    _defineProperty(this, "handleChange", async () => {
      const {
        onChange,
        onData
      } = this.props;

      if (onChange && typeof onChange === 'function') {
        onChange();
      }

      if (onData && typeof onData === 'function') {
        this.emitDataEvent(onData);
      }
    });

    _defineProperty(this, "emitDataEvent", async cb => {
      try {
        const output = await this.editor.save();
        cb(output);
      } catch (error) {
        console.error('Saving failed: ', error);
      }
    });

    _defineProperty(this, "removeEditor", async () => {
      if (this.editor) {
        try {
          await this.editor.isReady;
          this.editor.destroy();
          delete this.editor;
          return true;
        } catch (err) {
          console.error(err);
          return false;
        }
      }

      return false;
    });

    _defineProperty(this, "getHolderNode", () => {
      const holder = this.node.current;

      if (!holder) {
        throw new Error('No node to append Editor.js');
      }

      return holder;
    });
  }

  componentDidMount() {
    this.initEditor();
  }

  async componentDidUpdate() {
    const {
      reinitOnPropsChange
    } = this.props;

    if (reinitOnPropsChange) {
      const removed = await this.removeEditor();

      if (removed) {
        this.initEditor();
      }
    }
  }

  componentWillUnmount() {
    this.removeEditor();
  }

  async initEditor() {
    const _this$props = this.props,
          {
      holder
    } = _this$props,
          config = _objectWithoutProperties(_this$props, ["holder"]);

    const {
      handleChange
    } = this;
    const holderNode = !holder ? this.getHolderNode() : holder;
    this.editor = new _editorjs.default(_objectSpread({}, config, {
      holder: holderNode,
      onChange: handleChange
    }));
  }

  render() {
    if (!this.props.holder) {
      return _react.default.createElement("div", {
        style: {
          padding: 4
        },
        ref: this.node
      });
    }

    return null;
  }

}

exports.EditorWrapper = EditorWrapper;
var _default = EditorWrapper;
exports.default = _default;