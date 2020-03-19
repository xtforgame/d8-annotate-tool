"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _InputLinker = _interopRequireDefault(require("../../utils/InputLinker"));

var _helpers = require("../../utils/InputLinker/helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class LayoutBase extends _react.default.PureComponent {
  constructor(_props) {
    super(_props);

    _defineProperty(this, "resetInputLinker", (props, state) => {
      const {
        value,
        fields = [],
        namespace = '',
        defaultValues = {},
        ignoredUndefinedFromOutputs = true
      } = props;
      const il = new _InputLinker.default(this, {
        namespace,
        ignoredUndefinedFromOutputs,
        controlled: !!value
      });
      il.add(...fields.map(field => ({
        presets: [field, (0, _helpers.propagateOnChangeEvent)()]
      })));
      il.setDefaultValues(defaultValues);
      return il.mergeInitState(_objectSpread({}, state, {
        il,
        resetInputLinker: this.resetInputLinker
      }));
    });

    _defineProperty(this, "handleSubmit", () => {
      const {
        onSubmit = () => {}
      } = this.props;

      if (this.il.validate()) {
        const outputs = this.il.getOutputs();
        onSubmit(outputs, this.il);
        return {
          outputs,
          linker: this.il
        };
      }

      return null;
    });

    this.state = this.resetInputLinker(_props);
    this.il = this.state.il;
    const {
      onInited = () => {}
    } = this.props;
    onInited(this.il);
  }

  componentDidMount() {
    const {
      onDidMount = () => {}
    } = this.props;
    onDidMount(this.il);
  }

}

exports.default = LayoutBase;