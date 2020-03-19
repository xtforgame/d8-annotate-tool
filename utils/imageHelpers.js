"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isUploadSupported = isUploadSupported;
exports.isFileReaderSupported = isFileReaderSupported;
exports.processFile = processFile;
exports.readFile = exports.defaultHashFunc = void 0;

var _crypto = _interopRequireDefault(require("crypto"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isUploadSupported() {
  if (navigator.userAgent.match(/(Android (1.0|1.1|1.5|1.6|2.0|2.1))|(Windows Phone (OS 7|8.0))|(XBLWP)|(ZuneWP)|(w(eb)?OSBrowser)|(webOS)|(Kindle\/(1.0|2.0|2.5|3.0))/)) {
    return false;
  }

  return true;
}

function isFileReaderSupported() {
  return window.File && window.FileReader && window.FormData;
}

const defaultHashFunc = data => _crypto.default.createHash('sha256').update(data, 'binary').digest('hex');

exports.defaultHashFunc = defaultHashFunc;

function processFile(dataURL, file, options = {}) {
  const fileName = file.name;
  const fileType = file.type;
  const doHash = !!options.hash;
  const hashFunc = typeof options.hash === 'function' ? options.hash : defaultHashFunc;
  const searchRegex = /data:(.*);base64,([a-zA-Z0-9+/=]*)/g;
  const dataUrlRegexResult = searchRegex.exec(dataURL || '');
  const result = {
    file,
    fileName,
    fileType,
    dataURL
  };

  if (doHash && dataUrlRegexResult) {
    result.hash = hashFunc(atob(dataUrlRegexResult[2]));
  }

  return Promise.resolve(result);
}

const readFile = (file, options = {}) => new Promise((resolve, reject) => {
  const reader = new FileReader();

  reader.onloadend = () => {
    processFile(reader.result, file, options).then(resolve, reject);
  };

  reader.onerror = () => {
    reject(new Error('There was an error reading the file!'));
  };

  reader.readAsDataURL(file);
});

exports.readFile = readFile;