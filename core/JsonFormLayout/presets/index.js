"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Button = _interopRequireDefault(require("@material-ui/core/Button"));

var _FormInputs = require("../../FormInputs");

var _autoCalculablePreset = _interopRequireDefault(require("./autoCalculablePreset"));

var _presets = require("./range/presets");

var _helpers = require("../../../utils/InputLinker/helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const _ = () => ({
  text: {
    presets: [_helpers.FormTextFieldPreset]
  },
  password: {
    presets: [_helpers.FormTextFieldPreset],
    component: _FormInputs.FormPasswordInput,
    cfgMiddlewares: {
      last: cfg => _objectSpread({}, cfg, {
        childLinks: [{
          name: `${cfg.name}Visibility`,
          presets: [_helpers.FormPasswordVisibilityPreset],
          defaultValue: false
        }]
      })
    }
  },
  checkbox: {
    presets: [_helpers.FormCheckboxPreset],
    extraProps: {
      dense: 'true',
      color: 'primary'
    }
  },
  button: {
    presets: [(0, _helpers.createIgnoredPreset)(_Button.default)],
    component: _Button.default
  },
  colorInlinePicker: {
    presets: [_helpers.FormTextFieldLikePreset],
    component: _FormInputs.FormColorPicker,
    converter: {
      fromView: ([v]) => v
    }
  },
  dateOld: {
    presets: [_helpers.DatePickerPreset],
    extraProps: {
      variant: 'outlined',
      fullWidth: true
    }
  },
  date: {
    component: _FormInputs.FormDatePicker,
    presets: [_helpers.FormTextFieldLikePreset],
    converter: {
      fromView: ([v]) => v,
      toView: v => v
    },
    extraProps: {
      fullWidth: true
    },
    mwRender: ({
      handleChange,
      value
    }) => ({
      value,
      onChange: handleChange
    })
  },
  dateRange: {
    presets: [(0, _presets.DateRangePreset)()]
  },
  time: {
    component: _FormInputs.FormTimePicker,
    converter: {
      fromView: ([v]) => v,
      toView: v => v
    },
    extraProps: {
      fullWidth: true
    },
    mwRender: ({
      handleChange,
      value
    }) => ({
      value,
      onChange: handleChange
    })
  },
  timeRange: {
    presets: [(0, _presets.TimeRangePreset)()]
  },
  dateTime: {
    component: _FormInputs.FormDateTimePicker,
    converter: {
      fromView: ([v]) => v,
      toView: v => v
    },
    extraProps: {
      fullWidth: true
    },
    mwRender: ({
      handleChange,
      value
    }) => ({
      value,
      onChange: handleChange
    })
  },
  dateTimeRange: {
    presets: [(0, _presets.DateTimeRangePreset)()]
  },
  submit: {
    presets: ['button'],
    extraProps: {
      variant: 'contained',
      color: 'primary',
      fullWidth: true
    },
    mwRender: ({
      link: {
        host,
        hostProps,
        linker
      }
    }) => ({
      className: hostProps.classesByNs.loginBtn,
      onClick: host.handleSubmit
    })
  },
  translateProp: _helpers.translateProp,
  autoCalculable: (0, _autoCalculablePreset.default)()
});

var _default = _();

exports.default = _default;