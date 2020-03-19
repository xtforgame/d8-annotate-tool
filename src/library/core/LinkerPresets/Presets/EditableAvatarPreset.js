
/* eslint-disable jsx-a11y/label-has-associated-control, no-underscore-dangle */
import React from 'react';
import AvatarType001 from '~/core/misc/AvatarType001';
import {
  FormImageButtonWithMask,
} from '~/core/FormInputs';
import {
  ExtraChildren,
} from '~/utils/InputLinker';
import {
  EditableConfig,
} from '~/core/LinkerPresets/ConfigCreators';

export default new EditableConfig({
  component: AvatarType001,
  converter: { fromView: ([fileInfo]) => fileInfo.dataURL },
  mwRender: ({ value }) => ({
    image: value,
  }),
}, null, null, null, ({ value, handleChange, link: { uniqueName } }) => ({
  image: value,
  [ExtraChildren]: (
    <FormImageButtonWithMask
      key={`${uniqueName}-img-input-button`}
      id={`${uniqueName}-img-input-button`}
      variant="avatar"
      onLoadEnd={handleChange}
    />
  ),
}));
