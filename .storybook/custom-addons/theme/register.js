import React, { useState } from 'react';
import { addons } from '@storybook/addons';
import { useChannel, useAddonState } from '@storybook/api';
import { STORY_CHANGED, STORY_RENDERED } from '@storybook/core-events';
import { AddonPanel } from '@storybook/components';
import Button from '@material-ui/core/Button';
import ThemeContainer from 'library/core/ThemeContainer';
import { ADDON_ID, PANEL_ID, EVENT_ON_PARAMETER, EVENT_ON_THEME_CHANGE } from './constants';

let themeSwitch = 0;
const uiThemes = [
  {
    direction: 'ltr',
    paletteType: 'light',
  },
  {
    direction: 'ltr',
    paletteType: 'dark',
  },
];

const MyPanel = ({ api }) => {
  const [state, setState] = useAddonState(ADDON_ID, 'init state');
  const [currentThemeIndex, setCurrentThemeIndex] = useState(themeSwitch);

  const emit = useChannel({
    [STORY_RENDERED]: id => { console.log('id :', id); /* do something */ },
    [EVENT_ON_PARAMETER]: () => {},
  });

  return (
    <div style={{ padding: 16 }}>
      <ThemeContainer uiTheme={uiThemes[(currentThemeIndex + 1) % 2]}>
        {/* [BUG] ThemeContainer has no effect */}
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            themeSwitch = (++themeSwitch) % 2;
            setCurrentThemeIndex(themeSwitch);
            api.emit(EVENT_ON_THEME_CHANGE, uiThemes[themeSwitch]);
          }}
        >
          Switch To {uiThemes[(currentThemeIndex + 1) % 2].paletteType}
        </Button>
      </ThemeContainer>
    </div>
  );
}

// Register the addon with a unique name.
addons.register(ADDON_ID, api => {
  // Also need to set a unique name to the panel.
  addons.addPanel(PANEL_ID, {
    title: 'Azrmui Theme',
    render: ({ active, key }) => (
      <AddonPanel key={key} api={api} active={active}>
        <MyPanel api={api} />
      </AddonPanel>
    ),
  });
});
