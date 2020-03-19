"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createDefaultContainer = exports.raiseDirtyFlagOnChangeEvent = exports.propagateOnChangeEvent = exports.addOnPressEnterEvent = exports.translateLabel = exports.translateProp = exports.mwpListItemDisplayer = exports.createIgnoredPreset = exports.FormCodeInputPreset = exports.FormPhoneOrEmailInputPreset = exports.FormCheckboxPreset = exports.FormPasswordVisibilityPreset = exports.createMenuItemConfig = exports.DatePickerWithoutYearPreset = exports.DatePickerPreset = exports.DateTimePickerPreset = exports.DateTimePickerBasePreset = exports.FormSwitchPreset = exports.FormSelectPreset = exports.FormTextInputPreset = exports.mwpDisplayErrorFromPropsForTextField = exports.createListInputPreset = exports.createFormNumberInputPreset = exports.FormTextFieldPreset = exports.FormTextFieldLikePreset = exports.assert = void 0;

var _react = _interopRequireDefault(require("react"));

var _moment = _interopRequireDefault(require("moment"));

var _pickers = require("@material-ui/pickers");

var _Typography = _interopRequireDefault(require("@material-ui/core/Typography"));

var _ListItemText = _interopRequireDefault(require("@material-ui/core/ListItemText"));

var _MenuItem = _interopRequireDefault(require("@material-ui/core/MenuItem"));

var _BreakAllContentText = _interopRequireDefault(require("../../core/Text/BreakAllContentText"));

var _FormInputs = require("../../core/FormInputs");

var _validators = require("../../common/utils/validators");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const assert = (condition, message, i18n) => {
  if (!condition) {
    const error = new Error(message || 'Validation failed');
    error.i18n = i18n;
    throw error;
  }
};

exports.assert = assert;
const FormTextFieldLikePreset = {
  component: _FormInputs.FormTextField,
  cfgMiddlewares: {
    last: {
      mwRender: ({
        props,
        value,
        link,
        handleChange,
        validateError,
        options: {
          translate
        }
      }) => {
        const validateErrorMessage = validateError && (validateError.i18n && translate(validateError.i18n.key, validateError.i18n.values) || validateError.message);
        return {
          id: link.key,
          value,
          onChange: handleChange,
          error: props.error || !!validateErrorMessage,
          helperText: validateErrorMessage || props.helperText
        };
      }
    }
  }
};
exports.FormTextFieldLikePreset = FormTextFieldLikePreset;
const FormTextFieldPreset = FormTextFieldLikePreset;
exports.FormTextFieldPreset = FormTextFieldPreset;

const createFormNumberInputPreset = (currency = false) => cfg => _objectSpread({}, cfg, {
  component: _FormInputs.FormNumberInput,
  extraProps: {
    currency
  }
});

exports.createFormNumberInputPreset = createFormNumberInputPreset;

const createListInputPreset = createRow => cfg => _objectSpread({}, cfg, {
  component: _FormInputs.ListInput,
  converter: {
    fromView: ([{
      type,
      id,
      value: valueArray
    }], linkInfo) => {
      switch (type) {
        case 'add':
          {
            return [...valueArray, createRow({
              type,
              id,
              valueArray
            }, linkInfo)];
          }

        default:
          {
            return [...valueArray];
          }
      }
    }
  },
  mwRender: ({
    value,
    link,
    handleChange
  }) => ({
    id: link.key,
    value,
    onChange: handleChange
  })
});

exports.createListInputPreset = createListInputPreset;

const mwpDisplayErrorFromPropsForTextField = (propKey, getMessageFunc = e => e) => ({
  props,
  link: {
    hostProps
  },
  validateError
}) => {
  const newProps = {};
  const errorFromProps = hostProps[propKey];

  if (!validateError && errorFromProps) {
    newProps.error = true;
    newProps.helperText = getMessageFunc(errorFromProps) || props.helperText;
  }

  return newProps;
};

exports.mwpDisplayErrorFromPropsForTextField = mwpDisplayErrorFromPropsForTextField;
const InputTypePreset = {
  cfgMiddlewares: {
    last: cfg => _objectSpread({}, cfg, {
      mwRender: [({
        props,
        value,
        link,
        handleChange,
        validateError,
        options: {
          translate
        }
      }) => {
        const validateErrorMessage = validateError && (validateError.i18n && translate(validateError.i18n.key, validateError.i18n.values) || validateError.message);
        return {
          id: link.key,
          value,
          onChange: handleChange,
          formProps: _objectSpread({}, props.formProps, {
            error: !!validateErrorMessage
          }),
          helperText: validateErrorMessage || props.helperText
        };
      }, ({
        props
      }) => {
        const formProps = props.formProps || {};

        const style = _objectSpread({}, formProps.style);

        if (props.fullWidth && !('width' in style)) {
          style.width = '100%';
        }

        return {
          formProps: _objectSpread({}, formProps, {
            style
          })
        };
      }]
    })
  }
};
const FormTextInputPreset = {
  presets: [InputTypePreset],
  component: _FormInputs.FormTextInput
};
exports.FormTextInputPreset = FormTextInputPreset;
const FormSelectPreset = {
  presets: [InputTypePreset],
  component: _FormInputs.FormSelect,
  mwRender: ({
    link
  }) => ({
    name: link.name
  })
};
exports.FormSelectPreset = FormSelectPreset;
const FormSwitchPreset = {
  component: _FormInputs.FormSwitch,
  converter: {
    fromView: ([e]) => e.target.checked
  },
  mwRender: ({
    link,
    handleChange,
    value
  }) => ({
    checked: value,
    onChange: handleChange,
    value: link.name
  })
};
exports.FormSwitchPreset = FormSwitchPreset;
const DateTimePickerBasePreset = {
  converter: {
    fromView: ([v]) => (0, _moment.default)(v, 'YYYY/MM/DD a h:mm').format()
  },
  extraProps: {
    variant: 'outlined',
    fullWidth: true,
    format: 'YYYY/MM/DD a h:mm',
    animateYearScrolling: false,
    cancelLabel: '取消',
    clearLabel: '清除',
    okLabel: '確定'
  },
  mwRender: ({
    handleChange,
    value
  }) => ({
    value: value || null,
    onChange: handleChange
  })
};
exports.DateTimePickerBasePreset = DateTimePickerBasePreset;
const DateTimePickerPreset = {
  presets: [DateTimePickerBasePreset],
  component: _pickers.DateTimePicker
};
exports.DateTimePickerPreset = DateTimePickerPreset;
const DatePickerPreset = {
  presets: [DateTimePickerBasePreset],
  component: _pickers.DatePicker,
  converter: {
    fromView: ([v]) => (0, _moment.default)(v, 'YYYY/MM/DD').format()
  },
  extraProps: {
    format: 'YYYY/MM/DD'
  }
};
exports.DatePickerPreset = DatePickerPreset;
const DatePickerWithoutYearPreset = {
  presets: [DatePickerPreset],
  converter: {
    fromView: ([v]) => (0, _moment.default)(v, 'MM/DD').format()
  },
  extraProps: {
    format: 'MM/DD'
  }
};
exports.DatePickerWithoutYearPreset = DatePickerWithoutYearPreset;

const createMenuItemConfig = (name, children) => ({
  ignoredFromOutputs: true,
  component: _MenuItem.default,
  extraProps: {
    value: name
  },
  mwRender: () => ({
    children
  })
});

exports.createMenuItemConfig = createMenuItemConfig;

const FormPasswordVisibilityPreset = cfg => _objectSpread({}, cfg, {
  mwRender: ({
    value,
    handleChange
  }) => ({
    type: value ? 'text' : 'password',
    onShowPassswordClick: handleChange
  }),
  ignoredFromOutputs: true,
  converter: {
    fromView: (_, {
      storedValue
    }) => !storedValue,
    toOutput: () => undefined
  }
});

exports.FormPasswordVisibilityPreset = FormPasswordVisibilityPreset;

const FormCheckboxPreset = cfg => _objectSpread({}, cfg, {
  component: _FormInputs.FormCheckbox,
  mwRender: ({
    value,
    link,
    handleChange
  }) => ({
    id: link.key,
    onChange: handleChange,
    checked: value || false
  }),
  converter: {
    fromView: ([e, v]) => v
  }
});

exports.FormCheckboxPreset = FormCheckboxPreset;
const FormPhoneOrEmailInputPreset = {
  presets: [FormTextFieldPreset],
  component: _FormInputs.FormPhoneOrEmailInput,
  props: {
    enablePhone: true
  },
  converter: {
    toView: value => value && value.rawInput || '',
    fromView: ([value]) => value,
    toOutput: value => value && value.value
  }
};
exports.FormPhoneOrEmailInputPreset = FormPhoneOrEmailInputPreset;
const FormCodeInputPreset = {
  presets: [FormTextFieldPreset],
  component: _FormInputs.FormCodeInput,
  converter: {
    fromView: ([e], {
      storedValue
    }) => !e.target.value || (0, _validators.isAllDigital)(e.target.value) && e.target.value.length <= 6 ? e.target.value : storedValue
  },
  validate: value => assert(value, null)
};
exports.FormCodeInputPreset = FormCodeInputPreset;

const createIgnoredPreset = component => cfg => _objectSpread({}, cfg, {
  component,
  ignoredFromOutputs: true
});

exports.createIgnoredPreset = createIgnoredPreset;

const mwpListItemDisplayer = ctx => {
  const {
    props,
    link: {
      name,
      hostProps
    }
  } = ctx;
  ctx.props = {
    key: props.key,
    children: _react.default.createElement(_ListItemText.default, {
      key: name,
      disableTypography: true,
      primary: _react.default.createElement(_Typography.default, {
        variant: "subtitle1"
      }, props.label || name),
      secondary: _react.default.createElement(_Typography.default, {
        component: _BreakAllContentText.default,
        color: "textSecondary"
      }, hostProps.defaultValues[name])
    })
  };
};

exports.mwpListItemDisplayer = mwpListItemDisplayer;

const translateProp = (propName, i18nKey, i8nValues = {}) => {
  let iV = i8nValues;

  if (typeof iV === 'string') {
    iV = JSON.parse(iV);
  }

  return {
    mwRender: ({
      options: {
        translate
      }
    }) => ({
      [propName]: i18nKey && translate(i18nKey, iV)
    })
  };
};

exports.translateProp = translateProp;

const translateLabel = (i18nKey, i8nValues) => translateProp('label', i18nKey, i8nValues);

exports.translateLabel = translateLabel;

const addOnPressEnterEvent = (onPressEnter = undefined) => ({
  mwRender: ({
    link: {
      host
    }
  }) => {
    const onPressEnterFunction = typeof onPressEnter === 'string' ? host[onPressEnter] : onPressEnter;
    return {
      onPressEnter: onPressEnterFunction && (e => {
        e.preventDefault();
        onPressEnterFunction(e);
      })
    };
  }
});

exports.addOnPressEnterEvent = addOnPressEnterEvent;

const propagateOnChangeEvent = (parentOnChangePropName = 'onChange') => cfg => {
  const originalOnChange = cfg.onChange || (() => {});

  return _objectSpread({}, cfg, {
    onChange: (value, rawArgs, linkInfo) => {
      originalOnChange(value, rawArgs, linkInfo);
      const {
        link: {
          name,
          linker,
          hostProps
        }
      } = linkInfo;

      const onChange = hostProps[parentOnChangePropName] || (() => {});

      onChange(name, value, rawArgs, linker);
    }
  });
};

exports.propagateOnChangeEvent = propagateOnChangeEvent;

const raiseDirtyFlagOnChangeEvent = cfg => {
  const originalOnChange = cfg.onChange || (() => {});

  return _objectSpread({}, cfg, {
    onChange: (value, rawArgs, linkInfo) => {
      originalOnChange(value, rawArgs, linkInfo);
      const {
        link
      } = linkInfo;
      console.log('link :', link);
      link.dirty = true;
    }
  });
};

exports.raiseDirtyFlagOnChangeEvent = raiseDirtyFlagOnChangeEvent;

const createDefaultContainer = getSpace => extraChildElements => ({
  ignoredFromOutputs: true,
  mergeChildren: (_, childrenElements, linkInfo) => childrenElements.reduce((a, c, index) => {
    const array = a.concat([c]);

    const newLinkInfo = _objectSpread({}, linkInfo, {
      index,
      key: `ctn-space-${index}`
    });

    let childElement;

    if (linkInfo.isMergingChildElements) {
      childElement = linkInfo.link.childElements[index];
      newLinkInfo.childElement = childElement;
    }

    if (index < childrenElements.length - 1) {
      if (childElement && 'space' in childElement.options) {
        array.push(childElement.options.space);
      } else {
        array.push(getSpace(newLinkInfo));
      }
    }

    return array;
  }, []),
  extraChildElements,
  cfgMiddlewares: {
    last: cfg => _objectSpread({}, cfg, {}, cfg.component ? {} : {
      component: _react.default.Fragment
    })
  }
});

exports.createDefaultContainer = createDefaultContainer;