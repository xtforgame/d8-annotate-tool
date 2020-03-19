/* eslint-disable flowtype/require-valid-file-annotation, no-underscore-dangle */
// https://github.com/mui-org/material-ui/blob/master/docs/src/modules/components/AppWrapper.js
import React, { useState, useEffect } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { StylesProvider, ThemeProvider } from '@material-ui/styles';
import getPageContext, { updatePageContext } from '~/styles/getPageContext';
import { ThemeProvider as NativeThemeProvider, getTheme } from '~/styles/NativeTheme';

export default (props) => {
  const { uiTheme = {}, children } = props;
  const {
    paletteType,
    direction,
  } = uiTheme;

  // for material ui
  const [pageContext, setPageContext] = useState(props.pageContext || getPageContext(uiTheme));
  // for native theme
  const [nativeTheme, setNativeTheme] = useState(getTheme(uiTheme));

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }, []);

  useEffect(() => {
    setPageContext(updatePageContext(uiTheme));
    setNativeTheme(getTheme(uiTheme));
  }, [paletteType, direction]);

  return (
    <StylesProvider
      generateClassName={pageContext.generateClassName}
      jss={pageContext.jss}
      sheetsManager={pageContext.sheetsManager}
      sheetsRegistry={pageContext.sheetsRegistry}
    >
      {/* StylesProvider can be removed now? */}
      <NativeThemeProvider theme={nativeTheme}>
        <ThemeProvider theme={pageContext.theme}>
          <React.Fragment>
            <CssBaseline />
            {children}
          </React.Fragment>
        </ThemeProvider>
      </NativeThemeProvider>
    </StylesProvider>
  );
};
