"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  useDispatchToProps: true,
  useConnect: true
};
exports.useConnect = exports.useDispatchToProps = void 0;

var _reduxReactHook = require("redux-react-hook");

Object.keys(_reduxReactHook).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _reduxReactHook[key];
    }
  });
});

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const useDispatchToProps = map => {
  const dispatch = (0, _reduxReactHook.useDispatch)();

  if (!map) {
    return dispatch;
  }

  if (typeof map === 'function') {
    return map(dispatch);
  }

  if (!Array.isArray(map) && map === Object(map)) {
    return Object.keys(map).reduce((m, k) => _objectSpread({}, m, {
      [k]: (...args) => dispatch(map[k](...args))
    }), {});
  }

  throw new Error('Wrong arg for useDispatchToProps');
};

exports.useDispatchToProps = useDispatchToProps;

const useConnect = (mapStateToProps, mapDispatchToProps) => {
  const state = (0, _reduxReactHook.useMappedState)(mapStateToProps);
  let dispatch = useDispatchToProps(mapDispatchToProps);

  if (typeof dispatch === 'function') {
    dispatch = {
      dispatch
    };
  }

  return _objectSpread({}, state, {}, dispatch);
};

exports.useConnect = useConnect;