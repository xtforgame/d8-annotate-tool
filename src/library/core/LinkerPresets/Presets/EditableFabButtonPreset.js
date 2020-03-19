
/* eslint-disable jsx-a11y/label-has-associated-control, no-underscore-dangle */
import React from 'react';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';
import {
  createIgnoredPreset,
} from '~/utils/InputLinker/helpers';
import {
  EditableConfig,
} from '~/core/LinkerPresets/ConfigCreators';

export default new EditableConfig(
  { presets: [createIgnoredPreset(Fab)] },
  null, ({ link: { host } }) => ({
    color: 'secondary',
    'aria-label': 'edit',
    onClick: host.startEditing,
    children: <EditIcon />,
  }),
  null, ({ link: { host } }) => ({
    color: 'default',
    'aria-label': 'cancel',
    onClick: host.cancelEditing,
    children: <CloseIcon />,
  })
);
