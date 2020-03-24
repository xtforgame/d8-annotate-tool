import React, { useState, useEffect } from 'react';
import ThemeContainer from 'library/core/ThemeContainer';
import { EVENT_ON_THEME_CHANGE } from '../constants';
import emitter, { getUiTheme } from '../emitter';

export default (props) => {
  const [uiTheme, setUiTheme] = useState(getUiTheme());
  useEffect(() => {
    const f = (uiTheme) => {
      setUiTheme(uiTheme);
    };
    emitter.addListener(EVENT_ON_THEME_CHANGE, f);
    return () => {
      emitter.removeListener(EVENT_ON_THEME_CHANGE, f);
    };
  });
  return (
    <ThemeContainer {...props} uiTheme={uiTheme} />
  );
};
