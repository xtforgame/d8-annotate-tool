"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _moment = _interopRequireDefault(require("moment"));

var _pickers = require("@material-ui/pickers");

var _reactI18next = require("react-i18next");

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var _default = props => {
  const {
    value = null,
    format,
    onChange = () => undefined
  } = props,
        rest = _objectWithoutProperties(props, ["value", "format", "onChange"]);

  const {
    t
  } = (0, _reactI18next.useTranslation)(['builtin-components']);
  const baseProps = {
    inputVariant: 'outlined',
    fullWidth: true,
    format: _utils.timeDisplayFormat,
    cancelLabel: t('confirmCancel'),
    clearLabel: t('formClear'),
    okLabel: t('confirmOK'),
    invalidLabel: props.label ? '' : t('notSelected'),
    clearable: true
  };
  return _react.default.createElement(_pickers.TimePicker, _extends({}, baseProps, rest, {
    value: value,
    labelFunc: (0, _utils.getTimeDisplayFuncFromProps)(props),
    onChange: v => v === null ? onChange(v) : onChange((0, _moment.default)(v).format(_utils.timeFormat))
  }));
};

exports.default = _default;