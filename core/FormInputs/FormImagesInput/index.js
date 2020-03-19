"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  uploadContext: true
};
Object.defineProperty(exports, "uploadContext", {
  enumerable: true,
  get: function () {
    return _uploadContext.default;
  }
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _TextField = _interopRequireDefault(require("@material-ui/core/TextField"));

var _FormImagesInputContent = _interopRequireDefault(require("./FormImagesInputContent"));

var _uploadContext = _interopRequireWildcard(require("./uploadContext"));

Object.keys(_uploadContext).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _uploadContext[key];
    }
  });
});

var _arrayHelpers = require("./array-helpers");

Object.keys(_arrayHelpers).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _arrayHelpers[key];
    }
  });
});

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var _default = (_ref) => {
  let {
    id,
    value,
    onChange,
    imagesInputProps,
    handleUpload,
    onAdd,
    onEdit,
    getContent,
    lightboxZIndex
  } = _ref,
      props = _objectWithoutProperties(_ref, ["id", "value", "onChange", "imagesInputProps", "handleUpload", "onAdd", "onEdit", "getContent", "lightboxZIndex"]);

  return _react.default.createElement(_TextField.default, _extends({
    id: id,
    variant: "outlined"
  }, props, {
    value: " ",
    InputLabelProps: {
      shrink: true
    },
    InputProps: {
      inputComponent: _FormImagesInputContent.default,
      inputProps: {
        imagesInputProps: _objectSpread({}, imagesInputProps, {
          handleUpload,
          onAdd,
          onEdit,
          getContent,
          lightboxZIndex,
          id: id ? `${id}-input` : 'input',
          value: value || [],
          thumbSize: 96,
          onChange: iis => {
            if (onChange) {
              onChange(iis);
            }
          }
        })
      }
    },
    onChange: e => {
      if (e.stopPropagation && e.preventDefault) {
        e.stopPropagation();
        e.preventDefault();
      } else {
        const {
          onChange
        } = props;

        if (onChange) {
          onChange(e);
        }
      }
    },
    onClick: e => {
      const {
        onClick
      } = props;

      if (onClick) {
        onClick(e);
      }
    }
  }));
};

exports.default = _default;