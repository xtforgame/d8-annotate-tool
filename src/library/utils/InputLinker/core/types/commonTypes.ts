/* eslint-disable no-underscore-dangle, react/no-this-in-sfc, no-param-reassign */
export const ExtraChildren = Symbol('ExtraChildren');

export type IlHost = any;

export type HostProps = { [s : string] : any };

export type FieldProps = {
  [ExtraChildren]?: any,
  [s : string] : any,
};
export type FieldNonProps = {
  [s : string] : any,
};

export type FieldValue = any;
export type FieldNormalizedValue = any;
export type RawEventArgs = any[];

export enum StateMode {
  State = 'state',
  Hook = 'hook',
}

export type FieldName = string;
export type FieldKey = string;
export type FieldUniqueName = string;

export type ValidateError = any;

export interface ValueInfo {
  value : FieldValue;
  rawArgs : RawEventArgs;
}

export type ValidReactElement = JSX.Element | undefined;
