"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDateRangeDisplayFunc = exports.normalizeDateTime = void 0;

var _moment = _interopRequireDefault(require("moment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const normalizeDateTime = ([startTime, endTime]) => {
  if (startTime && endTime && (0, _moment.default)(startTime).valueOf() > (0, _moment.default)(endTime).valueOf()) {
    return [endTime || null, startTime || null];
  }

  return [startTime || null, endTime || null];
};

exports.normalizeDateTime = normalizeDateTime;

const getDateRangeDisplayFunc = displayFunc => range => {
  const [startTime = null, endTime = null] = range || [];
  const startText = displayFunc(startTime, '');
  const finishText = displayFunc(endTime, '');

  if (startText && finishText) {
    return `${startText}\n~\n${finishText}`;
  } else if (startText) {
    return `${startText} ~`;
  } else if (finishText) {
    return `~ ${finishText}`;
  }

  return '';
};

exports.getDateRangeDisplayFunc = getDateRangeDisplayFunc;