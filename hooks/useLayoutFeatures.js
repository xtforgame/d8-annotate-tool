"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.defaultIlOnInit = void 0;

var _react = require("react");

var _reactI18next = require("react-i18next");

var _InputLinker = _interopRequireWildcard(require("../utils/InputLinker"));

var _useStylesByNs = _interopRequireDefault(require("../styles/useStylesByNs"));

var _helpers = require("../utils/InputLinker/helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const defaultIlOnInit = props => il => {
  const {
    fields = [],
    defaultValues
  } = props;
  il.add(...fields.map(field => ({
    presets: [field, (0, _helpers.propagateOnChangeEvent)()]
  })));
  il.setDefaultValues(defaultValues || {});
  il.resetDirtyFlags();
};

exports.defaultIlOnInit = defaultIlOnInit;

var _default = (props, ilOnInit) => {
  const {
    value,
    namespace,
    ignoredUndefinedFromOutputs = true,
    Linker,
    linkerOptions,
    i18nNs = [],
    styleNs = [],
    onInited = () => undefined,
    onDidMount = () => undefined,
    onSubmit = () => undefined
  } = props;

  if (!Array.isArray(i18nNs)) {
    throw new Error(`Expect i18nNs as an Array, got: ${i18nNs}`);
  }

  if (!Array.isArray(styleNs)) {
    throw new Error(`Expect styleNs as an Array, got: ${styleNs}`);
  }

  const tData = (0, _reactI18next.useTranslation)(i18nNs);
  const classesByNs = (0, _useStylesByNs.default)(styleNs);

  const createInitFunc = (il, {
    reset
  }) => {
    (ilOnInit || defaultIlOnInit(props))(il);

    if (!reset) {
      onInited(il);
    }
  };

  const ilResults = (0, _InputLinker.useInputLinker)({}, Linker || _InputLinker.default, _objectSpread({}, linkerOptions, {
    namespace,
    ignoredUndefinedFromOutputs,
    controlled: !!value
  }), createInitFunc);
  const {
    il
  } = ilResults;
  const host = {
    handleSubmit: () => {
      if (il.validate()) {
        const outputs = il.getOutputs();
        onSubmit(outputs, il);
        return {
          outputs,
          linker: il
        };
      }

      return null;
    },
    props: _objectSpread({}, props, {
      classesByNs
    })
  };
  (0, _react.useEffect)(() => {
    onDidMount(il);
  }, []);
  return _objectSpread({}, ilResults, {
    classesByNs,
    tData,
    host
  });
};

exports.default = _default;