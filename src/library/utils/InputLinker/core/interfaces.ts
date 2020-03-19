/* eslint-disable no-underscore-dangle, react/no-this-in-sfc, no-param-reassign */
export * from './types/commonTypes';
export * from './types/proxyTypes';
export * from './types/fieldLinkInterfaces';
export * from './types/shared';
export * from './types/fieldConfig';

import {
  FieldName,
  FieldValue,
  FieldNormalizedValue,

  HostProps,
  RawEventArgs,

  StateMode,

  ValidReactElement,
  IlHost,
} from './types/commonTypes';

import {
  ProxyTypeName,
  ValueProxy,
  SliceName,
} from './types/proxyTypes';

import {
  IFieldLink,
  ValidateResult,
} from './types/fieldLinkInterfaces';

import {
  IlPresetMap,
  IlPreset,
  FieldObjectConfig,
  FieldConfig,
} from './types/fieldConfig';

export interface IFieldLinkClass {
  new <
    FieldLink extends IFieldLink<FieldLink>,
    InputLinker extends IInputLinker<FieldLink>
  >(linker : InputLinker, config : any): FieldLink;
}

export interface ValueProxyClass {
  new <
    FieldLink extends IFieldLink<FieldLink>,
    InputLinker extends IInputLinker<FieldLink>
  >(type : ProxyTypeName, linker : FieldLink): ValueProxy;
}

export interface ProxyAndSliceName {
  proxyName: ProxyTypeName;
  sliceName: SliceName;
}

export type PendingChange<
  FieldLink extends IFieldLink<FieldLink>
> = {
  value : FieldValue,
  rawArgs : RawEventArgs,
  link : FieldLink,
};

export type PendingChangeCallback<
  FieldLink extends IFieldLink<FieldLink>
> = Function;

export interface PendingChanges<
  FieldLink extends IFieldLink<FieldLink>
> {
  changes : PendingChange<FieldLink>[];
  nextTick?: number;
  cb?: PendingChangeCallback<FieldLink>;
}

export interface ConfigWithLastQueue<FieldLink extends IFieldLink<FieldLink>> {
  config: FieldObjectConfig<FieldLink>;
  lastQueue : any[];
}

export type LinkerNamespace = string;

export interface IInputLinker<FieldLink extends IFieldLink<FieldLink>> {
  host : any;
  options : any;

  stateMode : StateMode;
  namespace : LinkerNamespace;

  proxyAndSliceNames : ProxyAndSliceName[];

  sliceNameInState : { [s : string] : any };

  presets : IlPresetMap<FieldLink>;

  ignoredUndefinedFromOutputs : boolean;

  FieldLink : IFieldLinkClass;

  fieldLinks : FieldLink[];

  fieldMap : { [s : string] : FieldLink };

  customData : any;

  // =====

  hostProps : HostProps;

  // ====

  resetDirtyFlags : (flag?: boolean) => void;

  onFieldValueChange : (
    field : FieldLink, value : FieldValue, rawArgs : RawEventArgs, linkInfo : any,
  ) => void;

  addPendingChange : (cb : PendingChangeCallback<FieldLink>, change : PendingChange<FieldLink>) => void;

  resolvePendingChanges : () => void;

  getUniqueName : () => string;

  getPreset : (preset : IlPreset<FieldLink>) => FieldConfig<FieldLink>;

  evaluateConfig : (
    configWithQueue: ConfigWithLastQueue<FieldLink>,
    evaluatingConfig: FieldConfig<FieldLink>,
  ) => ConfigWithLastQueue<FieldLink>;

  add : (...configs : FieldConfig<FieldLink>[]) => void;

  setDefaultValues : (defaultValues : { [s : string] : FieldValue }) => void;

  getField : (fieldName : FieldName) => FieldLink | void;

  getFields : () => { [s : string] : FieldLink };

  getValue : (fieldName : FieldName) => FieldValue;

  getNormalizedValue : (fieldName : FieldName) => FieldNormalizedValue;

  getValues : () => { [s : string] : FieldValue };

  getNormalizedValues : () => { [s : string] : FieldNormalizedValue };

  getOutput : (fieldName : FieldName) => FieldValue;

  getOutputs : () => { [s : string] : FieldValue };

  getDataFromSlice : (sliceName : SliceName, prevState : any) => any;

  getDataFromSliceByName : (
    sliceName : SliceName, fieldName : FieldName, state?: any,
  ) => FieldValue;

  changeValue : (fieldName : FieldName, value : FieldValue) => void;

  changeValues : (changeMap : { [s : string] : FieldValue }) => void;

  validate : () => ValidateResult;

  getErrorStatus : (fieldName : FieldName) => any;

  renderProps : (fieldName : FieldName, options : any) => any;

  renderComponent : (fieldName : FieldName, options : any) => ValidReactElement;

  // for component only
  mergeInitState : (state : any) => any;

  // for hook only
  updateHost : (host : IlHost) => void;
}

export interface IInputLinkerClass<
  FieldLink extends IFieldLink<FieldLink>,
  InputLinker extends IInputLinker<FieldLink>
> {
  new <
    FieldLink extends IFieldLink<FieldLink>
  >(host : any, options : any): InputLinker;
}
