/* eslint-disable no-underscore-dangle, react/no-this-in-sfc, no-param-reassign */
import {
  IFieldLink,
  Converter,
} from './interfaces';

export const toArray = <T = any>(value : any) : T[] => (Array.isArray(value) ? value : [value].filter(i => i));

/*
  nonProps (static):
    name
    data
    preset
    presets
    evaluate
    handledByProps
    ignoredFromOutputs
    cfgMiddlewares
    options
    onChange
    onValidateError
    mergeChildren
    converter
    validate
  nonProps (dynamic):
    component
    shouldRender
  nonProps (undecided):
    defaultValue => initValue
    childLinks
    childElements
*/

const mwDynamicNonProps = [
  'component',
  'shouldRender',
];

export const mwDynamicNonPropsFilter = (nonProps : any, dist : any = {}) => {
  mwDynamicNonProps.forEach((key : any) => {
    if (key in nonProps) {
      dist[key] = nonProps[key];
    }
  });
  return dist;
};

export const createConverter = <FieldLink extends IFieldLink<FieldLink>>(
  converter : any,
) : Converter<FieldLink> => ({
  fromView: (converter && converter.fromView) || (([event]) => event.target.value),
  toView: (converter && converter.toView) || (value => (value != null ? value : '')),
  toOutput: (converter && converter.toOutput) || (value => value),
  normalize: (converter && converter.normalize) || (v => v),
});
