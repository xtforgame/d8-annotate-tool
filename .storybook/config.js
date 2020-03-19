import React from 'react';
import { configure, setAddon, addDecorator } from '@storybook/react';
import { setOptions } from '@storybook/addon-options';
import infoAddon, { setDefaults } from '@storybook/addon-info';

import ThemeContainer from '../stories/ThemeContainer';

setOptions({
    name: 'Azrmui',
    url: 'localhost:9001',
});

setDefaults({
  inline: true,
  propTables: false,
  header: false,
  maxPropObjectKeys: 10,
  maxPropArrayLength: 10,
});

addDecorator((story) => {
  const storyKind = story();
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div style={{ width: '60%', maxWidth: 1000, minWidth: 600 }} >
        {storyKind}
      </div>
    </div>
  );
})
addDecorator((story) => {
  const storyKind = story();
  return (
    <ThemeContainer>
      {storyKind}
    </ThemeContainer>
  );
})

setAddon(infoAddon);

function loadStories() {
  require('../stories/index');
  // You can require as many stories as you need.
}
configure(loadStories, module);