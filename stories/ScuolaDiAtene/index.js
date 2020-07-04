import React from 'react';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';
import { withInfo } from '@storybook/addon-info';
import RaphaelPaper from 'library/scuola-di-atene/example';

import {
  FlexRow,
  FlexColumn,
} from '../shared';

storiesOf('ScuolaDiAtene', module)
  // .addParameters({
  //   info: {
  //     inline: true,
  //     propTables: false,
  //     header: false,
  //     maxPropObjectKeys: 10,
  //     maxPropArrayLength: 10,
  //   },
  // })
  .add('ScuolaDiAteneEditor',
    ()=>(
      <div style={{ margin: 16, height: 500 }}>
        <RaphaelPaper />
      </div>
    )
  );