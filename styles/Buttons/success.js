"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _default = theme => ({
  containedPrimary: {
    contrastText: theme.palette.getContrastText(theme.palette.primary.main),
    color: theme.status.success.contrastText,
    backgroundColor: theme.status.success.main,
    '&:hover': {
      backgroundColor: theme.status.success.dark,
      '@media (hover: none)': {
        backgroundColor: theme.status.success.main
      }
    }
  }
});

exports.default = _default;