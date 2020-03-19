"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styles = require("@material-ui/core/styles");

var _CardMedia = _interopRequireDefault(require("@material-ui/core/CardMedia"));

var _Typography = _interopRequireDefault(require("@material-ui/core/Typography"));

var _IconButton = _interopRequireDefault(require("@material-ui/core/IconButton"));

var _KeyboardArrowLeft = _interopRequireDefault(require("@material-ui/icons/KeyboardArrowLeft"));

var _KeyboardArrowRight = _interopRequireDefault(require("@material-ui/icons/KeyboardArrowRight"));

var _reactSwipeableViews = _interopRequireDefault(require("react-swipeable-views"));

var _reactSwipeableViewsUtils = require("react-swipeable-views-utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const VirtualizeSwipeableViews = (0, _reactSwipeableViewsUtils.virtualize)(_reactSwipeableViews.default);
const useStyles = (0, _styles.makeStyles)(theme => ({
  card: {
    maxWidth: 345
  },
  media: {
    height: 200,
    position: 'relative'
  },
  swipeableViewInfoText: {
    position: 'absolute',
    top: 0,
    right: 0,
    padding: 4
  },
  swipeableViewActionsOuter: {
    display: 'flex',
    position: 'absolute',
    flexDirection: 'column',
    justifyContent: 'center',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  swipeableViewActionsInner: {
    display: 'flex'
  }
}));

var _default = props => {
  const {
    images = []
  } = props;
  const [imgIndex, setImgIndex] = (0, _react.useState)(0);
  const classes = useStyles();

  const slideRenderer = params => {
    const {
      index,
      key
    } = params;
    let realImgIndex = index % images.length;

    if (realImgIndex < 0) {
      realImgIndex += images.length;
    }

    return _react.default.createElement(_CardMedia.default, {
      key: key,
      className: classes.media,
      image: images[realImgIndex],
      title: "Contemplative Reptile"
    });
  };

  let currentImgIndex = imgIndex % images.length;

  if (currentImgIndex < 0) {
    currentImgIndex += images.length;
  }

  return _react.default.createElement("div", {
    className: classes.media
  }, _react.default.createElement(VirtualizeSwipeableViews, _extends({
    index: imgIndex
  }, {}, {
    style: {
      flex: 1
    },
    disabled: true,
    slideRenderer: slideRenderer
  })), _react.default.createElement(_Typography.default, {
    color: "primary",
    className: classes.swipeableViewInfoText
  }, `${currentImgIndex + 1}/${images.length}`), _react.default.createElement("div", {
    className: classes.swipeableViewActionsOuter
  }, _react.default.createElement("div", {
    className: classes.swipeableViewActionsInner
  }, _react.default.createElement(_IconButton.default, {
    "aria-label": "Preious",
    onClick: () => {
      setImgIndex(imgIndex - 1);
    }
  }, _react.default.createElement(_KeyboardArrowLeft.default, {
    color: "primary",
    style: {
      fontSize: 48
    }
  })), _react.default.createElement("div", {
    style: {
      flex: 1
    }
  }), _react.default.createElement(_IconButton.default, {
    "aria-label": "Preious",
    onClick: () => {
      setImgIndex(imgIndex + 1);
    }
  }, _react.default.createElement(_KeyboardArrowRight.default, {
    color: "primary",
    style: {
      fontSize: 48
    }
  })))));
};

exports.default = _default;