"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _keycode = _interopRequireDefault(require("keycode"));

var _colorManipulator = require("@material-ui/core/styles/colorManipulator");

var _styles = require("@material-ui/core/styles");

var _IconButton = _interopRequireDefault(require("@material-ui/core/IconButton"));

var _Input = _interopRequireDefault(require("@material-ui/core/Input"));

var _Clear = _interopRequireDefault(require("@material-ui/icons/Clear"));

var _Search = _interopRequireDefault(require("@material-ui/icons/Search"));

var _useEffectIgnoreFirstRun = _interopRequireDefault(require("../../../hooks/useEffectIgnoreFirstRun"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

const useStyles = (0, _styles.makeStyles)(theme => ({
  root: {
    fontFamily: theme.typography.fontFamily,
    position: 'relative',
    height: 48,
    display: 'flex',
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(1),
    borderRadius: 2,
    background: (0, _colorManipulator.fade)(theme.palette.common.white, 0.15)
  },
  searchContainer: {
    margin: 'auto 16px',
    flex: 1
  },
  input: {
    width: '100%',
    color: 'inherit'
  },
  iconButton: {
    position: 'absolute',
    transition: 'transform 200ms cubic-bezier(0.4, 0.0, 0.2, 1), opacity 200ms cubic-bezier(0.4, 0.0, 0.2, 1)',
    '&:disabled': {
      opacity: 0.38
    }
  }
}));

var _default = props => {
  const {
    disabled,
    onRequestSearch,
    onChange = () => {}
  } = props,
        inputProps = _objectWithoutProperties(props, ["disabled", "onRequestSearch", "onChange"]);

  const classes = useStyles();
  const [value, setValue] = (0, _react.useState)(props.value);
  (0, _useEffectIgnoreFirstRun.default)(() => {
    setValue(value);
  }, [props.value]);

  const handleInput = e => {
    setValue(e.target.value);
    onChange(e.target.value);
  };

  const handleCancel = () => {
    setValue('');
    onChange('');
  };

  const handleKeyDown = event => {
    if ((0, _keycode.default)(event) === 'enter') {
      onRequestSearch(value);
    }
  };

  const nonEmpty = value && value.length > 0;
  const styles = {
    iconButtonClose: {
      transform: nonEmpty ? 'scale(1, 1)' : 'scale(0, 0)'
    },
    iconButtonSearch: {
      transform: nonEmpty ? 'scale(0, 0)' : 'scale(1, 1)'
    }
  };
  return _react.default.createElement("div", {
    className: classes.root
  }, _react.default.createElement("div", {
    className: classes.searchContainer
  }, _react.default.createElement(_Input.default, _extends({}, inputProps, {
    className: classes.input,
    value: value || '',
    onChange: handleInput,
    onKeyDown: handleKeyDown,
    fullWidth: true,
    disableUnderline: true,
    disabled: disabled
  }))), _react.default.createElement("div", {
    style: {
      position: 'relative',
      width: 48
    }
  }, _react.default.createElement(_IconButton.default, {
    color: "inherit",
    className: classes.iconButton,
    style: styles.iconButtonSearch,
    disabled: disabled
  }, _react.default.createElement(_Search.default, null)), _react.default.createElement(_IconButton.default, {
    color: "inherit",
    onClick: handleCancel,
    className: classes.iconButton,
    style: styles.iconButtonClose,
    disabled: disabled
  }, _react.default.createElement(_Clear.default, null))));
};

exports.default = _default;