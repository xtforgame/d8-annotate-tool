"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _default = theme => ({
  mobileContentPlaceholder: {
    height: 0
  },
  mobielContainer: {
    width: '100%',
    flex: 1,
    overflowY: 'hidden',
    flexDirection: 'column',
    display: 'flex'
  },
  mobileContent: {
    paddingRight: 8,
    paddingLeft: 8,
    flex: 1,
    height: 1,
    overflowY: 'scroll'
  }
});

exports.default = _default;