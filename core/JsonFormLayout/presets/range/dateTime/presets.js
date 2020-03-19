"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DateTimeRangePreset = exports.TimeRangePreset = exports.DateRangePreset = exports.DateTimeRangePresetBase = void 0;

var _react = _interopRequireDefault(require("react"));

var _FormDialogInput = _interopRequireDefault(require("../../../../FormInputs/FormDialogInput"));

var _DateRange = _interopRequireDefault(require("../../../../Range/DateTime/DateRange"));

var _TimeRange = _interopRequireDefault(require("../../../../Range/DateTime/TimeRange"));

var _DateTimeRange = _interopRequireDefault(require("../../../../Range/DateTime/DateTimeRange"));

var _RangeDialog = _interopRequireDefault(require("../../../../Range/RangeDialog"));

var _utils = require("../../../../FormInputs/FormDateTimePicker/utils");

var _utils2 = require("../../../../Range/DateTime/utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const DateTimeRangePresetBase = () => ({
  converter: {
    fromView: ([v]) => v
  }
});

exports.DateTimeRangePresetBase = DateTimeRangePresetBase;

const DateRangePreset = () => ({
  presets: [DateTimeRangePresetBase()],
  component: _FormDialogInput.default,
  extraProps: {
    buttonProps: {
      fullWidth: true
    },
    renderDialog: ({
      label,
      title,
      open,
      handleClose,
      value,
      dialogProps
    }) => _react.default.createElement(_RangeDialog.default, _extends({
      title: title != null ? title : label,
      normalize: _utils2.normalizeDateTime,
      open: open,
      onClose: handleClose,
      value: value,
      RangeInput: _DateRange.default
    }, dialogProps))
  },
  cfgMiddlewares: {
    last: cfg => _objectSpread({}, cfg, {
      mwRender: ({
        props,
        value,
        handleChange,
        link: {
          host,
          hostProps,
          linker
        }
      }) => ({
        displayValue: (0, _utils2.getDateRangeDisplayFunc)((0, _utils.getDateDisplayFuncFromProps)(props)),
        value,
        onChange: handleChange
      })
    })
  }
});

exports.DateRangePreset = DateRangePreset;

const TimeRangePreset = () => ({
  presets: [DateTimeRangePresetBase()],
  component: _FormDialogInput.default,
  extraProps: {
    buttonProps: {
      fullWidth: true
    },
    renderDialog: ({
      label,
      title,
      open,
      handleClose,
      value,
      dialogProps
    }) => _react.default.createElement(_RangeDialog.default, _extends({
      title: title != null ? title : label,
      normalize: _utils2.normalizeDateTime,
      open: open,
      onClose: handleClose,
      value: value,
      RangeInput: _TimeRange.default
    }, dialogProps))
  },
  cfgMiddlewares: {
    last: cfg => _objectSpread({}, cfg, {
      mwRender: ({
        props,
        value,
        handleChange,
        link: {
          host,
          hostProps,
          linker
        }
      }) => ({
        displayValue: (0, _utils2.getDateRangeDisplayFunc)((0, _utils.getTimeDisplayFuncFromProps)(props)),
        value,
        onChange: handleChange
      })
    })
  }
});

exports.TimeRangePreset = TimeRangePreset;

const DateTimeRangePreset = () => ({
  presets: [DateTimeRangePresetBase()],
  component: _FormDialogInput.default,
  extraProps: {
    buttonProps: {
      fullWidth: true
    },
    renderDialog: ({
      label,
      title,
      open,
      handleClose,
      value,
      dialogProps
    }) => _react.default.createElement(_RangeDialog.default, _extends({
      title: title != null ? title : label,
      normalize: _utils2.normalizeDateTime,
      open: open,
      onClose: handleClose,
      value: value,
      RangeInput: _DateTimeRange.default
    }, dialogProps))
  },
  cfgMiddlewares: {
    last: cfg => _objectSpread({}, cfg, {
      mwRender: ({
        props,
        value,
        handleChange
      }) => ({
        displayValue: (0, _utils2.getDateRangeDisplayFunc)((0, _utils.getDateTimeDisplayFuncFromProps)(props)),
        value,
        onChange: handleChange
      })
    })
  }
});

exports.DateTimeRangePreset = DateTimeRangePreset;