"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _styles = require("@material-ui/core/styles");

var _Input = _interopRequireDefault(require("@material-ui/core/Input"));

var _Search = _interopRequireDefault(require("@material-ui/icons/Search"));

var _colorManipulator = require("@material-ui/core/styles/colorManipulator");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

const styles = theme => ({
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: (0, _colorManipulator.fade)(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: (0, _colorManipulator.fade)(theme.palette.common.white, 0.25)
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto'
    }
  },
  searchIcon: {
    width: theme.spacing(9),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputRoot: {
    color: 'inherit',
    width: '100%'
  },
  inputInput: {
    paddingTop: theme.spacing(1),
    paddingRight: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    paddingLeft: theme.spacing(10),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200
      }
    }
  }
});

class HeaderSearchInput extends _react.default.PureComponent {
  render() {
    const _this$props = this.props,
          {
      classes
    } = _this$props,
          rest = _objectWithoutProperties(_this$props, ["classes"]);

    return _react.default.createElement("div", {
      className: classes.search
    }, _react.default.createElement("div", {
      className: classes.searchIcon
    }, _react.default.createElement(_Search.default, null)), _react.default.createElement(_Input.default, _extends({
      placeholder: "Search\u2026",
      disableUnderline: true,
      autoFocus: true,
      classes: {
        root: classes.inputRoot,
        input: classes.inputInput
      }
    }, rest)));
  }

}

var _default = (0, _styles.withStyles)(styles)(HeaderSearchInput);

exports.default = _default;