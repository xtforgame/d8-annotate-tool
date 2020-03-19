"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _styles = require("@material-ui/core/styles");

var _IconButton = _interopRequireDefault(require("@material-ui/core/IconButton"));

var _Refresh = _interopRequireDefault(require("@material-ui/icons/Refresh"));

var _Chip = _interopRequireDefault(require("@material-ui/core/Chip"));

var _recompose = require("recompose");

var _SearchInput = _interopRequireDefault(require("./SearchInput"));

var _common = _interopRequireDefault(require("../../styles/common"));

var _TableAppBar = _interopRequireDefault(require("./TableAppBar"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const styles = theme => _objectSpread({}, (0, _common.default)(theme, ['flex', 'appBar']));

class TableSearchBar extends _react.default.PureComponent {
  render() {
    const {
      classes,
      searchingText,
      onRequestSearch = () => {},
      onRequestClearSearchText = () => {},
      onRequestRefresh = () => {}
    } = this.props;
    return _react.default.createElement(_TableAppBar.default, null, _react.default.createElement("div", {
      className: classes.flex1
    }), searchingText && _react.default.createElement(_Chip.default, {
      color: "inherit",
      label: `Search for '${searchingText}'`,
      onDelete: onRequestClearSearchText,
      className: classes.appBarChip
    }), !searchingText && _react.default.createElement(_SearchInput.default, {
      placeholder: "Search",
      onChange: () => {},
      onRequestSearch: onRequestSearch,
      style: {
        margin: '0 auto',
        maxWidth: 800
      }
    }), _react.default.createElement(_IconButton.default, {
      color: "inherit",
      onClick: onRequestRefresh,
      "aria-label": "refresh"
    }, _react.default.createElement(_Refresh.default, null)));
  }

}

var _default = (0, _recompose.compose)((0, _styles.withStyles)(styles))(TableSearchBar);

exports.default = _default;