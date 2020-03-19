"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactBeautifulDnd = require("react-beautiful-dnd");

var _v = _interopRequireDefault(require("uuid/v4"));

var _uploadContext = _interopRequireDefault(require("./uploadContext"));

var _useForceUpdate = _interopRequireDefault(require("../../../hooks/useForceUpdate"));

var _ImageList = _interopRequireDefault(require("./Lists/ImageList"));

var _DetailButton = _interopRequireDefault(require("./DetailButton"));

var _AddImageButton = _interopRequireDefault(require("./AddImageButton"));

var _arrayHelpers = require("./array-helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const Root = props => _react.default.createElement("div", _extends({}, props, {
  style: _objectSpread({}, props.style, {
    display: 'flex',
    flexDirection: 'column'
  })
}));

const ActionRoot = props => _react.default.createElement("div", _extends({}, props, {
  style: _objectSpread({}, props.style, {
    display: 'flex'
  })
}));

const actions = 'actions';
const images = 'images';
const quoteMap = {
  [actions]: [{
    id: 'action-info',
    content: 'action-info',
    action: {
      id: 'action-info',
      imgUrl: 'xxx',
      name: 'action-info'
    }
  }],
  [images]: [{
    id: 'image-rocket1',
    content: 'Jake',
    image: {
      id: 'image-rocket1',
      imgUrl: 'https://d8ai.atlassian.net/secure/projectavatar?pid=10037&avatarId=10419&size=xxlarge',
      name: 'image-rocket1'
    }
  }, {
    id: 'image-rocket2',
    content: 'Jake',
    image: {
      id: 'image-rocket2',
      imgUrl: 'https://d8ai.atlassian.net/secure/projectavatar?pid=10037&avatarId=10419&size=xxlarge',
      name: 'image-rocket2'
    }
  }]
};

var _default = props => {
  const {
    id,
    value: imageInfos = [],
    onChange: setImageInfos,
    onAdd: addImageInfo,
    onEdit,
    getContent,
    thumbSize = 48,
    handleUpload,
    lightboxZIndex
  } = props;
  const context = (0, _react.useContext)(_uploadContext.default);
  const [index, setIndex] = (0, _react.useState)(0);
  const [isOpen, setIsOpen] = (0, _react.useState)(false);
  const forceUpdate = (0, _useForceUpdate.default)();

  const onDragEnd = result => {
    if (!result.destination || result.source.droppableId !== result.destination.droppableId) {
      return;
    }

    setImageInfos((0, _arrayHelpers.arrayMove)(imageInfos, result.source.index, result.destination.index));
  };

  const newContext = _objectSpread({}, context, {
    uploadImage: imageInfo => {
      context.uploadImage(imageInfo, handleUpload);
      forceUpdate();
    }
  });

  const editFunction = onEdit ? index => {
    onEdit(imageInfos[index], index, {
      context: newContext
    });
  } : undefined;
  return _react.default.createElement(_reactBeautifulDnd.DragDropContext, {
    onDragEnd: onDragEnd
  }, _react.default.createElement(_uploadContext.default.Provider, {
    value: newContext
  }, _react.default.createElement(Root, null, _react.default.createElement(ActionRoot, null, _react.default.createElement(_DetailButton.default, {
    imageInfos: imageInfos,
    index: index,
    setIndex: setIndex,
    isOpen: isOpen,
    setIsOpen: setIsOpen,
    editByIndex: editFunction,
    getContent: getContent,
    deleteByIndex: index => {
      const newImageInfos = [...imageInfos];
      newImageInfos.splice(index, 1);
      setImageInfos(newImageInfos);
    },
    zIndex: lightboxZIndex
  }), _react.default.createElement(_AddImageButton.default, {
    id: id ? `${id}-add-image-button` : 'add-image-button',
    onLoadEnd: imageUploadInfo => {
      const id = (0, _v.default)();
      const imageInfo = {
        id,
        imageUploadInfo,
        content: imageUploadInfo.fileName,
        image: {
          id,
          imgUrl: imageUploadInfo.dataURL,
          hash: imageUploadInfo.hash || '',
          name: imageUploadInfo.fileName,
          metadata: {}
        }
      };
      addImageInfo(imageInfo, {
        context: newContext
      });
    }
  })), _react.default.createElement(_ImageList.default, {
    internalScroll: true,
    listId: images,
    listType: "CARD",
    imageInfos: imageInfos,
    thumbSize: thumbSize,
    onItemClick: (imageInfo, imageIndex) => {
      setIndex(imageIndex);
      setIsOpen(true);
    }
  }))));
};

exports.default = _default;