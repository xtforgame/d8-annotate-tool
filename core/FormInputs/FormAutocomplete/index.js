"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _keycode = _interopRequireDefault(require("keycode"));

var _downshift = _interopRequireDefault(require("downshift"));

var _styles = require("@material-ui/core/styles");

var _Paper = _interopRequireDefault(require("@material-ui/core/Paper"));

var _MenuItem = _interopRequireDefault(require("@material-ui/core/MenuItem"));

var _FormTextField = _interopRequireDefault(require("../FormTextField"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

const WrappedInput = props => {
  const {
    label,
    InputProps = {},
    classes,
    multiline,
    onKeyDown
  } = props,
        other = _objectWithoutProperties(props, ["label", "InputProps", "classes", "multiline", "onKeyDown"]);

  const {
    onKeyDown: downshiftOnKeyDown
  } = InputProps,
        otherInputProps = _objectWithoutProperties(InputProps, ["onKeyDown"]);

  const handleMultilinesKeyDown = event => {
    if (!multiline || (0, _keycode.default)(event) !== 'enter' && (0, _keycode.default)(event) !== 'up' && (0, _keycode.default)(event) !== 'down') {
      downshiftOnKeyDown(event);
    }

    if (onKeyDown) {
      onKeyDown(event);
    }
  };

  return _react.default.createElement(_FormTextField.default, _extends({
    id: InputProps.id,
    label: label,
    className: classes.inputRoot,
    multiline: multiline,
    onKeyDown: handleMultilinesKeyDown
  }, otherInputProps, other));
};

function SuggestionItem({
  suggestion,
  index,
  itemProps,
  highlightedIndex,
  selectedItem
}) {
  const isHighlighted = highlightedIndex === index;
  const isSelected = (selectedItem || '').indexOf(suggestion.label) > -1;
  return _react.default.createElement(_MenuItem.default, _extends({}, itemProps, {
    selected: isHighlighted,
    component: "div",
    style: {
      fontWeight: isSelected ? 500 : 400
    }
  }), suggestion.label);
}

SuggestionItem.propTypes = {
  highlightedIndex: _propTypes.default.number,
  index: _propTypes.default.number,
  itemProps: _propTypes.default.object,
  selectedItem: _propTypes.default.string,
  suggestion: _propTypes.default.shape({
    label: _propTypes.default.string
  }).isRequired
};

function getSuggestions(suggestions, inputValue) {
  return suggestions.filter(suggestion => {
    const keep = !inputValue || suggestion.label.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1;

    if (keep) {}

    return keep;
  });
}

const styles = theme => ({
  container: {
    flexGrow: 1,
    position: 'relative'
  },
  paper: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing(1),
    left: 0,
    right: 0,
    maxHeight: 320,
    overflowY: 'scroll'
  },
  inputRoot: {
    flexWrap: 'wrap'
  }
});

class FormAutocomplete extends _react.default.PureComponent {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", {
      inputValue: ''
    });
  }

  render() {
    const _this$props = this.props,
          {
      classes,
      id,
      label,
      suggestions,
      value,
      onChange
    } = _this$props,
          rest = _objectWithoutProperties(_this$props, ["classes", "id", "label", "suggestions", "value", "onChange"]);

    return _react.default.createElement(_downshift.default, {
      onStateChange: ({
        inputValue
      }) => {
        if (inputValue != null) {
          if (onChange) {
            onChange(inputValue);
          }

          if (inputValue) {
            this.setState({
              inputValue
            });
          }
        }
      },
      selectedItem: value == null ? this.state.inputValue : value
    }, ({
      getInputProps,
      getItemProps,
      isOpen,
      inputValue,
      selectedItem,
      highlightedIndex
    }) => _react.default.createElement("div", {
      className: classes.container
    }, _react.default.createElement(WrappedInput, _extends({
      label: label,
      classes: classes,
      InputProps: getInputProps({
        id
      })
    }, rest)), isOpen ? _react.default.createElement(_Paper.default, {
      className: classes.paper,
      square: true
    }, getSuggestions(suggestions, inputValue).map((suggestion, index) => _react.default.createElement(SuggestionItem, {
      key: suggestion.label,
      suggestion: suggestion,
      index: index,
      itemProps: getItemProps({
        item: suggestion.label
      }),
      highlightedIndex: highlightedIndex,
      selectedItem: selectedItem
    }))) : null));
  }

}

FormAutocomplete.propTypes = {
  id: _propTypes.default.string.isRequired,
  suggestions: _propTypes.default.array.isRequired,
  classes: _propTypes.default.object.isRequired
};

var _default = (0, _styles.withStyles)(styles)(FormAutocomplete);

exports.default = _default;