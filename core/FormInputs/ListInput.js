"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _v = _interopRequireDefault(require("uuid/v4"));

var _styles = require("@material-ui/core/styles");

var _Divider = _interopRequireDefault(require("@material-ui/core/Divider"));

var _RemoveCircleOutlined = _interopRequireDefault(require("@material-ui/icons/RemoveCircleOutlined"));

var _List = _interopRequireDefault(require("@material-ui/core/List"));

var _ListItem = _interopRequireDefault(require("@material-ui/core/ListItem"));

var _ListItemText = _interopRequireDefault(require("@material-ui/core/ListItemText"));

var _ListItemSecondaryAction = _interopRequireDefault(require("@material-ui/core/ListItemSecondaryAction"));

var _ListSubheader = _interopRequireDefault(require("@material-ui/core/ListSubheader"));

var _AddCircleOutlined = _interopRequireDefault(require("@material-ui/icons/AddCircleOutlined"));

var _IconButton = _interopRequireDefault(require("@material-ui/core/IconButton"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const styles = theme => ({
  inputListItem: {
    paddingRight: theme.spacing.unit + 48
  },
  insetDivider: {
    marginLeft: 16,
    marginRight: 16
  }
});

class ListInput extends _react.default.PureComponent {
  render() {
    const {
      classes,
      subheader,
      newRowTitle,
      renderInput = () => null,
      value: valueArray = [],
      options = {},
      onChange = () => null,
      getId = (value, index) => index,
      newId = index => (0, _v.default)(),
      renderListItemProps = () => ({}),
      newItemProps
    } = this.props;

    const removeItem = index => () => {
      const newValue = [...valueArray];
      const id = getId(newValue[index], index);
      const removed = newValue.splice(index, 1);
      onChange({
        type: 'remove',
        id,
        index,
        value: newValue,
        removed
      });
    };

    const newItem = () => {
      const newValue = [...valueArray];
      const index = newValue.length;
      const id = newId(index);
      onChange({
        type: 'add',
        id,
        index,
        value: newValue
      });
    };

    return _react.default.createElement(_List.default, {
      subheader: _react.default.createElement(_ListSubheader.default, {
        disableSticky: true,
        component: "div"
      }, subheader)
    }, valueArray && valueArray.map((value, index) => {
      const id = getId(value, index);

      const onValueChange = v => {
        const newValue = [...valueArray];
        newValue.splice(index, 1, v);
        onChange({
          type: 'modify',
          index,
          id,
          value: newValue
        });
      };

      return _react.default.createElement(_react.default.Fragment, {
        key: getId(value, index)
      }, _react.default.createElement(_ListItem.default, _extends({
        className: classes.inputListItem
      }, renderListItemProps({
        value,
        id,
        index,
        onChange: onValueChange,
        options
      })), renderInput({
        value,
        id,
        index,
        onChange: onValueChange,
        options
      }), _react.default.createElement(_ListItemSecondaryAction.default, null, _react.default.createElement(_IconButton.default, {
        "aria-label": "Remove",
        onClick: removeItem(index)
      }, _react.default.createElement(_RemoveCircleOutlined.default, {
        color: "secondary"
      })))), _react.default.createElement(_Divider.default, {
        component: "li",
        className: classes.insetDivider
      }));
    }), _react.default.createElement(_ListItem.default, _extends({
      button: true,
      className: classes.inputListItem,
      onClick: newItem
    }, newItemProps), _react.default.createElement(_ListItemText.default, {
      primary: newRowTitle
    }), _react.default.createElement(_ListItemSecondaryAction.default, null, _react.default.createElement(_IconButton.default, {
      "aria-label": "Add",
      onClick: newItem
    }, _react.default.createElement(_AddCircleOutlined.default, {
      color: "primary"
    })))));
  }

}

var _default = (0, _styles.withStyles)(styles)(ListInput);

exports.default = _default;