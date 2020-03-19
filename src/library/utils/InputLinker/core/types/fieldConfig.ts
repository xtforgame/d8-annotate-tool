/* eslint-disable no-underscore-dangle, react/no-this-in-sfc, no-param-reassign */
import {
  FieldName,
  FieldProps,
} from './commonTypes';

import {
  IFieldLink,
  HandledByPropsInConfig,
  LinkMiddleware,
  RenderCtx,
  PreRenderCtx,
  InputOnChange,
  OnValidateErrorFunction,
} from './fieldLinkInterfaces';

import {
  ConfigConverter,
  MergeChildrenFunction,
  ValidateFunction,
} from './shared';

// =================

export type EvaluateConfigFunction<FieldObjectConfig> = (
  cfg : FieldObjectConfig,
) => FieldObjectConfig;
export type FinalFieldConfig<ObjectConfig> = ObjectConfig
  | EvaluateConfigFunction<ObjectConfig>;
export type ConfigCreator<ObjectConfig> = (
  ...args : any[]
) => FinalFieldConfig<ObjectConfig>;
export type ConfigNonStringPreset<ObjectConfig> = FinalFieldConfig<ObjectConfig>;

export type ConfigPreset<ObjectConfig> = string
 | any[]
 | ConfigNonStringPreset<ObjectConfig>;

export type CfgMiddlewares<ObjectConfig> = {
  before?: (FinalFieldConfig<ObjectConfig>)[] | (FinalFieldConfig<ObjectConfig>);
  after?: (FinalFieldConfig<ObjectConfig>)[] | (FinalFieldConfig<ObjectConfig>);
  last?: (FinalFieldConfig<ObjectConfig>)[] | (FinalFieldConfig<ObjectConfig>);
};

export type FieldObjectConfig<FieldLink extends IFieldLink<FieldLink>> = {
  // nonProps (static)
  converter?: ConfigConverter<FieldLink>; // converter : Converter<FieldLink>;

  name?: FieldName;
  data?: any;
  preset?: ConfigPreset<FieldObjectConfig<FieldLink>>;
  presets?: (ConfigPreset<FieldObjectConfig<FieldLink>>)[];
  evaluate?: EvaluateConfigFunction<FieldObjectConfig<FieldLink>>;
  handledByProps?: HandledByPropsInConfig<FieldLink>;
  ignoredFromOutputs?: boolean;

  cfgMiddlewares?: CfgMiddlewares<FieldObjectConfig<FieldLink>>;
  options?: any;
  onChange?: InputOnChange<FieldLink>;
  onValidateError?: OnValidateErrorFunction<FieldLink>;

  mergeChildren?: MergeChildrenFunction<FieldLink>;

  validate?: ValidateFunction<FieldLink>;

  // nonProps (dynamic)
  component?: any;
  shouldRender?: boolean;

  // nonProps (undecided)
  defaultValue?: any; // defaultValue => initValue
  childLinks?: (ConfigNonStringPreset<FieldObjectConfig<FieldLink>>)[];
  childElements?: (ConfigNonStringPreset<FieldObjectConfig<FieldLink>>)[];

  // props (undecided)
  props?: FieldProps; // props: FieldProps;

  // other
  mwRenderArray?: LinkMiddleware<RenderCtx<FieldLink>>[];
  mwPreRenderArray?: LinkMiddleware<PreRenderCtx<FieldLink>>[];

  // extras
  mwRender?: LinkMiddleware<RenderCtx<FieldLink>> | LinkMiddleware<RenderCtx<FieldLink>>[];
  mwPreRender?: LinkMiddleware<PreRenderCtx<FieldLink>> | LinkMiddleware<PreRenderCtx<FieldLink>>[];

  extraConverter?: ConfigConverter<FieldLink>;
  extraProps?: FieldProps;
  extraOptions?: any;

  extraChildLinks?: (ConfigNonStringPreset<FieldObjectConfig<FieldLink>>)[];
  extraChildElements?: (ConfigNonStringPreset<FieldObjectConfig<FieldLink>>)[];

  // mwPreRenderArray: [],
  // mwRenderArray: [],
  // [s : string] : any;
};

export type FieldConfig<
  FieldLink extends IFieldLink<FieldLink>
> = ConfigNonStringPreset<FieldObjectConfig<FieldLink>>;

export type IlPreset<
  FieldLink extends IFieldLink<FieldLink>
> = ConfigPreset<FieldObjectConfig<FieldLink>>;

export type IlPresetMap<
  FieldLink extends IFieldLink<FieldLink>
> = { [s : string] : FieldConfig<FieldLink> };
