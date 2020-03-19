"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _Info = _interopRequireDefault(require("@material-ui/icons/Info"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

const Avatar = _react.default.forwardRef((props, ref) => {
  const {
    src,
    alt,
    isDragging,
    isGroupedOver
  } = props,
        divProps = _objectWithoutProperties(props, ["src", "alt", "isDragging", "isGroupedOver"]);

  return _react.default.createElement("div", _extends({}, divProps, {
    style: {
      boxSizing: 'content-box',
      width: 144,
      height: 44,
      marginRight: 16,
      borderRadius: 8,
      borderWidth: 2,
      borderStyle: 'dashed',
      background: isGroupedOver ? 'rgba(255, 0, 0, 0.5)' : 'transparent'
    },
    ref: ref
  }), _react.default.createElement(_Info.default, {
    style: {
      marginTop: 4,
      marginLeft: 54,
      width: 36,
      height: 36
    }
  }));
});

class ActionItem extends _react.Component {
  render() {
    const {
      action,
      provided,
      snapshot
    } = this.props;

    const _provided$draggablePr = provided.draggableProps,
          {
      style
    } = _provided$draggablePr,
          draggableProps = _objectWithoutProperties(_provided$draggablePr, ["style"]);

    return _react.default.createElement(Avatar, _extends({
      ref: ref => provided.innerRef(ref)
    }, draggableProps, provided.dragHandleProps, {
      src: action.imgUrl,
      alt: action.name,
      isDragging: snapshot.isDragging,
      isGroupedOver: this.props.isGroupedOver
    }));
  }

}

exports.default = ActionItem;