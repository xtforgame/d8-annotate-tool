"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _recompose = require("recompose");

var _InputFormDialog = _interopRequireDefault(require("../Dialogs/InputFormDialog"));

var _styles = require("@material-ui/core/styles");

var _Chip = _interopRequireDefault(require("./Chip"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const styles = theme => ({
  chip: {
    margin: 2
  },
  chipContainer: {
    display: 'flex',
    flexWrap: 'wrap'
  }
});

class DialogWithChips extends _react.default.PureComponent {
  constructor(props) {
    super(props);

    _defineProperty(this, "handleClose", data => {
      if (data) {
        this.setState({
          data
        });
      }

      const {
        onClose
      } = this.props;

      if (onClose) {
        onClose(data);
      }
    });

    _defineProperty(this, "handleDeleteChip", (k, v) => () => {
      const {
        onDeleteChip,
        value
      } = this.props;
      const {
        controlled,
        data
      } = this.state;
      const chipDataSource = (controlled ? value : data) || {};

      if (!controlled) {
        const newData = _objectSpread({}, chipDataSource);

        delete newData[k];
        this.setState({
          data: newData
        });
      }

      if (onDeleteChip) {
        onDeleteChip(k, v, chipDataSource);
      }
    });

    _defineProperty(this, "defaultRenderChip", classes => ({
      key,
      value,
      keyArray,
      index,
      map,
      handleDeleteChip
    }) => _react.default.createElement(_Chip.default, {
      key: key,
      label: `${key}:${value}`,
      onDelete: handleDeleteChip,
      className: classes.chip
    }));

    this.state = {
      controlled: !!props.value,
      data: {}
    };
  }

  render() {
    const _this$props = this.props,
          {
      classes,
      open,
      fields,
      value,
      defaultValue,
      renderChip
    } = _this$props,
          rest = _objectWithoutProperties(_this$props, ["classes", "open", "fields", "value", "defaultValue", "renderChip"]);

    const {
      controlled,
      data
    } = this.state;
    const chipDataSource = (controlled ? value : data) || {};
    const defaultValuesSource = (controlled ? value : defaultValue) || {};
    const renderChipFunction = renderChip || this.defaultRenderChip(classes);
    return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement("div", {
      className: classes.chipContainer
    }, Object.keys(chipDataSource).map((key, index, keyArray) => {
      const handleDeleteChip = this.handleDeleteChip(key, value);
      const result = renderChipFunction({
        key,
        value: chipDataSource[key],
        index,
        keyArray,
        map: chipDataSource,
        handleDeleteChip
      });

      if (!result) {
        return null;
      }

      if (typeof result === 'string') {
        return _react.default.createElement(_Chip.default, {
          key: key,
          label: result,
          onDelete: handleDeleteChip,
          className: classes.chip
        });
      }

      if (_react.default.isValidElement(result)) {
        return result;
      }

      if (result.label) {
        return _react.default.createElement(_Chip.default, _extends({}, result.props, {
          key: key,
          label: result.label,
          onDelete: handleDeleteChip,
          className: classes.chip
        }));
      }

      return null;
    })), open && _react.default.createElement(_InputFormDialog.default, _extends({
      open: open,
      onClose: this.handleClose,
      fields: fields,
      defaultValues: defaultValuesSource
    }, rest)));
  }

}

var _default = (0, _recompose.compose)((0, _styles.withStyles)(styles))(DialogWithChips);

exports.default = _default;