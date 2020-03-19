"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactI18next = require("react-i18next");

var _DialogContent = _interopRequireDefault(require("@material-ui/core/DialogContent"));

var _ConfirmDialog = _interopRequireDefault(require("../Dialogs/ConfirmDialog"));

var _FormInputs = require("../FormInputs");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var _default = props => {
  const {
    normalize = v => v,
    label,
    value,
    i18nNs = [],
    onClose = () => undefined,
    onExited,
    RangeInput,
    rangeInpuProps
  } = props,
        rest = _objectWithoutProperties(props, ["normalize", "label", "value", "i18nNs", "onClose", "onExited", "RangeInput", "rangeInpuProps"]);

  const [initLb, initUb] = normalize([props.value && props.value[0] || null, props.value && props.value[1] || null]);
  const [lowerBound, setLowerBound] = (0, _react.useState)(initLb);
  const [upperBound, setUpperBound] = (0, _react.useState)(initUb);
  const {
    t
  } = (0, _reactI18next.useTranslation)(['builtin-components']);

  const setRange = (lb, ub) => {
    const [nln, nub] = normalize([lb, ub]);
    setLowerBound(nln);
    setUpperBound(nub);
  };

  const handleClose = _result => {
    let result = _result;

    if (result === true) {
      result = [lowerBound, upperBound];
    } else {
      result = undefined;
    }

    onClose(result);
  };

  return _react.default.createElement(_ConfirmDialog.default, _extends({}, rest, {
    onClose: handleClose,
    dialogProps: {
      onExited
    },
    buttonTexts: {
      yes: t('confirmOK'),
      no: t('confirmCancel')
    }
  }), _react.default.createElement(_DialogContent.default, null, _react.default.createElement(_FormInputs.FormSpace, {
    variant: "content1"
  }), _react.default.createElement(RangeInput, _extends({
    i18nNs: i18nNs,
    lowerBound: lowerBound,
    upperBound: upperBound,
    onLowerBoundChange: lb => setRange(lb, upperBound),
    onUpperBoundChange: ub => setRange(lowerBound, ub)
  }, rangeInpuProps))));
};

exports.default = _default;