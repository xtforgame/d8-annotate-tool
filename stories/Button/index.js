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
  .add('SuccessButton',
    withInfo()(()=>(
      <FlexRow>
        <FlexColumn>
          <SuccessButton onClick={null} style={{ marginBottom: 16 }} size="large" >{text('Label','Button')}</SuccessButton>
          <SuccessButton onClick={null} variant="outlined" style={{ marginBottom: 16 }} size="large" >{text('Label','Button')}</SuccessButton>
          <SuccessButton onClick={null} variant="text" style={{ marginBottom: 16 }} size="large" >{text('Label','Button')}</SuccessButton>
        </FlexColumn>
        <FlexColumn>
          <SuccessButton onClick={null} style={{ marginBottom: 16 }} >{text('Label','Button')}</SuccessButton>
          <SuccessButton onClick={null} variant="outlined" style={{ marginBottom: 16 }} >{text('Label','Button')}</SuccessButton>
          <SuccessButton onClick={null} variant="text" style={{ marginBottom: 16 }} >{text('Label','Button')}</SuccessButton>
        </FlexColumn>
        <FlexColumn>
          <SuccessButton onClick={null} style={{ marginBottom: 16 }} size="small" >{text('Label','Button')}</SuccessButton>
          <SuccessButton onClick={null} variant="outlined" style={{ marginBottom: 16 }} size="small" >{text('Label','Button')}</SuccessButton>
          <SuccessButton onClick={null} variant="text" style={{ marginBottom: 16 }} size="small" >{text('Label','Button')}</SuccessButton>
        </FlexColumn>
        <FlexColumn>
          <SuccessButton onClick={null} style={{ marginBottom: 16 }} size="large" >{text('Label','Button')}</SuccessButton>
          <SuccessButton onClick={null} style={{ marginBottom: 16 }} >{text('Label','Button')}</SuccessButton>
          <SuccessButton onClick={null} style={{ marginBottom: 16 }} size="small" >{text('Label','Button')}</SuccessButton>
        </FlexColumn>
        <FlexColumn>
          <SuccessButton onClick={null} variant="outlined" style={{ marginBottom: 16 }} size="large" >{text('Label','Button')}</SuccessButton>
          <SuccessButton onClick={null} variant="outlined" style={{ marginBottom: 16 }} >{text('Label','Button')}</SuccessButton>
          <SuccessButton onClick={null} variant="outlined" style={{ marginBottom: 16 }} size="small" >{text('Label','Button')}</SuccessButton>
        </FlexColumn>
        <FlexColumn>
          <SuccessButton onClick={null} variant="text" style={{ marginBottom: 16 }} size="large" >{text('Label','Button')}</SuccessButton>
          <SuccessButton onClick={null} variant="text" style={{ marginBottom: 16 }} >{text('Label','Button')}</SuccessButton>
          <SuccessButton onClick={null} variant="text" style={{ marginBottom: 16 }} size="small" >{text('Label','Button')}</SuccessButton>
        </FlexColumn>
      </FlexRow>
    ))
  );