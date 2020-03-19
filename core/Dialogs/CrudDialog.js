"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _recompose = require("recompose");

var _styles = require("@material-ui/core/styles");

var _IconButton = _interopRequireDefault(require("@material-ui/core/IconButton"));

var _Close = _interopRequireDefault(require("@material-ui/icons/Close"));

var _ArrowBack = _interopRequireDefault(require("@material-ui/icons/ArrowBack"));

var _SearchToolbar = _interopRequireDefault(require("../Toolbars/SearchToolbar"));

var _Search = _interopRequireDefault(require("@material-ui/icons/Search"));

var _SimpleFullScreenDialog = _interopRequireDefault(require("./SimpleFullScreenDialog"));

var _IconWithTextToolbar = _interopRequireDefault(require("../Toolbars/IconWithTextToolbar"));

var _common = _interopRequireDefault(require("../../styles/common"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const styles = theme => _objectSpread({}, (0, _common.default)(theme, ['flex']));

class CrudDialog extends _react.default.PureComponent {
  constructor(props) {
    super(props);

    _defineProperty(this, "handleClose", () => {
      if (this.props.onClose) {
        this.props.onClose(this.props.selectedValue);
      }
    });

    _defineProperty(this, "handleBackToList", () => {
      if (this.props.onBackToList) {
        this.props.onBackToList(this.props.selectedValue);
      }
    });

    _defineProperty(this, "leaveCrudForm", () => {
      if (this.props.withoutList) {
        this.handleClose();
      } else {
        this.handleBackToList();
      }
    });

    _defineProperty(this, "startSearch", () => {
      const {
        onStartSearch = () => undefined
      } = this.props;
      onStartSearch();
      this.setState({
        isSearching: true
      });
    });

    _defineProperty(this, "finishSearch", () => {
      const {
        onFinishSearch = () => undefined
      } = this.props;
      onFinishSearch();
      this.setState({
        isSearching: false
      });
    });

    this.state = {
      isSearching: false
    };
  }

  render() {
    const _this$props = this.props,
          {
      classes,
      selectedValue,
      editingParams = {},
      children,
      picker,
      editor,
      withoutList,
      withoutCreate,
      crudFormOpen,
      onBackToList,
      texts: {
        edit: editTatget = '編輯對象',
        create: createTatget = '新增對象',
        pick: pickTatget = '選擇對象'
      } = {},
      onSearchTextChange,
      searchText,
      onStartSearch,
      onFinishSearch
    } = _this$props,
          dialogProps = _objectWithoutProperties(_this$props, ["classes", "selectedValue", "editingParams", "children", "picker", "editor", "withoutList", "withoutCreate", "crudFormOpen", "onBackToList", "texts", "onSearchTextChange", "searchText", "onStartSearch", "onFinishSearch"]);

    const {
      editingSource
    } = editingParams;
    const {
      isSearching
    } = this.state;
    let toolbar;

    if (crudFormOpen) {
      toolbar = _react.default.createElement(_IconWithTextToolbar.default, {
        headerLeftIcon: withoutList ? _react.default.createElement(_Close.default, null) : _react.default.createElement(_ArrowBack.default, null),
        onLeftButtonClick: this.leaveCrudForm,
        title: editingSource ? editTatget : createTatget
      });
    } else if (isSearching) {
      toolbar = _react.default.createElement(_SearchToolbar.default, {
        value: searchText,
        onChange: onSearchTextChange,
        onCancel: this.finishSearch
      });
    } else {
      toolbar = _react.default.createElement(_IconWithTextToolbar.default, {
        headerLeftIcon: _react.default.createElement(_Close.default, null),
        onLeftButtonClick: this.handleClose,
        title: picker ? pickTatget : editTatget,
        headerContent: _react.default.createElement(_IconButton.default, {
          color: "inherit",
          onClick: this.startSearch,
          "aria-label": "Search"
        }, _react.default.createElement(_Search.default, null))
      });
    }

    return _react.default.createElement(_SimpleFullScreenDialog.default, _extends({
      "aria-labelledby": "simple-dialog-title",
      PaperProps: {
        className: classes.verticalFlexContainerFWFH,
        style: {
          overflowY: 'hidden'
        }
      },
      toolbar: toolbar
    }, dialogProps), children);
  }

}

var _default = (0, _recompose.compose)((0, _styles.withStyles)(styles))(CrudDialog);

exports.default = _default;