import React from 'react';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';
import { withInfo } from '@storybook/addon-info';
import CrudFormBasic from './CrudFormBasic';

import {
  FlexRow,
  FlexColumn,
} from '../shared';

console.log('module :', module);
storiesOf('Dialogs', module)
  // .addParameters({
  //   info: {
  //     inline: true,
  //     propTables: false,
  //     header: false,
  //     maxPropObjectKeys: 10,
  //     maxPropArrayLength: 10,
  //   },
  // })
  .add('CrudFormBasic',
    ()=>(
      <div id="xxx">
      <CrudFormBasic />
      </div>
    )
  );