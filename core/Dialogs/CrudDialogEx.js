"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _recompose = require("recompose");

var _styles = require("@material-ui/core/styles");

var _List = _interopRequireDefault(require("@material-ui/core/List"));

var _reactSwipeableViews = _interopRequireDefault(require("react-swipeable-views"));

var _CrudDialog = _interopRequireDefault(require("./CrudDialog"));

var _common = _interopRequireDefault(require("../../styles/common"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const styles = theme => _objectSpread({}, (0, _common.default)(theme, ['flex']));

class CrudDialogEx extends _react.default.PureComponent {
  constructor(props) {
    super(props);

    _defineProperty(this, "handleItemClick", (value, index) => {
      const {
        picker,
        multiple
      } = this.props;
      const {
        pickSet
      } = this.state;

      if (picker) {
        if (multiple) {
          const newSet = new Set(pickSet);

          if (newSet.has(value)) {
            newSet.delete(value);
          } else {
            newSet.add(value);
          }

          this.setState({
            pickSet: newSet
          });
        } else if (this.props.onClose) {
          this.props.onClose(value);
        }
      } else {
        this.setState({
          formKey: this.state.formKey + 1,
          viewIndex: 1,
          editingSource: value,
          editingIndex: index
        });
      }
    });

    _defineProperty(this, "startCreate", otherEditingParams => this.setState({
      viewIndex: 1,
      editingSource: null,
      editingIndex: null,
      formKey: this.state.formKey + 1,
      otherEditingParams
    }));

    _defineProperty(this, "switchToList", () => this.setState({
      viewIndex: 0,
      editingSource: null,
      editingIndex: null
    }));

    _defineProperty(this, "cancelCreate", () => {
      if (this.props.withoutList) {
        if (this.props.onClose) {
          this.props.onClose();
        }
      } else {
        this.switchToList();
      }
    });

    _defineProperty(this, "handleSubmit", editingParams => result => {
      const {
        picker,
        withoutList,
        onSubmit = () => {}
      } = this.props;
      const {
        editingIndex
      } = this.state;

      if (!picker && !withoutList) {
        this.switchToList();
      }

      onSubmit(result, editingParams, editingIndex);
    });

    _defineProperty(this, "handleSearchTextChange", cbType => (e, ...args) => {
      const searchText = e ? e.target.value : null;
      this.setState({
        searchText
      });
      const cb = this.props[cbType];

      if (cb) {
        cb(searchText, e, ...args);
      }
    });

    this.state = {
      pickSet: new Set(),
      formKey: 0,
      viewIndex: props.withoutList ? 1 : 0,
      editingSource: null,
      editingIndex: null
    };
  }

  render() {
    const _this$props = this.props,
          {
      classes,
      selectedValue,
      editingParams: eP = {},
      picker,
      editor,
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
      onFinishSearch
    } = _this$props,
          other = _objectWithoutProperties(_this$props, ["classes", "selectedValue", "editingParams", "picker", "editor", "List", "listProps", "list", "applySearchText", "renderListItem", "renderAddItem", "addItemPlacement", "CrudForm", "crudFormProps", "onSearchTextChange", "onStartSearch", "onFinishSearch"]);

    const {
      pickSet,
      formKey,
      editingSource,
      otherEditingParams,
      searchText
    } = this.state;

    const editingParams = _objectSpread({}, eP, {}, otherEditingParams);

    if (editingSource) {
      editingParams.editingSource = editingSource;
    }

    let list = [...l];

    if (searchText) {
      list = list.filter(item => applySearchText(searchText, item));
    }

    const addItem = renderAddItem({
      handleItemClick: this.startCreate
    });
    return _react.default.createElement(_CrudDialog.default, _extends({
      picker: picker,
      editor: editor,
      editingParams: editingParams,
      selectedValue: selectedValue,
      crudFormOpen: !!this.state.viewIndex,
      onBackToList: this.switchToList,
      searchText: searchText || '',
      onSearchTextChange: this.handleSearchTextChange('onSearchTextChange'),
      onStartSearch: this.handleSearchTextChange('onStartSearch'),
      onFinishSearch: this.handleSearchTextChange('onFinishSearch')
    }, other), _react.default.createElement(_reactSwipeableViews.default, _extends({
      index: this.state.viewIndex
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
      handleItemClick: this.handleItemClick.bind(null, args[0], args[1])
    }, ...args)), addItemPlacement === 'end' && addItem), _react.default.createElement("div", {
      className: classes.verticalFlexContainerFWFH
    }, _react.default.createElement(CrudForm, _extends({
      key: formKey
    }, crudFormProps, {
      editingParams: editingParams,
      onDone: this.handleItemClick,
      onCancel: this.cancelCreate,
      onSubmit: this.handleSubmit(editingParams)
    })))));
  }

}

var _default = (0, _recompose.compose)((0, _styles.withStyles)(styles))(CrudDialogEx);

exports.default = _default;