import { IFieldLink, IInputLinker, LinkerNamespace, IlPreset, FieldName } from '~/utils/InputLinker/core/interfaces';
import { ResetLinkerFunction } from '~/utils/InputLinker/core/useInputLinker';
import { Env, ModuleMetadata } from '~/utils/amd-light/index';
import { ValidateResult, PendingChange, FieldValue, RawEventArgs } from '~/utils/InputLinker';
import RenderSession from './core/RenderSession';
// import { OnSubmitFunction } from '~/hooks/useLayoutFeatures';

export type BasicValidateFunction = (keepErrors?: boolean) => ValidateResult;

export type OnChangeFunction<
  FieldLink extends IFieldLink<FieldLink>,
  LinkerType extends IInputLinker<FieldLink>
> = (
  value: FieldValue,
  rawArgs: RawEventArgs,
  linker: LinkerType,
  values: any,
) => any;

export type OnChangesFunction<
  FieldLink extends IFieldLink<FieldLink>,
  LinkerType extends IInputLinker<FieldLink>
> = (
  changes: PendingChange<FieldLink>[],
  linker: LinkerType,
  values: any,
) => any;

export type OnSubmitFunction<
  FieldLink extends IFieldLink<FieldLink>,
  LinkerType extends IInputLinker<FieldLink>
> = (
  outputs: { [s : string] : any },
  options: {
    linker: LinkerType,
    resetIl: ResetLinkerFunction<FieldLink, LinkerType>;
    // [s : string] : any;
  },
) => any;

export type OnDidMountFunction<
  FieldLink extends IFieldLink<FieldLink>,
  LinkerType extends IInputLinker<FieldLink>
> = (
  linker: LinkerType,
) => any;

export type JsonFormFieldTypeName = string;
export type JsonFormModules = { [s : string]: string | ModuleMetadata };

export type RenderFunctionBase<
  FieldLink extends IFieldLink<FieldLink>,
  LinkerType extends IInputLinker<FieldLink>
> = (
  rs : RenderSession<FieldLink, LinkerType>,
  envs: {
    $dirtyMap: { [s : string]: boolean };
    $inputChanged: boolean;
  },
) => any;

export type PreRenderFunction<
  FieldLink extends IFieldLink<FieldLink>,
  LinkerType extends IInputLinker<FieldLink>
> = RenderFunctionBase<FieldLink, LinkerType>;

export type GlobalValidatorFunction<
  FieldLink extends IFieldLink<FieldLink>,
  LinkerType extends IInputLinker<FieldLink>
> = (
  envs: {
    linker: LinkerType;
    validate: BasicValidateFunction;
  },
) => any;

export type NormalizeInitValuesFunction<
  FieldLink extends IFieldLink<FieldLink>,
  LinkerType extends IInputLinker<FieldLink>
> = (
  linker: LinkerType,
) => any;

// =================

export type JsonFormConfigField<
  FieldLink extends IFieldLink<FieldLink>,
  LinkerType extends IInputLinker<FieldLink>
> = {
  name: FieldName;
  type: JsonFormFieldTypeName;
  preset?: IlPreset<FieldLink>;
  presets?: IlPreset<FieldLink>[];
  extraProps?: any;
  extraOptions?: any;
  defaultValue?: any;
};

export type JsonFormConfig<
  FieldLink extends IFieldLink<FieldLink>,
  LinkerType extends IInputLinker<FieldLink>
> = {
  namespace?: LinkerNamespace;
  fields: JsonFormConfigField<FieldLink, LinkerType>[];
  amdEnv?: Env;
  modules?: JsonFormModules;
  preRender?: PreRenderFunction<FieldLink, LinkerType>;
  globalValidator?: GlobalValidatorFunction<FieldLink, LinkerType>;
  normalizeInitValues?: NormalizeInitValuesFunction<FieldLink, LinkerType>;
  // [s : string] : any;
};

export type JsonFormProps<
  FieldLink extends IFieldLink<FieldLink>,
  LinkerType extends IInputLinker<FieldLink>
> = {
  jsonConfig: JsonFormConfig<FieldLink, LinkerType>;
  onSubmit?: OnSubmitFunction<FieldLink, LinkerType>;
  onDidMount?: OnDidMountFunction<FieldLink, LinkerType>;
  onChange?: OnChangeFunction<FieldLink, LinkerType>;
  onChanges?: OnChangesFunction<FieldLink, LinkerType>;
  [s : string] : any;
};

export type NormalizedJsonFormConfigField<
  FieldLink extends IFieldLink<FieldLink>,
  LinkerType extends IInputLinker<FieldLink>
> = {
  presets?: IlPreset<FieldLink>[];
};

export type NormalizedJsonFormConfig<
  FieldLink extends IFieldLink<FieldLink>,
  LinkerType extends IInputLinker<FieldLink>
> = {
  namespace?: LinkerNamespace,
  fields: NormalizedJsonFormConfigField<FieldLink, LinkerType>[];
  amdEnv?: Env;
  modules?: JsonFormModules;
  preRender: PreRenderFunction<FieldLink, LinkerType>;
  globalValidator: GlobalValidatorFunction<FieldLink, LinkerType>;
  normalizeInitValues: NormalizeInitValuesFunction<FieldLink, LinkerType>;
  // [s : string] : any;
};

export type NormalizedJsonFormProps<
  FieldLink extends IFieldLink<FieldLink>,
  LinkerType extends IInputLinker<FieldLink>
> = {
  jsonConfig: NormalizedJsonFormConfig<FieldLink, LinkerType>;
  onSubmit?: OnSubmitFunction<FieldLink, LinkerType>;
  onDidMount?: OnDidMountFunction<FieldLink, LinkerType>;
  onChange?: OnChangeFunction<FieldLink, LinkerType>;
  onChanges?: OnChangesFunction<FieldLink, LinkerType>;
  [s : string] : any;
};
