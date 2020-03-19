"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDateTimeDisplayFuncFromProps = exports.getTimeDisplayFuncFromProps = exports.getDateDisplayFuncFromProps = exports.timeFormat = exports.dateTimeDisplayFormat = exports.timeDisplayFormat = exports.dateDisplayFormat = void 0;

var _moment = _interopRequireDefault(require("moment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const dateDisplayFormat = 'll';
exports.dateDisplayFormat = dateDisplayFormat;
const timeDisplayFormat = 'LT';
exports.timeDisplayFormat = timeDisplayFormat;
const dateTimeDisplayFormat = 'lll';
exports.dateTimeDisplayFormat = dateTimeDisplayFormat;
const timeFormat = 'YYYY-MM-DD[T]HH:mm:ss.SSSZZ';
exports.timeFormat = timeFormat;

const getDateDisplayFuncFromProps = props => (date, invalidLabel) => date === null ? invalidLabel : (0, _moment.default)(date).format(dateDisplayFormat);

exports.getDateDisplayFuncFromProps = getDateDisplayFuncFromProps;

const getTimeDisplayFuncFromProps = props => (date, invalidLabel) => date === null ? invalidLabel : (0, _moment.default)(date).format(timeDisplayFormat);

exports.getTimeDisplayFuncFromProps = getTimeDisplayFuncFromProps;

const getDateTimeDisplayFuncFromProps = props => (date, invalidLabel) => date === null ? invalidLabel : (0, _moment.default)(date).format(dateTimeDisplayFormat);

exports.getDateTimeDisplayFuncFromProps = getDateTimeDisplayFuncFromProps;