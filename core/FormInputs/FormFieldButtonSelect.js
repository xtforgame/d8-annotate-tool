"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styles = require("@material-ui/core/styles");

var _Menu = _interopRequireDefault(require("@material-ui/core/Menu"));

var _ = require("./");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

const useStyles = (0, _styles.makeStyles)(theme => ({}));

var _default = props => {
  const {
    id,
    options = [],
    getMenuItem = () => null,
    value,
    onChange = () => {},
    toInputValue = (value, i) => '',
    toButtonValue: tbv,
    Menu = _Menu.default
  } = props,
        p = _objectWithoutProperties(props, ["id", "options", "getMenuItem", "value", "onChange", "toInputValue", "toButtonValue", "Menu"]);

  const toButtonValue = tbv || toInputValue;
  const classes = useStyles();
  const [open, setOpen] = (0, _react.useState)(false);
  const [anchorEl, setAnchorEl] = (0, _react.useState)(null);

  const handleOptionClick = (event, option, index) => {
    onChange(event, option, index);
    setOpen(false);
  };

  const handleClick = event => {
    setOpen(true);
    setAnchorEl(event.currentTarget);
  };

  const handleRequestClose = () => {
    setOpen(false);
  };

  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_.FormFieldButton, _extends({}, p, {
    onClick: handleClick,
    value: toInputValue(value)
  }), toButtonValue(value)), _react.default.createElement(Menu, {
    id: id,
    anchorEl: anchorEl,
    open: open,
    onClose: handleRequestClose
  }, options.map((option, index) => getMenuItem({
    option,
    index,
    selectedOption: option,
    isSelected: option === value,
    handleOptionClick: event => handleOptionClick(event, option, index)
  }))));
};

exports.default = _default;