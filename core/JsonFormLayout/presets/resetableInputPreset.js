"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _InputAdornment = _interopRequireDefault(require("@material-ui/core/InputAdornment"));

var _IconButton = _interopRequireDefault(require("@material-ui/core/IconButton"));

var _Clear = _interopRequireDefault(require("@material-ui/icons/Clear"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = cfg => _objectSpread({}, cfg, {
  extraChildLinks: [{
    name: `~calc-${cfg.name}`,
    converter: {
      fromView: ([v]) => v
    },
    mwRender: [({
      link: {
        linker
      },
      value,
      handleChange,
      props
    }) => {
      const p = {
        acOptions: _objectSpread({}, props.acOptions, {
          onAutoCalcChanged: handleChange
        })
      };

      if (!value) {
        const endAdornment = _react.default.createElement(_InputAdornment.default, {
          position: "end"
        }, _react.default.createElement(_IconButton.default, {
          tabIndex: -1,
          onClick: () => {
            linker.changeValue(cfg.name, props.calculatedValue);
          },
          onMouseDown: event => {
            event.preventDefault();
          }
        }, _react.default.createElement(_Clear.default, null)));

        p.InputProps = {
          endAdornment
        };
      }

      return p;
    }]
  }]
});

exports.default = _default;