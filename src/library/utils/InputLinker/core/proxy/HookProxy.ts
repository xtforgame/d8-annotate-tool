/* eslint-disable no-underscore-dangle, react/no-this-in-sfc, no-param-reassign */
import {
  ProxyTypeName,
  IlHost,
  IFieldLink,
  IInputLinker,
  ProxySetter,
  FieldName,
  FieldValue,
} from '../interfaces';

export default class StateProxy<FieldLink extends IFieldLink<FieldLink>, InputLinker extends IInputLinker<FieldLink>> {
  type : ProxyTypeName;
  link : FieldLink;
  linker : InputLinker;
  setter : (value : FieldValue) => void;

  constructor(type : ProxyTypeName, link : FieldLink) {
    this.type = type;
    this.link = link;
    this.linker = this.link.linker;

    this.setter = () => {};
  }

  get host() : IlHost {
    return this.linker.host;
  }

  _getUpdatedState = (prevState : any, fieldName : FieldName, value : FieldValue) => ({
    [this.linker.sliceNameInState[this.type]]: {
      ...this.linker.getDataFromSlice(this.type, prevState),
      [fieldName]: value,
    },
  })

  updateSetter = (setter : (value : FieldValue) => void) => (this.setter = setter);

  getValue = () => this.linker.getDataFromSliceByName(this.type, this.link.name);

  setValue = (value : FieldValue, rawArgs : any[]) => this.setter(value);
}
