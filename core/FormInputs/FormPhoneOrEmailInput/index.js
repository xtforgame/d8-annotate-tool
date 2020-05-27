"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "isValidEmail", {
  enumerable: true,
  get: function () {
    return _validators.isValidEmail;
  }
});
exports.default = exports.isValidPhoneNumber = void 0;

var _react = _interopRequireWildcard(require("react"));

var _recompose = require("recompose");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styles = require("@material-ui/core/styles");

var _InputAdornment = _interopRequireDefault(require("@material-ui/core/InputAdornment"));

var _IconButton = _interopRequireDefault(require("@material-ui/core/IconButton"));

var _Email = _interopRequireDefault(require("@material-ui/icons/Email"));

var _Phone = _interopRequireDefault(require("@material-ui/icons/Phone"));

var _googleLibphonenumber = require("google-libphonenumber");

var _validators = require("../../../common/utils/validators");

var _FormTextField = _interopRequireDefault(require("../FormTextField"));

var _PhoneRegionSelect = _interopRequireDefault(require("./PhoneRegionSelect"));

var _langToCountry = require("./langToCountry");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

const country = (0, _langToCountry.getCountryCodeFromBrowser)();

const phoneUtil = _googleLibphonenumber.PhoneNumberUtil.getInstance();

const isValidPhoneNumber = value => {
  try {
    const number = phoneUtil.parseAndKeepRawInput(value, country);
    return phoneUtil.isValidNumber(number);
  } catch (error) {}

  return false;
};

exports.isValidPhoneNumber = isValidPhoneNumber;

const styles = theme => ({
  adornment: {
    marginRight: 0
  }
});

const rawInputToState = (rawInput, enablePhone = true, enableEmail = true) => {
  let regionCode = null;
  let value = rawInput;
  let number = null;
  let type;

  if (enablePhone) {
    try {
      number = phoneUtil.parseAndKeepRawInput(rawInput, country);

      if (phoneUtil.isValidNumber(number)) {
        type = 'phone-number';
      }

      regionCode = phoneUtil.getRegionCodeForNumber(number);
      value = phoneUtil.format(number, _googleLibphonenumber.PhoneNumberFormat.E164);
    } catch (error) {}
  }

  if (enableEmail && (0, _validators.isValidEmail)(rawInput)) {
    type = 'email-address';
  }

  return {
    rawInput,
    value,
    regionCode,
    type
  };
};

const FormPhoneOrEmailInput = props => {
  const {
    id,
    classes,
    enablePhone: eP,
    enableEmail: eE,
    onChange = () => {}
  } = props,
        rest = _objectWithoutProperties(props, ["id", "classes", "enablePhone", "enableEmail", "onChange"]);

  const [enablePhone] = (0, _react.useState)(eP == null ? true : eP);
  const [enableEmail] = (0, _react.useState)(eE == null ? true : eE);
  const [state, setState] = (0, _react.useState)(_objectSpread({}, rawInputToState(props.value, enablePhone, enableEmail)));

  const handleChange = e => {
    const s = rawInputToState(e.target.value || '', enablePhone, enableEmail);
    onChange(s);
    setState(s);
  };

  const {
    regionCode,
    type
  } = state;

  const startAdornment = _react.default.createElement(_InputAdornment.default, {
    position: "start",
    className: classes.adornment
  }, regionCode != null ? _react.default.createElement(_PhoneRegionSelect.default, {
    regionCode: regionCode
  }) : _react.default.createElement(_IconButton.default, {
    tabIndex: "-1",
    onMouseDown: event => {
      event.preventDefault();
    }
  }, enableEmail ? _react.default.createElement(_Email.default, {
    color: type ? 'primary' : ''
  }) : _react.default.createElement(_Phone.default, null)));

  return _react.default.createElement(_FormTextField.default, _extends({
    id: id,
    InputProps: {
      startAdornment
    }
  }, rest, {
    onChange: handleChange
  }));
};

FormPhoneOrEmailInput.propTypes = {
  id: _propTypes.default.string.isRequired
};

var _default = (0, _recompose.compose)((0, _styles.withStyles)(styles))(FormPhoneOrEmailInput);

exports.default = _default;