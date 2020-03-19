"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactImageLightbox = _interopRequireDefault(require("react-image-lightbox"));

var _styles = require("@material-ui/core/styles");

var _Fab = _interopRequireDefault(require("@material-ui/core/Fab"));

var _Edit = _interopRequireDefault(require("@material-ui/icons/Edit"));

var _Delete = _interopRequireDefault(require("@material-ui/icons/Delete"));

var _Fullscreen = _interopRequireDefault(require("@material-ui/icons/Fullscreen"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const onImageLoadError = (imageSrc, _srcType, errorEvent) => {
  console.error(`Could not load image at ${imageSrc}`, errorEvent);
};

const useStyles = (0, _styles.makeStyles)(theme => ({
  fab: {
    boxShadow: 'none'
  }
}));

var _default = props => {
  const {
    imageInfos = [],
    index = 0,
    setIndex,
    isOpen = false,
    setIsOpen,
    getContent: getContentFunc,
    editByIndex,
    deleteByIndex,
    zIndex
  } = props;
  const classes = useStyles();

  const openLightbox = () => {
    setIsOpen(true);
  };

  const closeLightbox = () => {
    setIsOpen(false);
    setIndex(0);
  };

  const moveNext = () => {
    setIndex((index + 1) % imageInfos.length);
  };

  const movePrev = () => {
    setIndex((index + imageInfos.length - 1) % imageInfos.length);
  };

  const getUrl = imageInfo => imageInfo && imageInfo.image && imageInfo.image.imgUrl || '';

  const getContent = getContentFunc || (imageInfo => imageInfo && imageInfo.content || '');

  let lightbox;

  if (isOpen && imageInfos.length) {
    const content = getContent(imageInfos[index], index);
    const editButtons = editByIndex ? [_react.default.createElement("button", {
      type: "button",
      "aria-label": "Zoom in",
      className: "ril__toolbarItemChild ril__builtinButton",
      style: {
        paddingTop: 6,
        backgroundColor: 'transparent'
      },
      onClick: () => {
        editByIndex(index);
      }
    }, _react.default.createElement(_Edit.default, {
      color: "primary"
    }))] : [];
    lightbox = _react.default.createElement(_reactImageLightbox.default, {
      mainSrc: getUrl(imageInfos[index]),
      nextSrc: getUrl(imageInfos[(index + 1) % imageInfos.length]),
      prevSrc: getUrl(imageInfos[(index + imageInfos.length - 1) % imageInfos.length]),
      mainSrcThumbnail: getUrl(imageInfos[index]),
      nextSrcThumbnail: getUrl(imageInfos[(index + 1) % imageInfos.length]),
      prevSrcThumbnail: getUrl(imageInfos[(index + imageInfos.length - 1) % imageInfos.length]),
      onCloseRequest: closeLightbox,
      onMovePrevRequest: movePrev,
      onMoveNextRequest: moveNext,
      onImageLoadError: onImageLoadError,
      imageTitle: `(${index + 1}/${imageInfos.length})`,
      imageCaption: content,
      reactModalStyle: {
        overlay: {
          zIndex: zIndex || 1300
        }
      },
      toolbarButtons: [...editButtons, _react.default.createElement("button", {
        type: "button",
        "aria-label": "Zoom in",
        className: "ril__toolbarItemChild ril__builtinButton",
        style: {
          paddingTop: 6,
          backgroundColor: 'transparent'
        },
        onClick: () => {
          if (imageInfos.length <= 1) {
            closeLightbox();
          } else if (index === imageInfos.length - 1) {
            setIndex(index - 1);
          }

          deleteByIndex(index);
        }
      }, _react.default.createElement(_Delete.default, {
        color: "error"
      }))]
    });
  }

  return _react.default.createElement("div", {
    style: {
      position: 'relative',
      width: 48,
      height: 48,
      padding: 4,
      marginRight: 8
    }
  }, _react.default.createElement(_Fab.default, {
    component: "span",
    size: "small",
    color: "primary",
    "aria-label": "add",
    className: classes.fab,
    onClick: openLightbox,
    disabled: !imageInfos.length
  }, _react.default.createElement(_Fullscreen.default, null)), lightbox);
};

exports.default = _default;