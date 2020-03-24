"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styles = require("@material-ui/core/styles");

var _IconButton = _interopRequireDefault(require("@material-ui/core/IconButton"));

var _Close = _interopRequireDefault(require("@material-ui/icons/Close"));

var _ArrowBack = _interopRequireDefault(require("@material-ui/icons/ArrowBack"));

var _Search = _interopRequireDefault(require("@material-ui/icons/Search"));

var _SearchToolbar = _interopRequireDefault(require("../Toolbars/SearchToolbar"));

var _SimpleFullScreenDialog = _interopRequireDefault(require("./SimpleFullScreenDialog"));

var _IconWithTextToolbar = _interopRequireDefault(require("../Toolbars/IconWithTextToolbar"));

var _common = _interopRequireDefault(require("../../styles/common"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const useStyles = (0, _styles.makeStyles)(theme => _objectSpread({}, (0, _common.default)(theme, ['flex'])));

var _default = props => {
  const {
    selectedValue,
    editingParams = {},
    children,
    picker,
    editor,
    withoutList,
    withoutCreate,
    crudFormOpen,
    onBackToList = () => {},
    texts: {
      edit: editTatget = '編輯對象',
      create: createTatget = '新增對象',
      pick: pickTatget = '選擇對象'
    } = {},
    onSearchTextChange,
    searchText,
    onStartSearch = () => undefined,
    onFinishSearch = () => undefined
  } = props,
        dialogProps = _objectWithoutProperties(props, ["selectedValue", "editingParams", "children", "picker", "editor", "withoutList", "withoutCreate", "crudFormOpen", "onBackToList", "texts", "onSearchTextChange", "searchText", "onStartSearch", "onFinishSearch"]);

  const {
    editingSource
  } = editingParams;
  const classes = useStyles();
  const [isSearching, setIsSearching] = (0, _react.useState)(false);

  const handleClose = () => {
    if (props.onClose) {
      props.onClose(props.selectedValue);
    }
  };

  const handleBackToList = () => {
    if (onBackToList) {
      onBackToList(props.selectedValue);
    }
  };

  const leaveCrudForm = () => {
    if (withoutList) {
      handleClose();
    } else {
      handleBackToList();
    }
  };

  const startSearch = () => {
    onStartSearch();
    setIsSearching(true);
  };

  const finishSearch = () => {
    onFinishSearch();
    setIsSearching(false);
  };

  let toolbar;

  if (crudFormOpen) {
    toolbar = _react.default.createElement(_IconWithTextToolbar.default, {
      headerLeftIcon: withoutList ? _react.default.createElement(_Close.default, null) : _react.default.createElement(_ArrowBack.default, null),
      onLeftButtonClick: leaveCrudForm,
      title: editingSource ? editTatget : createTatget
    });
  } else if (isSearching) {
    toolbar = _react.default.createElement(_SearchToolbar.default, {
      value: searchText,
      onChange: onSearchTextChange,
      onCancel: finishSearch
    });
  } else {
    toolbar = _react.default.createElement(_IconWithTextToolbar.default, {
      headerLeftIcon: _react.default.createElement(_Close.default, null),
      onLeftButtonClick: handleClose,
      title: picker ? pickTatget : editTatget,
      headerContent: _react.default.createElement(_IconButton.default, {
        color: "inherit",
        onClick: startSearch,
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
};

exports.default = _default;