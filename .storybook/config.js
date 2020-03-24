import React from 'react';
import { configure, setAddon, addDecorator, addParameters } from '@storybook/react';
import { withOptions } from '@storybook/addon-options';
import { withKnobs } from '@storybook/addon-knobs';
import { withInfo } from '@storybook/addon-info';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { withAzrmuiTheme, ThemeContainer } from './custom-addons/theme';

withOptions({
  name: 'Azrmui',
  url: 'localhost:9001',
});

addDecorator(withKnobs);
addDecorator(withInfo);
addDecorator(withAzrmuiTheme);

// addDecorator((story) => {
//   const storyKind = story();
//   return (
//     <div style={{ display: 'flex', justifyContent: 'center' }}>
//       <div style={{ width: '60%', maxWidth: 1000, minWidth: 600 }} >
//         {storyKind}
//       </div>
//     </div>
//   );
// })
addDecorator((story) => {
  const storyKind = story();
  return (
    <ThemeContainer>
      {storyKind}
    </ThemeContainer>
  );
})

addParameters({
  info: {
    disable: true,
    // inline: true,
    // propTables: false,
    // header: false,
    // maxPropObjectKeys: 10,
    // maxPropArrayLength: 10,
  },
  viewport: {
    viewports: {
      ...INITIAL_VIEWPORTS,
      // desktop: {
      //   name: 'Responsive',
      //   styles: {
      //     width: '100%',
      //     height: '100%',
      //   },
      // },
      // iphone5: {
      //   name: 'iPhone5',
      //   styles: {
      //     width: '320px',
      //     height: '568px',
      //   },
      // },
      // iphone6: {
      //   name: 'iPhone6',
      //   styles: {
      //     width: '375px',
      //     height: '667px',
      //   },
      // },
      // iphonex: {
      //   name: 'iPhoneX',
      //   styles: {
      //     width: '375px',
      //     height: '812px',
      //   },
      // },
      // ipad: {
      //   name: 'iPad',
      //   styles: {
      //     width: '768px',
      //     height: '1024px',
      //   },
      // }
    },
    // defaultViewport: 'iphone6',
  },
  azrmuiTheme: {}
});

configure(() => {
  require('../stories/index');
  // You can require as many stories as you need.
}, module);
