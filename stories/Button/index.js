import React from 'react';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';
import { withInfo } from '@storybook/addon-info';
import SuccessButton from 'library/core/Buttons/SuccessButton';

import {
  FlexRow,
  FlexColumn,
} from '../shared';

storiesOf('Buttons', module)
  // .addParameters({
  //   info: {
  //     inline: true,
  //     propTables: false,
  //     header: false,
  //     maxPropObjectKeys: 10,
  //     maxPropArrayLength: 10,
  //   },
  // })
  .add('SuccessButton',
    ()=>(
      <div style={{ margin: 16 }}>
        <FlexRow>
          <FlexColumn>
            <SuccessButton onClick={null} style={{ marginBottom: 16 }} size="large" >{text('Text','Button')}</SuccessButton>
            <SuccessButton onClick={null} variant="outlined" style={{ marginBottom: 16 }} size="large" >{text('Text','Button')}</SuccessButton>
            <SuccessButton onClick={null} variant="text" style={{ marginBottom: 16 }} size="large" >{text('Text','Button')}</SuccessButton>
          </FlexColumn>
          <FlexColumn>
            <SuccessButton onClick={null} style={{ marginBottom: 16 }} >{text('Text','Button')}</SuccessButton>
            <SuccessButton onClick={null} variant="outlined" style={{ marginBottom: 16 }} >{text('Text','Button')}</SuccessButton>
            <SuccessButton onClick={null} variant="text" style={{ marginBottom: 16 }} >{text('Text','Button')}</SuccessButton>
          </FlexColumn>
          <FlexColumn>
            <SuccessButton onClick={null} style={{ marginBottom: 16 }} size="small" >{text('Text','Button')}</SuccessButton>
            <SuccessButton onClick={null} variant="outlined" style={{ marginBottom: 16 }} size="small" >{text('Text','Button')}</SuccessButton>
            <SuccessButton onClick={null} variant="text" style={{ marginBottom: 16 }} size="small" >{text('Text','Button')}</SuccessButton>
          </FlexColumn>
          <FlexColumn>
            <SuccessButton onClick={null} style={{ marginBottom: 16 }} size="large" >{text('Text','Button')}</SuccessButton>
            <SuccessButton onClick={null} style={{ marginBottom: 16 }} >{text('Text','Button')}</SuccessButton>
            <SuccessButton onClick={null} style={{ marginBottom: 16 }} size="small" >{text('Text','Button')}</SuccessButton>
          </FlexColumn>
          {/* <FlexColumn>
            <SuccessButton onClick={null} variant="outlined" style={{ marginBottom: 16 }} size="large" >{text('Text','Button')}</SuccessButton>
            <SuccessButton onClick={null} variant="outlined" style={{ marginBottom: 16 }} >{text('Text','Button')}</SuccessButton>
            <SuccessButton onClick={null} variant="outlined" style={{ marginBottom: 16 }} size="small" >{text('Text','Button')}</SuccessButton>
          </FlexColumn>
          <FlexColumn>
            <SuccessButton onClick={null} variant="text" style={{ marginBottom: 16 }} size="large" >{text('Text','Button')}</SuccessButton>
            <SuccessButton onClick={null} variant="text" style={{ marginBottom: 16 }} >{text('Text','Button')}</SuccessButton>
            <SuccessButton onClick={null} variant="text" style={{ marginBottom: 16 }} size="small" >{text('Text','Button')}</SuccessButton>
          </FlexColumn> */}
        </FlexRow>
      </div>
    )
  );