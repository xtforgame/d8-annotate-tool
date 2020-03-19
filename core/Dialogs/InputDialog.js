"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _DialogContent = _interopRequireDefault(require("@material-ui/core/DialogContent"));

var _FormInputs = require("../FormInputs");

var _ConfirmDialog = _interopRequireDefault(require("./ConfirmDialog"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class InputDialog extends _react.default.PureComponent {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "handleEnterForTextField", event => {
      if (event.key === 'Enter') {
        this.handleClose(true);
        event.preventDefault();
      }
    });

    _defineProperty(this, "handleClose", _result => {
      let result = _result;

      if (result === true) {
        result = this.state.editingText;
      }

      if (this.props.onClose) {
        this.props.onClose(result);
      }
    });

    this.state = {
      editingText: this.props.value || ''
    };
  }

  render() {
    const _this$props = this.props,
          {
      id,
      label,
      onClose
    } = _this$props,
          rest = _objectWithoutProperties(_this$props, ["id", "label", "onClose"]);

    return _react.default.createElement(_ConfirmDialog.default, _extends({}, rest, {
      onClose: this.handleClose
    }), _react.default.createElement(_DialogContent.default, null, _react.default.createElement(_FormInputs.FormSpace, {
      variant: "content2"
    }), _react.default.createElement(_FormInputs.FormTextField, {
      id: id,
      label: label,
      onKeyPress: this.handleEnterForTextField,
      value: this.state.editingText,
      onChange: e => this.setState({
        editingText: e.target.value
      }),
      autoFocus: true,
      margin: "dense",
      fullWidth: true
    })));
  }

}

exports.default = InputDialog;
InputDialog.propTypes = {
  id: _propTypes.default.string.isRequired,
  open: _propTypes.default.bool.isRequired,
  onClose: _propTypes.default.func.isRequired
};