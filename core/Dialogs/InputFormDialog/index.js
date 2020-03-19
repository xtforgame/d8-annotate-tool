"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _FormInputs = require("../../FormInputs");

var _DialogLayout = _interopRequireDefault(require("../../FormLayouts/DialogLayout"));

var _ConfirmDialog = _interopRequireDefault(require("../ConfirmDialog"));

var _InputFormDialogContent = _interopRequireDefault(require("./InputFormDialogContent"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class InputFormDialog extends _react.default.PureComponent {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "handleClose", _result => {
      let result = _result;

      if (result === true) {
        result = this.linker.host.handleSubmit();

        if (!result) {
          return;
        }

        result = result.outputs;
      } else {
        const {
          onClose
        } = this.props;

        if (onClose) {
          onClose(result);
        }
      }
    });

    _defineProperty(this, "handleSubmit", result => {
      const {
        onClose
      } = this.props;

      if (onClose) {
        onClose(result);
      }
    });
  }

  render() {
    const {
      title,
      fullScreen,
      open,
      dialogProps,
      fields,
      defaultValues,
      formProps
    } = this.props;
    return _react.default.createElement(_ConfirmDialog.default, _extends({
      title: title,
      open: open,
      fullScreen: fullScreen
    }, dialogProps, {
      onClose: this.handleClose
    }), _react.default.createElement(_DialogLayout.default, _extends({
      Content: _InputFormDialogContent.default,
      topSpace: fullScreen ? _react.default.createElement(_FormInputs.FormSpace, {
        variant: "content2"
      }) : _react.default.createElement(_FormInputs.FormSpace, {
        variant: "content0"
      })
    }, formProps, {
      onInited: linker => this.linker = linker,
      fields: fields,
      defaultValues: defaultValues,
      onSubmit: this.handleSubmit
    })));
  }

}

exports.default = InputFormDialog;