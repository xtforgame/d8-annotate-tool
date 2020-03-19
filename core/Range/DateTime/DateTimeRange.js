"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactI18next = require("react-i18next");

var _FormInputs = require("../../FormInputs");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = props => {
  const {
    lowerBound,
    upperBound,
    onLowerBoundChange,
    onUpperBoundChange
  } = props;
  const {
    t
  } = (0, _reactI18next.useTranslation)(['builtin-components']);
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_FormInputs.FormDateTimePicker, {
    label: t('dateTimeStart'),
    minutesStep: 60,
    value: lowerBound,
    onChange: onLowerBoundChange
  }), _react.default.createElement(_FormInputs.FormSpace, {
    variant: "content2"
  }), _react.default.createElement(_FormInputs.FormDateTimePicker, {
    label: t('dateTimeEnd'),
    minutesStep: 60,
    value: upperBound,
    onChange: onUpperBoundChange
  }));
};

exports.default = _default;