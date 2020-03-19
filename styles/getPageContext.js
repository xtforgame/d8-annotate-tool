"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTheme = getTheme;
exports.updatePageContext = updatePageContext;
exports.default = getPageContext;
exports.defaultUiTheme = void 0;

var _jss = require("jss");

var _jssRtl = _interopRequireDefault(require("jss-rtl"));

var _styles = require("@material-ui/styles");

var _styles2 = require("@material-ui/core/styles");

var _colors = require("@material-ui/core/colors");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function getTheme(theme) {
  let {
    paletteType
  } = theme;
  let primary = _colors.blue;
  let secondary = _colors.pink;
  let background = {
    paper: _colors.common.white,
    default: _colors.grey[50]
  };

  if (theme.paletteType === 'dark') {
    primary = _colors.indigo;
    background = {
      paper: _colors.grey[800],
      default: '#303030'
    };
  } else if (theme.paletteType === 'vaxal') {
    primary = {
      light: '#765cb7',
      main: '#463287',
      dark: '#120b59',
      contrastText: _colors.common.white
    };
    secondary = {
      light: '#78deff',
      main: '#3dacd3',
      dark: '#007da2',
      contrastText: _colors.common.white
    };
    background = {
      paper: _colors.grey[100],
      default: _colors.grey[200]
    };
    paletteType = 'light';
  }

  return (0, _styles2.createMuiTheme)({
    direction: theme.direction,
    typography: {
      useNextVariants: true,
      fontFamily: '"Noto Sans TC", "Noto Sans SC", "Noto Sans JP", "Roboto", sans-serif'
    },
    palette: {
      primary,
      secondary,
      type: paletteType,
      background
    },
    status: {
      success: {
        light: _colors.green[300],
        main: _colors.green[500],
        dark: _colors.green[700]
      },
      warning: {
        light: _colors.orange[300],
        main: _colors.orange[500],
        dark: _colors.orange[700]
      },
      danger: {
        light: _colors.red[300],
        main: _colors.red[500],
        dark: _colors.red[700]
      }
    }
  });
}

const defaultUiTheme = {
  direction: 'ltr',
  paletteType: 'light'
};
exports.defaultUiTheme = defaultUiTheme;
const jss = (0, _jss.create)({
  insertionPoint: document.getElementById('jss-insertion-point'),
  plugins: [...(0, _styles.jssPreset)().plugins, (0, _jssRtl.default)()]
});

function createPageContext(uiTheme) {
  return {
    jss,
    theme: getTheme(uiTheme || defaultUiTheme),
    sheetsManager: new Map(),
    sheetsRegistry: new _jss.SheetsRegistry(),
    generateClassName: (0, _styles.createGenerateClassName)({
      productionPrefix: 'j'
    })
  };
}

function updatePageContext(uiTheme) {
  const pageContext = _objectSpread({}, global.__MUI_PAGE_CONTEXT__, {
    theme: getTheme(uiTheme)
  });

  global.__MUI_PAGE_CONTEXT__ = pageContext;
  return pageContext;
}

function getPageContext(uiTheme) {
  if (!process.browser) {
    return createPageContext(uiTheme);
  }

  if (!global.__MUI_PAGE_CONTEXT__) {
    global.__MUI_PAGE_CONTEXT__ = createPageContext(uiTheme);
  }

  return global.__MUI_PAGE_CONTEXT__;
}