import React from 'react';
import { createTheming, createUseStyles } from 'react-jss';

const ThemeContext = React.createContext({});

// Creating a namespaced theming object.
const theming = createTheming(ThemeContext);
const { ThemeProvider, useTheme } = theming;

const makeStyles = (styles, options) => {
  const useStyles = createUseStyles(styles);
  return (props) => {
    const theme = useTheme();
    return useStyles({ ...props, theme });
  };
};

export default theming;
export { ThemeProvider, useTheme, makeStyles };
