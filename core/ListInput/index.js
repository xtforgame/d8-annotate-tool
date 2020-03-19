"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.newItemId = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactI18next = require("react-i18next");

var _v = _interopRequireDefault(require("uuid/v4"));

var _List = _interopRequireDefault(require("@material-ui/core/List"));

var _ListItem = _interopRequireDefault(require("@material-ui/core/ListItem"));

var _ListItemText = _interopRequireDefault(require("@material-ui/core/ListItemText"));

var _IconButton = _interopRequireDefault(require("@material-ui/core/IconButton"));

var _ListItemSecondaryAction = _interopRequireDefault(require("@material-ui/core/ListItemSecondaryAction"));

var _AddCircleOutlined = _interopRequireDefault(require("@material-ui/icons/AddCircleOutlined"));

var _RemoveCircleOutlined = _interopRequireDefault(require("@material-ui/icons/RemoveCircleOutlined"));

var _DialogContent = _interopRequireDefault(require("@material-ui/core/DialogContent"));

var _ConfirmDialogV = _interopRequireDefault(require("../Dialogs/ConfirmDialogV2"));

var _useDialogState = _interopRequireWildcard(require("../../hooks/useDialogState"));

var _TextFieldFrame = _interopRequireDefault(require("../TextFieldFrame"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

const Content = (_ref) => {
  let {
    inputRef,
    handleOpen,
    handleDelete,
    display,
    value
  } = _ref,
      props = _objectWithoutProperties(_ref, ["inputRef", "handleOpen", "handleDelete", "display", "value"]);

  return _react.default.createElement("div", _extends({}, props, {
    style: {
      height: 'auto',
      maxHeight: 250,
      overflowY: 'auto'
    }
  }), _react.default.createElement(_List.default, {
    dense: true,
    disablePadding: true
  }, _react.default.createElement(_ListItem.default, {
    divider: true,
    button: true,
    onClick: () => {
      handleOpen();
    }
  }, _react.default.createElement(_ListItemText.default, {
    primary: "\u65B0\u589E",
    secondary: "(\u65B0\u589E\u4E00\u7B46\u8CC7\u6599)"
  }), _react.default.createElement(_ListItemSecondaryAction.default, null, _react.default.createElement(_IconButton.default, {
    "aria-label": "Add",
    onClick: () => {
      handleOpen();
    }
  }, _react.default.createElement(_AddCircleOutlined.default, {
    color: "primary"
  })))), value.map((v, i) => {
    const valueToDisplay = display(v, i, value);
    let elem;

    if (typeof valueToDisplay === 'string') {
      elem = _react.default.createElement(_ListItemText.default, {
        primary: valueToDisplay
      });
    } else if (Array.isArray(valueToDisplay) && valueToDisplay.length === 2) {
      elem = _react.default.createElement(_ListItemText.default, {
        primary: valueToDisplay[0],
        secondary: valueToDisplay[1]
      });
    } else {
      elem = valueToDisplay;
    }

    return _react.default.createElement(_ListItem.default, {
      key: v.id,
      dense: true,
      divider: true,
      button: true,
      onClick: () => {
        handleOpen(v);
      }
    }, elem, _react.default.createElement(_ListItemSecondaryAction.default, null, _react.default.createElement(_IconButton.default, {
      "aria-label": "Remove",
      onClick: () => {
        handleDelete(i);
      }
    }, _react.default.createElement(_RemoveCircleOutlined.default, {
      color: "secondary"
    }))));
  })));
};

const newItemId = Symbol('new-item');
exports.newItemId = newItemId;

var _default = (_ref2) => {
  let {
    value: v,
    onChange = () => {},
    newItem = () => ({}),
    display = item => item.data,
    dialogProps,
    renderInput = () => null
  } = _ref2,
      props = _objectWithoutProperties(_ref2, ["value", "onChange", "newItem", "display", "dialogProps", "renderInput"]);

  const [editingInfo, setEditingInfo] = (0, _react.useState)({});
  const {
    t
  } = (0, _reactI18next.useTranslation)(['builtin-components']);
  const value = v || [];
  const [{
    exited,
    dialogProps: dp2
  }, {
    handleOpen
  }] = (0, _useDialogState.default)({
    dialogProps,
    open: v => {
      const v2 = v ? _objectSpread({}, v) : _objectSpread({
        id: newItemId
      }, newItem());
      setEditingInfo(v2);
    },
    close: v => {
      if (v) {
        if (editingInfo && editingInfo.id === newItemId) {
          editingInfo.id = (0, _v.default)();
          onChange([...value, editingInfo]);
        } else if (editingInfo) {
          const index = value.findIndex(i => i.id === editingInfo.id);

          if (index >= 0) {
            const newValue = [...value];
            newValue[index] = editingInfo;
            onChange(newValue);
          }
        }
      }

      setEditingInfo({});
    }
  });

  const handleDelete = index => {
    const newValue = [...value];
    newValue.splice(index, 1);
    onChange(newValue);
  };

  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_TextFieldFrame.default, _extends({}, props, {
    value: " ",
    Content: Content,
    InputLabelProps: {
      shrink: true
    },
    inputProps: {
      value,
      handleOpen,
      handleDelete,
      display
    }
  })), !exited && _react.default.createElement(_ConfirmDialogV.default, _extends({}, dp2, {
    buttonTexts: {
      yes: t('confirmOK'),
      no: t('confirmCancel')
    }
  }), _react.default.createElement(_DialogContent.default, null, renderInput({
    value: editingInfo.data,
    onChange: data => setEditingInfo(_objectSpread({}, editingInfo, {
      data
    }))
  }))));
};

exports.default = _default;