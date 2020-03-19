/* eslint-disable jsx-a11y/label-has-associated-control, no-underscore-dangle */
import React from 'react';
import { FormSpace } from '~/core/FormInputs';
import { toArray } from '~/utils/InputLinker';
import { createDefaultContainer } from '~/utils/InputLinker/helpers';

const defaultGetSpace = ({ key }) => <FormSpace key={key} variant="content2" />;
export default class ContainerConfig {
  constructor(children, presets, getSpace = defaultGetSpace) {
    this._children = toArray(children);
    this.getSpace = getSpace;
    this.presets = [createDefaultContainer(this.getSpace)(this._children), ...toArray(presets)];
  }
}
