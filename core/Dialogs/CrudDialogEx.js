"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styles = require("@material-ui/core/styles");

var _List = _interopRequireDefault(require("@material-ui/core/List"));

var _reactSwipeableViews = _interopRequireDefault(require("react-swipeable-views"));

var _CrudDialog = _interopRequireDefault(require("./CrudDialog"));

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
    picker,
    editor,
    multiple,
    onClose = () => {},
    withoutList,
    selectedValue,
    editingParams: eP = {},
    List = _List.default,
    listProps,
    list: l,
    applySearchText = () => true,
    renderListItem = () => undefined,
    renderAddItem = () => undefined,
    addItemPlacement = 'end',
    CrudForm,
    crudFormProps,
    onSearchTextChange,
    onStartSearch,
    onFinishSearch,
    onSubmit = () => {}
  } = props,
        other = _objectWithoutProperties(props, ["picker", "editor", "multiple", "onClose", "withoutList", "selectedValue", "editingParams", "List", "listProps", "list", "applySearchText", "renderListItem", "renderAddItem", "addItemPlacement", "CrudForm", "crudFormProps", "onSearchTextChange", "onStartSearch", "onFinishSearch", "onSubmit"]);

  const classes = useStyles();
  const [pickSet, setPickSet] = (0, _react.useState)(new Set());
  const [formKey, setFormKey] = (0, _react.useState)(0);
  const [viewIndex, setViewIndex] = (0, _react.useState)(withoutList ? 1 : 0);
  const [editingSource, setEditingSource] = (0, _react.useState)(null);
  const [editingIndex, setEditingIndex] = (0, _react.useState)(null);
  const [otherEditingParams, setOtherEditingParams] = (0, _react.useState)(null);
  const [searchText, setSearchText] = (0, _react.useState)(null);

  const handleItemClick = (value, index) => {
    if (picker) {
      if (multiple) {
        const newSet = new Set(pickSet);

        if (newSet.has(value)) {
          newSet.delete(value);
        } else {
          newSet.add(value);
        }

        setPickSet(newSet);
      }

      onClose(value);
    } else {
      setFormKey(formKey + 1);
      setViewIndex(1);
      setEditingSource(value);
      setEditingIndex(index);
    }
  };

  const startCreate = _otherEditingParams => {
    setFormKey(formKey + 1);
    setViewIndex(1);
    setEditingSource(null);
    setEditingIndex(null);
    setOtherEditingParams(_otherEditingParams);
  };

  const switchToList = () => {
    setViewIndex(0);
    setEditingSource(null);
    setEditingIndex(null);
  };

  const cancelCreate = () => {
    if (withoutList) {
      onClose();
    } else {
      switchToList();
    }
  };

  const handleSubmit = editingParams => result => {
    if (!picker && !withoutList) {
      switchToList();
    }

    onSubmit(result, editingParams, editingIndex);
  };

  const handleSearchTextChange = cbType => (e, ...args) => {
    const searchText = e ? e.target.value : null;
    setSearchText(searchText);
    const cb = props[cbType];

    if (cb) {
      cb(searchText, e, ...args);
    }
  };

  const editingParams = _objectSpread({}, eP, {}, otherEditingParams);

  if (editingSource) {
    editingParams.editingSource = editingSource;
  }

  let list = [...l];

  if (searchText) {
    list = list.filter(item => applySearchText(searchText, item));
  }

  const addItem = renderAddItem({
    handleItemClick: startCreate
  });
  return _react.default.createElement(_CrudDialog.default, _extends({
    picker: picker,
    editor: editor,
    editingParams: editingParams,
    selectedValue: selectedValue,
    crudFormOpen: !!viewIndex,
    onBackToList: switchToList,
    searchText: searchText || '',
    onSearchTextChange: handleSearchTextChange('onSearchTextChange'),
    onStartSearch: handleSearchTextChange('onStartSearch'),
    onFinishSearch: handleSearchTextChange('onFinishSearch'),
    onClose: onClose,
    withoutList: withoutList
  }, other), _react.default.createElement(_reactSwipeableViews.default, _extends({
    index: viewIndex
  }, {}, {
    style: {
      flex: 1
    },
    containerStyle: {
      height: '100%'
    },
    disabled: true
  }), _react.default.createElement(List, listProps, addItemPlacement === 'start' && addItem, list.map((...args) => renderListItem({
    picked: pickSet.has(args[0]),
    handleItemClick: handleItemClick.bind(null, args[0], args[1])
  }, ...args)), addItemPlacement === 'end' && addItem), _react.default.createElement("div", {
    className: classes.verticalFlexContainerFWFH
  }, _react.default.createElement(CrudForm, _extends({
    key: formKey
  }, crudFormProps, {
    editingParams: editingParams,
    onDone: handleItemClick,
    onCancel: cancelCreate,
    onSubmit: handleSubmit(editingParams)
  })))));
};

exports.default = _default;