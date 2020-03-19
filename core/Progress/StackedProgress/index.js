"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Segment = exports.SegmentContainer = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const flexContainer = {
  display: 'flex',
  flexDirection: 'row',
  position: 'relative',
  width: '100%'
};
const flex1 = {
  flex: 1
};

class SegmentContainer extends _react.default.PureComponent {
  render() {
    const {
      percent,
      animation,
      absolute,
      className,
      fullHeight,
      children
    } = this.props;
    const containerStyle = {
      width: `${percent}%`,
      transition: `width ${animation}ms`,
      position: 'relative',
      minHeight: fullHeight
    };

    if (absolute) {
      containerStyle.position = 'absolute';
      containerStyle.bottom = 0;
    }

    return _react.default.createElement("div", {
      className: className,
      style: containerStyle
    }, children);
  }

}

exports.SegmentContainer = SegmentContainer;

_defineProperty(SegmentContainer, "propTypes", {
  percent: _propTypes.default.number,
  animation: _propTypes.default.number,
  fullHeight: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number])
});

_defineProperty(SegmentContainer, "defaultProps", {
  percent: 0,
  animation: 200,
  fullHeight: 10
});

class Segment extends _react.default.PureComponent {
  render() {
    const {
      color,
      percent,
      animation,
      absolute,
      className,
      barHeight,
      fullHeight,
      children
    } = this.props;
    const barStyle = {
      width: '100%',
      backgroundColor: color,
      height: barHeight,
      position: 'absolute',
      bottom: 0
    };
    return _react.default.createElement(SegmentContainer, {
      percent: percent,
      animation: animation,
      absolute: absolute,
      className: className,
      fullHeight: fullHeight
    }, _react.default.createElement("div", {
      style: _objectSpread({}, barStyle)
    }), _react.default.createElement("div", {
      style: _objectSpread({}, flexContainer, {
        position: 'absolute'
      })
    }, _react.default.createElement("div", {
      style: flex1
    }), children, _react.default.createElement("div", {
      style: flex1
    })));
  }

}

exports.Segment = Segment;

_defineProperty(Segment, "propTypes", {
  percent: _propTypes.default.number,
  color: _propTypes.default.string,
  animation: _propTypes.default.number,
  barHeight: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number]),
  fullHeight: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number])
});

_defineProperty(Segment, "defaultProps", {
  percent: 0,
  color: '#0BD318',
  animation: 200,
  barHeight: 10,
  fullHeight: 10
});

class StackedProgress extends _react.default.PureComponent {
  render() {
    const _this$props = this.props,
          {
      title,
      mainLabel,
      className,
      children,
      barHeight,
      fullHeight
    } = _this$props,
          rest = _objectWithoutProperties(_this$props, ["title", "mainLabel", "className", "children", "barHeight", "fullHeight"]);

    let totalPercent = 0;
    (children || []).forEach(child => {
      totalPercent += child && child.props && child.props.percent || 0;
    });
    return _react.default.createElement("div", _extends({
      className: className
    }, rest), _react.default.createElement("div", {
      style: flexContainer
    }, title, title && '\u00A0', _react.default.createElement("div", {
      style: flex1
    }, _react.default.createElement("div", {
      style: flexContainer
    }, children), _react.default.createElement("div", {
      style: flexContainer
    }, _react.default.createElement(Segment, {
      absolute: true,
      color: "none",
      percent: totalPercent,
      barHeight: barHeight,
      fullHeight: fullHeight
    }, mainLabel)))));
  }

}

exports.default = StackedProgress;

_defineProperty(StackedProgress, "propTypes", {
  mainLabel: _propTypes.default.any,
  height: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number])
});

_defineProperty(StackedProgress, "defaultProps", {
  mainLabel: '',
  height: 0
});