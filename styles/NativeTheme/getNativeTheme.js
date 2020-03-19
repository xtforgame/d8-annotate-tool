"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTheme = getTheme;
exports.createDarkTheme = exports.createLightTheme = exports.defaultThemeConfig = void 0;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const defaultThemeConfig = {
  direction: 'ltr',
  paletteType: 'light'
};
exports.defaultThemeConfig = defaultThemeConfig;

const createLightTheme = () => ({
  palette: {
    primary: {
      main: 'green'
    },
    text: {
      default: 'white'
    }
  }
});

exports.createLightTheme = createLightTheme;

const createDarkTheme = () => ({
  palette: {
    primary: {
      main: 'yellow'
    },
    text: {
      default: 'black'
    }
  }
});

exports.createDarkTheme = createDarkTheme;

const createTheme = themeOptions => _objectSpread({}, createLightTheme(), {}, themeOptions);

function getTheme(themeConfig = defaultThemeConfig) {
  if (themeConfig.paletteType === 'dark') {
    return createTheme(createDarkTheme());
  }

  return createTheme(createLightTheme());
}