/* eslint-disable no-param-reassign */
import { IFieldLink, IInputLinker, FieldValue, FieldConfig, IlPreset } from '~/utils/InputLinker/core/interfaces';
import { JsonFormConfig, NormalizedJsonFormConfig } from '../interfaces';
import { createEnv } from '~/utils/amd-light';
import {
  toArray,
} from '~/utils/InputLinker';

export const normalizeJsonConfig = <
  FieldLink extends IFieldLink<FieldLink>,
  LinkerType extends IInputLinker<FieldLink>
>(json : JsonFormConfig<FieldLink, LinkerType>)
  : NormalizedJsonFormConfig<FieldLink, LinkerType> => {
  if (Array.isArray(json.preRender)) {
    json.preRender = <any>new Function(...json.preRender); // eslint-disable-line no-new-func
  }
  if (Array.isArray(json.globalValidator)) {
    json.globalValidator = <any>new Function(...json.globalValidator); // eslint-disable-line no-new-func
  }
  json.fields.forEach((field) => {
    if (field.type) {
      field.presets = toArray<IlPreset<FieldLink>>(field.type)
      .concat([{ extraOptions: { jflType: field.type } }])
      .concat(toArray(field.preset))
      .concat(toArray(field.presets));
      delete field.type;
      delete field.preset;
    }
  });
  return {
    globalValidator: (() => undefined),
    preRender: (() => undefined),
    normalizeInitValues: (() => undefined),
    ...json,
  };
};

export const formFunctionNameList = [
  'preRender',
  'globalValidator',
  'normalizeInitValues',
];

export const buildJsonConfig = <
  FieldLink extends IFieldLink<FieldLink>,
  LinkerType extends IInputLinker<FieldLink>
>(jsonConfig : JsonFormConfig<FieldLink, LinkerType>) => {
  jsonConfig.amdEnv = createEnv(jsonConfig.modules || {});
  return jsonConfig.amdEnv.build()
  .then(() => {
    formFunctionNameList.forEach((functionName) => {
      const exports = jsonConfig.amdEnv!.getExports(functionName);
      (<any>jsonConfig)[functionName] = exports && exports.default;
    });
  });
};
