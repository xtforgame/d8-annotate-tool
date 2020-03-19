"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _useLayoutFeaturesEx = _interopRequireDefault(require("./useLayoutFeaturesEx"));

var _useEffectIgnoreFirstRun = _interopRequireDefault(require("./useEffectIgnoreFirstRun"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = props => {
  const {
    defaultValues,
    isEditing
  } = props;
  const layoutFeaturesResult = (0, _useLayoutFeaturesEx.default)(props);
  const {
    resetIl
  } = layoutFeaturesResult;
  (0, _useEffectIgnoreFirstRun.default)(() => {
    resetIl({
      defaultValues
    });
  }, [isEditing]);
  return layoutFeaturesResult;
};

exports.default = _default;