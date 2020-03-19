// https://cssinjs.org/react-jss/?v=v10.0.4

export const defaultThemeConfig = {
  direction: 'ltr',
  paletteType: 'light',
  // paletteType: 'dark',
  // paletteType: 'vaxal',
};

export const createLightTheme = () => ({
  palette: {
    primary: {
      main: 'green',
    },
    text: {
      default: 'white',
    },
  },
});

export const createDarkTheme = () => ({
  palette: {
    primary: {
      main: 'yellow',
    },
    text: {
      default: 'black',
    },
  },
});

const createTheme = themeOptions => ({
  ...createLightTheme(),
  ...themeOptions,
});

export function getTheme(themeConfig = defaultThemeConfig) {
  if (themeConfig.paletteType === 'dark') {
    return createTheme(createDarkTheme());
  }
  return createTheme(createLightTheme());
}
