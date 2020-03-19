"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.defaultIlOnInit = void 0;

var _useLayoutFeatures = _interopRequireDefault(require("./useLayoutFeatures"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const defaultIlOnInit = props => il => {
  const {
    fields = [],
    defaultValues
  } = props;
  il.add(...fields.map(field => ({
    presets: [field]
  })));
  il.setDefaultValues(defaultValues || {});
  il.resetDirtyFlags();
};

exports.defaultIlOnInit = defaultIlOnInit;

var _default = (props, ilOnInit) => (0, _useLayoutFeatures.default)(props, ilOnInit || defaultIlOnInit(props));

exports.default = _default;