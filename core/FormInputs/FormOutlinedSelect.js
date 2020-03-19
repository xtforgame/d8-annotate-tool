"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _recompose = require("recompose");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styles = require("@material-ui/core/styles");

var _OutlinedInput = _interopRequireDefault(require("@material-ui/core/OutlinedInput"));

var _InputLabel = _interopRequireDefault(require("@material-ui/core/InputLabel"));

var _FormControl = _interopRequireDefault(require("@material-ui/core/FormControl"));

var _FormHelperText = _interopRequireDefault(require("@material-ui/core/FormHelperText"));

var _Select = _interopRequireDefault(require("@material-ui/core/Select"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const styles = theme => ({});

class FormOutlinedSelect extends _react.default.PureComponent {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", {
      labelWidth: 0
    });
  }

  componentDidMount() {
    this.setState({
      labelWidth: _reactDom.default.findDOMNode(this.InputLabelRef).offsetWidth
    });
  }

  render() {
    const _this$props = this.props,
          {
      id,
      name,
      label,
      helperText,
      formProps,
      inputProps,
      classes,
      children
    } = _this$props,
          rest = _objectWithoutProperties(_this$props, ["id", "name", "label", "helperText", "formProps", "inputProps", "classes", "children"]);

    return _react.default.createElement(_FormControl.default, _extends({
      variant: "outlined"
    }, formProps), !!label && _react.default.createElement(_InputLabel.default, {
      ref: ref => {
        this.InputLabelRef = ref;
      },
      htmlFor: id
    }, label), _react.default.createElement(_Select.default, _extends({
      input: _react.default.createElement(_OutlinedInput.default, _extends({}, inputProps, {
        labelWidth: this.state.labelWidth,
        name: name,
        id: id
      }))
    }, rest), children), !!helperText && _react.default.createElement(_FormHelperText.default, {
      id: `${id}-helper-text`
    }, "XXXXX"));
  }

}

FormOutlinedSelect.propTypes = {
  id: _propTypes.default.string.isRequired,
  name: _propTypes.default.string.isRequired
};

var _default = (0, _recompose.compose)((0, _styles.withStyles)(styles))(FormOutlinedSelect);

exports.default = _default;