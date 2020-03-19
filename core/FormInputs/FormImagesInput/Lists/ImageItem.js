"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styles = require("@material-ui/core/styles");

var _CardMedia = _interopRequireDefault(require("@material-ui/core/CardMedia"));

var _Zoom = _interopRequireDefault(require("@material-ui/core/Zoom"));

var _CloudUpload = _interopRequireDefault(require("@material-ui/icons/CloudUpload"));

var _CloudDone = _interopRequireDefault(require("@material-ui/icons/CloudDone"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

const useStyles = (0, _styles.makeStyles)(theme => ({
  root: {
    flexGrow: 0,
    flexShrink: 0,
    borderRadius: 8,
    position: 'relative'
  },
  mask: {
    position: 'absolute',
    width: '100%',
    top: 0,
    left: 0,
    pointerEvents: 'none',
    background: 'rgba(0, 0, 0, 0.5)'
  },
  stateIcon: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    pointerEvents: 'none'
  }
}));

const Avatar = _react.default.forwardRef((props, ref) => {
  const {
    imageInfo,
    isDragging,
    thumbSize = 48,
    onClick,
    observableInfo
  } = props,
        divProps = _objectWithoutProperties(props, ["imageInfo", "isDragging", "thumbSize", "onClick", "observableInfo"]);

  const classes = useStyles();
  const theme = (0, _styles.useTheme)();
  const [uploadDone, setUploadDone] = (0, _react.useState)(false);
  const [uploadProgress, setUploadProgress] = (0, _react.useState)(0);
  (0, _react.useEffect)(() => {
    if (observableInfo && imageInfo.imageUploadInfo) {
      observableInfo.uploadProgressSubject.getValue();
      const subscription = observableInfo.uploadProgressSubject.subscribe(value => {
        setUploadProgress(Math.min(value, 100));

        if (value >= 100) {
          setUploadDone(true);
        }
      });
      return () => {
        if (subscription) {
          subscription.unsubscribe();
        }
      };
    }
  }, [observableInfo, imageInfo.imageUploadInfo]);
  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen
  };

  const renderStateIcon = () => {
    if (imageInfo.imageUploadInfo) {
      return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement("div", {
        className: classes.stateIcon
      }, _react.default.createElement(_Zoom.default, {
        in: !uploadDone,
        timeout: transitionDuration,
        style: {
          transitionDelay: `${!uploadDone ? transitionDuration.exit : 0}ms`
        },
        unmountOnExit: true
      }, _react.default.createElement(_CloudUpload.default, {
        color: "secondary"
      }))), _react.default.createElement("div", {
        className: classes.stateIcon
      }, _react.default.createElement(_Zoom.default, {
        in: uploadDone,
        timeout: transitionDuration,
        style: {
          transitionDelay: `${uploadDone ? transitionDuration.exit : 0}ms`
        },
        unmountOnExit: true
      }, _react.default.createElement(_CloudDone.default, {
        color: "primary"
      }))));
    }

    return _react.default.createElement("div", {
      className: classes.stateIcon
    }, _react.default.createElement(_CloudDone.default, {
      color: "primary"
    }));
  };

  return _react.default.createElement("div", _extends({}, divProps, {
    ref: ref,
    className: classes.root
  }), _react.default.createElement(_CardMedia.default, {
    style: {
      position: 'relative',
      overflow: 'hidden',
      width: thumbSize,
      height: thumbSize,
      borderRadius: 8,
      borderStyle: 'solid',
      borderWidth: 2,
      borderColor: props.isDragging ? 'green' : 'white',
      opacity: props.isDragging ? 0.3 : 1
    },
    image: imageInfo.image.imgUrl,
    title: imageInfo.content || '',
    onClick: onClick
  }, !!imageInfo.imageUploadInfo && _react.default.createElement("div", {
    className: classes.mask,
    style: {
      height: `${100 - uploadProgress}%`
    }
  })), renderStateIcon());
});

var _default = props => {
  const {
    imageInfo,
    provided,
    snapshot,
    thumbSize,
    onClick,
    observableInfo
  } = props;
  return _react.default.createElement(Avatar, _extends({
    ref: ref => provided.innerRef(ref)
  }, provided.draggableProps, provided.dragHandleProps, {
    imageInfo: imageInfo,
    isDragging: snapshot.isDragging,
    thumbSize: thumbSize,
    onClick: onClick,
    observableInfo: observableInfo
  }));
};

exports.default = _default;