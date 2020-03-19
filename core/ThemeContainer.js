"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _CssBaseline = _interopRequireDefault(require("@material-ui/core/CssBaseline"));

var _styles = require("@material-ui/styles");

var _getPageContext = _interopRequireWildcard(require("../styles/getPageContext"));

var _NativeTheme = require("../styles/NativeTheme");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var _default = props => {
  const {
    uiTheme = {},
    children
  } = props;
  const {
    paletteType,
    direction
  } = uiTheme;
  const [pageContext, setPageContext] = (0, _react.useState)(props.pageContext || (0, _getPageContext.default)(uiTheme));
  const [nativeTheme, setNativeTheme] = (0, _react.useState)((0, _NativeTheme.getTheme)(uiTheme));
  (0, _react.useEffect)(() => {
    const jssStyles = document.querySelector('#jss-server-side');

    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }, []);
  (0, _react.useEffect)(() => {
    setPageContext((0, _getPageContext.updatePageContext)(uiTheme));
    setNativeTheme((0, _NativeTheme.getTheme)(uiTheme));
  }, [paletteType, direction]);
  return _react.default.createElement(_styles.StylesProvider, {
    generateClassName: pageContext.generateClassName,
    jss: pageContext.jss,
    sheetsManager: pageContext.sheetsManager,
    sheetsRegistry: pageContext.sheetsRegistry
  }, _react.default.createElement(_NativeTheme.ThemeProvider, {
    theme: nativeTheme
  }, _react.default.createElement(_styles.ThemeProvider, {
    theme: pageContext.theme
  }, _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_CssBaseline.default, null), children))));
};

exports.default = _default;