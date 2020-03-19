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

var _react = _interopRequireDefault(require("react"));

var _recompose = require("recompose");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styles = require("@material-ui/core/styles");

var _InputAdornment = _interopRequireDefault(require("@material-ui/core/InputAdornment"));

var _IconButton = _interopRequireDefault(require("@material-ui/core/IconButton"));

var _Email = _interopRequireDefault(require("@material-ui/icons/Email"));

var _googleLibphonenumber = require("google-libphonenumber");

var _validators = require("../../../common/utils/validators");

var _FormTextField = _interopRequireDefault(require("../FormTextField"));

var _PhoneRegionSelect = _interopRequireDefault(require("./PhoneRegionSelect"));

var _langToCountry = require("./langToCountry");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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

class FormPhoneOrEmailInput extends _react.default.PureComponent {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", {});

    _defineProperty(this, "onChange", e => {
      const state = FormPhoneOrEmailInput.rawInputToState(e.target.value || '', this.state.enablePhone, this.state.enableEmail);

      if (this.props.onChange) {
        this.props.onChange(state);
      }

      this.setState(state);
    });
  }

  static rawInputToState(rawInput, enablePhone = true, enableEmail = true) {
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
  }

  static getDerivedStateFromProps(props, prevState) {
    let newState = null;
    let enablePhone = prevState.enablePhone !== undefined ? prevState.enablePhone : true;
    let enableEmail = prevState.enableEmail !== undefined ? prevState.enableEmail : true;

    if (props.enablePhone !== undefined && props.enablePhone !== prevState.enablePhone) {
      newState = newState || {};
      newState.enablePhone = props.enablePhone;
      ({
        enablePhone
      } = newState.enablePhone);
    }

    if (props.enableEmail !== undefined && props.enableEmail !== prevState.enableEmail) {
      newState = newState || {};
      newState.enableEmail = props.enableEmail;
      ({
        enableEmail
      } = newState.enableEmail);
    }

    if (props.value) {
      newState = _objectSpread({}, newState || {}, {}, FormPhoneOrEmailInput.rawInputToState(props.value, enablePhone, enableEmail));
    }

    return newState;
  }

  render() {
    const _this$props = this.props,
          {
      id,
      classes,
      enablePhone,
      enableEmail
    } = _this$props,
          rest = _objectWithoutProperties(_this$props, ["id", "classes", "enablePhone", "enableEmail"]);

    const {
      regionCode
    } = this.state;

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
    }, _react.default.createElement(_Email.default, null)));

    return _react.default.createElement(_FormTextField.default, _extends({
      id: id,
      InputProps: {
        startAdornment
      }
    }, rest, {
      onChange: this.onChange
    }));
  }

}

FormPhoneOrEmailInput.propTypes = {
  id: _propTypes.default.string.isRequired
};

var _default = (0, _recompose.compose)((0, _styles.withStyles)(styles))(FormPhoneOrEmailInput);

exports.default = _default;