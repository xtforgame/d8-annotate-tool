"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _recompose = require("recompose");

var _reactI18next = require("react-i18next");

var _styles = require("@material-ui/core/styles");

var _Button = _interopRequireDefault(require("@material-ui/core/Button"));

var _FormInputs = require("../FormInputs");

var _InputLinker = _interopRequireDefault(require("../../utils/InputLinker"));

var _helpers = require("../../utils/InputLinker/helpers");

var _FormPaper = _interopRequireDefault(require("../../styles/FormPaper"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const styles = theme => _objectSpread({}, (0, _FormPaper.default)(theme));

class SimpleLayout extends _react.default.PureComponent {
  constructor(props) {
    super(props);

    _defineProperty(this, "handleSubmit", () => {
      const {
        onSubmit = () => {}
      } = this.props;

      if (this.il.validate()) {
        const outputs = this.il.getOutputs();
        onSubmit(outputs);
      }
    });

    const {
      fields = [],
      namespace = '',
      defaultValues = {},
      ignoredUndefinedFromOutputs = true
    } = props;
    this.il = new _InputLinker.default(this, {
      namespace,
      ignoredUndefinedFromOutputs
    });
    this.il.add(...fields.map(field => ({
      presets: [field, (0, _helpers.propagateOnChangeEvent)()]
    })));
    this.il.setDefaultValues(defaultValues);
    this.state = this.il.mergeInitState({});
  }

  render() {
    const {
      t: translate,
      classes,
      submitButtonText,
      children
    } = this.props;
    return _react.default.createElement("div", null, _react.default.createElement(_FormInputs.FormSpace, {
      variant: "top"
    }), _react.default.createElement(_FormInputs.FormContent, null, this.il.fieldLinks.map(fieldLink => {
      const space = 'space' in fieldLink.options ? fieldLink.options.space : _react.default.createElement(_FormInputs.FormSpace, {
        variant: "content1"
      });
      return _react.default.createElement(_react.default.Fragment, {
        key: fieldLink.name
      }, this.il.renderComponent(fieldLink.name, {
        translate
      }), space);
    }), _react.default.createElement(_Button.default, {
      variant: "contained",
      fullWidth: true,
      color: "primary",
      className: classes.loginBtn,
      onClick: this.handleSubmit
    }, submitButtonText), _react.default.createElement(_FormInputs.FormSpace, {
      variant: "content1"
    })), children);
  }

}

var _default = (0, _recompose.compose)((0, _reactI18next.withTranslation)(['app-common']), (0, _styles.withStyles)(styles))(SimpleLayout);

exports.default = _default;