"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _styles = require("@material-ui/core/styles");

var _AppBar = _interopRequireDefault(require("@material-ui/core/AppBar"));

var _Toolbar = _interopRequireDefault(require("@material-ui/core/Toolbar"));

var _IconButton = _interopRequireDefault(require("@material-ui/core/IconButton"));

var _Search = _interopRequireDefault(require("@material-ui/icons/Search"));

var _DialogWithChips = _interopRequireDefault(require("./DialogWithChips"));

var _recompose = require("recompose");

var _common = _interopRequireDefault(require("../../styles/common"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const styles = theme => _objectSpread({
  root: {
    width: '100%'
  },
  appBarPaper: {
    boxShadow: theme.shadows[2].split('),').splice(1, 2).join('),')
  }
}, (0, _common.default)(theme, ['flex', 'appBar']));

class FilterBar extends _react.default.PureComponent {
  constructor(props) {
    super(props);

    _defineProperty(this, "handleOpen", () => {
      this.setState({
        dialogOpend: true
      });
    });

    _defineProperty(this, "handleClose", value => {
      const newState = {
        dialogOpend: false
      };

      if (value) {
        newState.value = value;
      }

      this.setState(newState);

      if (value) {
        const {
          onFiltersChange = () => undefined
        } = this.props;
        onFiltersChange(value);
      }
    });

    _defineProperty(this, "handleDeleteChip", (name, v, values) => {
      const value = _objectSpread({}, this.state.value);

      delete value[name];
      this.setState({
        value
      });
      const {
        onFiltersChange = () => undefined
      } = this.props;
      onFiltersChange(value);
    });

    if (props.value !== undefined) {
      this.controlled = true;
    }

    this.state = {
      dialogOpend: false
    };
  }

  render() {
    const _this$props = this.props,
          {
      classes,
      position = 'fixed',
      fields,
      onFiltersChange,
      value: valueFromPorps
    } = _this$props,
          props = _objectWithoutProperties(_this$props, ["classes", "position", "fields", "onFiltersChange", "value"]);

    const {
      dialogOpend,
      value: valueFromState
    } = this.state;
    let value = this.controlled ? valueFromPorps : valueFromState;
    value = value || {};
    return _react.default.createElement("div", {
      className: classes.root
    }, _react.default.createElement(_AppBar.default, {
      color: "default",
      position: position,
      className: classes.appBarPaper
    }, _react.default.createElement(_Toolbar.default, null, _react.default.createElement(_DialogWithChips.default, _extends({
      title: "\u641C\u5C0B",
      open: dialogOpend,
      onDeleteChip: this.handleDeleteChip,
      onClose: this.handleClose,
      dialogProps: {
        buttonTexts: {
          confirm: '搜尋',
          cancel: '取消'
        }
      },
      renderChip: ({
        key,
        value
      }) => !!value && {
        label: `搜尋:${value}`
      },
      value: value,
      fields: fields || []
    }, props)), _react.default.createElement("div", {
      className: classes.flex1
    }), _react.default.createElement(_IconButton.default, {
      color: "inherit",
      onClick: this.handleOpen,
      "aria-label": "Menu"
    }, _react.default.createElement(_Search.default, null)))));
  }

}

var _default = (0, _recompose.compose)((0, _styles.withStyles)(styles))(FilterBar);

exports.default = _default;