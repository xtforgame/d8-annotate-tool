"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactBeautifulDnd = require("react-beautiful-dnd");

var _ActionItem = _interopRequireDefault(require("./ActionItem"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

const Wrapper = _react.default.forwardRef((props, ref) => {
  const {
    isDraggingOver
  } = props,
        divProps = _objectWithoutProperties(props, ["isDraggingOver"]);

  return _react.default.createElement("div", _extends({}, divProps, {
    ref: ref,
    style: _objectSpread({}, props.style, {
      display: 'flex',
      flexDirection: 'column',
      userSelect: 'none',
      transition: 'background-color 0.1s ease'
    })
  }));
});

const DropZone = _react.default.forwardRef((props, ref) => _react.default.createElement("div", _extends({}, props, {
  ref: ref,
  style: _objectSpread({}, props.style, {
    display: 'flex',
    alignItems: 'start',
    height: 48
  })
})));

const ScrollContainer = props => _react.default.createElement("div", _extends({}, props, {
  style: _objectSpread({}, props.style, {
    overflow: 'auto'
  })
}));

class ActionList extends _react.Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "renderBoard", dropProvided => {
      const {
        actions
      } = this.props;
      return _react.default.createElement(DropZone, {
        ref: dropProvided.innerRef
      }, actions.map((action, index) => _react.default.createElement(_reactBeautifulDnd.Draggable, {
        key: action.id,
        draggableId: action.id,
        index: index
      }, (dragProvided, dragSnapshot) => _react.default.createElement(_ActionItem.default, {
        action: action.action,
        provided: dragProvided,
        snapshot: dragSnapshot,
        isGroupedOver: Boolean(dragSnapshot.combineTargetFor)
      }))), _react.default.createElement("div", {
        style: {
          display: 'none'
        }
      }, dropProvided.placeholder));
    });
  }

  render() {
    const {
      listId,
      listType,
      isCombineEnabled
    } = this.props;
    return _react.default.createElement(_reactBeautifulDnd.Droppable, {
      droppableId: listId,
      type: listType,
      direction: "horizontal",
      isCombineEnabled: isCombineEnabled
    }, (dropProvided, dropSnapshot) => _react.default.createElement(Wrapper, _extends({
      isDraggingOver: dropSnapshot.isDraggingOver
    }, dropProvided.droppableProps), _react.default.createElement(ScrollContainer, null, this.renderBoard(dropProvided))));
  }

}

exports.default = ActionList;