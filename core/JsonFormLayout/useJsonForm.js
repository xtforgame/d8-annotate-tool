"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _FormInputs = require("../FormInputs");

var _useLayoutFeatures2 = _interopRequireDefault(require("../../hooks/useLayoutFeatures2"));

var _core = require("./core");

var _presets = _interopRequireDefault(require("./presets"));

var _useJsonConfig = _interopRequireDefault(require("./useJsonConfig"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = p => {
  const {
    jsonConfig,
    propsEx
  } = (0, _useJsonConfig.default)(p);

  const props = _objectSpread({}, p, {}, propsEx);

  const {
    Linker = _core.JsonFormLinker,
    linkerOptions = {},
    renderSessionParent: rsp,
    renderSessionName: rsName,
    i18nNs = [],
    onSubmit = () => {}
  } = props;

  const _useLayoutFeatures = (0, _useLayoutFeatures2.default)(_objectSpread({}, props, {}, propsEx, {
    Linker,
    i18nNs: [...i18nNs, 'builtin-components'],
    linkerOptions: _objectSpread({}, linkerOptions, {
      presets: _objectSpread({}, _presets.default, {}, linkerOptions.presets),
      globalValidator: jsonConfig.globalValidator,
      applyChangesSync: true
    }),
    onSubmit: (outputs, linker) => {
      onSubmit(outputs, {
        linker,
        resetIl
      });
    }
  })),
        {
    resetIl
  } = _useLayoutFeatures,
        layoutFeature = _objectWithoutProperties(_useLayoutFeatures, ["resetIl"]);

  const {
    il,
    host
  } = layoutFeature;
  const ref = (0, _react.useRef)();
  const renderSession = new _core.RenderSession(rsp, rsName, il, host, {
    prevRenderSession: ref.current && ref.current.prevRenderSession
  });
  il.updateHost(_objectSpread({}, host, {
    renderSession
  }));
  renderSession.beforeRender();
  (0, _react.useEffect)(() => {
    ref.current = {
      prevRenderSession: renderSession
    };
    renderSession.afterRender();
    delete renderSession.prevRenderSession;
  });

  const renderSpace = fieldLink => {
    if (!('space' in fieldLink.options)) {
      return _react.default.createElement(_FormInputs.FormSpace, {
        variant: "content2"
      });
    }

    if (fieldLink.options.space === 'none') {
      return _react.default.createElement("div", null);
    }

    return _react.default.createElement("div", null);
  };

  return {
    renderSpace,
    renderSession,
    props,
    host,
    il,
    layoutFeature
  };
};

exports.default = _default;