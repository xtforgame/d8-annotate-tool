/* eslint-disable no-underscore-dangle, react/no-this-in-sfc, no-param-reassign */
import {
  ProxyTypeName,
  IlHost,
  LinkInfoBasic,
  IFieldLink,
  IInputLinker,
  ProxySetter,
  FieldName,
  FieldValue,
  RawEventArgs,
} from '../interfaces';

export default class StateProxyPropsProxy<FieldLink extends IFieldLink<FieldLink>, InputLinker extends IInputLinker<FieldLink>> {
  type : ProxyTypeName;
  link : FieldLink;
  linker : InputLinker;

  constructor(type : ProxyTypeName, link : FieldLink) {
    this.type = type;
    this.link = link;
    this.linker = this.link.linker;
  }

  get host() {
    return this.linker.host;
  }

  _getUpdatedState = (prevState : any, fieldName : FieldName, value : FieldValue) => ({
    [this.linker.sliceNameInState[this.type]]: {
      ...this.linker.getDataFromSlice(this.type, prevState),
      [fieldName]: value,
    },
  });

  getValue = () => this.linker.getDataFromSliceByName(this.type, this.link.name);

  setValue = (value : FieldValue, rawArgs : RawEventArgs) => this.host.setState((prevState : any) => this._getUpdatedState(prevState, this.link.name, value));
}
