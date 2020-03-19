"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.isImageUploaded = exports.uploadImage = exports.createHandleUploadFunction = exports.getObservableInfo = exports.observableInfo = void 0;

var _react = _interopRequireDefault(require("react"));

var _axios = _interopRequireDefault(require("axios"));

var Rx = _interopRequireWildcard(require("rxjs"));

var _HeaderManager = require("../../../utils/HeaderManager");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const observableInfo = {};
exports.observableInfo = observableInfo;

const getObservableInfo = resourceId => observableInfo[resourceId];

exports.getObservableInfo = getObservableInfo;

const createHandleUploadFunction = urlBase => async (imageInfo, uploadProgressSubject) => {
  const imageUploadInfo = imageInfo.imageUploadInfo;
  let data;

  try {
    ({
      data
    } = await (0, _axios.default)({
      method: 'options',
      url: `${urlBase}/${imageUploadInfo.hash}`,
      headers: _objectSpread({}, (0, _HeaderManager.getHeaders)())
    }));
  } catch (error) {
    return Promise.resolve(null);
  }

  if (data['content-type']) {
    uploadProgressSubject.next(100);
    return Promise.resolve(null);
  }

  const searchRegex = /data:(.*);base64,([a-zA-Z0-9+/=]*)/g;
  const dataUrlRegexResult = searchRegex.exec(imageUploadInfo.dataURL || '');

  if (!dataUrlRegexResult) {
    return Promise.resolve(null);
  }

  const byteCharacters = atob(dataUrlRegexResult[2]);
  const byteNumbers = Array.from({
    length: byteCharacters.length
  });

  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }

  const byteArray = new Uint8Array(byteNumbers);
  const fileBlob = new Blob([byteArray], {
    type: imageUploadInfo.fileType
  });
  const formData = new FormData();
  formData.append('file', fileBlob, imageUploadInfo.fileName);
  await (0, _axios.default)({
    method: 'post',
    url: urlBase,
    headers: _objectSpread({}, (0, _HeaderManager.getHeaders)(), {
      'Content-Type': 'multipart/form-data'
    }),
    data: formData,
    onUploadProgress: progressEvent => {
      const percentCompleted = Math.round(progressEvent.loaded * 100 / progressEvent.total);
      uploadProgressSubject.next(percentCompleted);
    }
  }).then(({
    data
  }) => {});
  return Promise.resolve(null);
};

exports.createHandleUploadFunction = createHandleUploadFunction;

const uploadImage = (imageInfo, handleUpload) => {
  const {
    imageUploadInfo
  } = imageInfo;

  if (getObservableInfo(imageUploadInfo.hash)) {
    return Promise.resolve(null);
  }

  const uploadProgressSubject = new Rx.BehaviorSubject(0);

  if (imageUploadInfo.hash) {
    observableInfo[imageUploadInfo.hash] = {
      uploadProgressSubject
    };
  }

  return handleUpload(imageInfo, uploadProgressSubject);
};

exports.uploadImage = uploadImage;

const isImageUploaded = imageInfo => {
  if (!imageInfo.imageUploadInfo) {
    return true;
  }

  const observableInfo = getObservableInfo(imageInfo.imageUploadInfo.hash);

  if (!observableInfo) {
    return false;
  }

  return observableInfo.uploadProgressSubject.getValue() >= 100;
};

exports.isImageUploaded = isImageUploaded;

var _default = _react.default.createContext({
  getObservableInfo,
  uploadImage
});

exports.default = _default;