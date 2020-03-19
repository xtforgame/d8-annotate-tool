import {
  FieldValue,
  RawEventArgs,
  IlHost,
} from './commonTypes';

export enum ProxyMode {
  State = 'state',
  Hook = 'hook',
  Props = 'props',
}

export enum ProxyTypeName {
  Value = 'value',
  Error = 'error',
  CustomState = 'customState',
}

export type SliceName = ProxyTypeName;

export type ProxyType = {
  name : ProxyTypeName;
  defaultSliceName?: string;
};

export type ProxySetter = (value : FieldValue, rawArgs : RawEventArgs) => void;

export interface ValueProxy {
  host : IlHost;

  updateSetter?: (value : FieldValue) => void;

  getValue : () => FieldValue;

  setValue : ProxySetter;
}
