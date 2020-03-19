/* eslint-disable no-underscore-dangle, react/no-this-in-sfc, no-param-reassign */
import { useState } from 'react';
import { IFieldLink, IInputLinker, IInputLinkerClass } from './interfaces';

export type CallbackType = (il : any, createOptions : any) => any;
export type ResetLinkerFunction<
  FieldLink extends IFieldLink<FieldLink>,
  LinkerType extends IInputLinker<FieldLink>
> = (resetOptions?: any) => LinkerType;

const ilCreator = <
  FieldLink extends IFieldLink<FieldLink>,
  LinkerType extends IInputLinker<FieldLink>
>(
  host : any,
  Linker: IInputLinkerClass<FieldLink, LinkerType>,
  options : { },
  createOptions : any = {},
  cb : CallbackType = () => undefined,
) => () => {
  const {
    ...rest
  } = options;
  const il : LinkerType = new Linker<FieldLink>(
    host, { ...rest, stateMode: 'hook' },
  );
  cb(il, createOptions);
  return il;
};

export default <
  FieldLink extends IFieldLink<FieldLink>,
  LinkerType extends IInputLinker<FieldLink>
>(
  host : any,
  Linker: IInputLinkerClass<FieldLink, LinkerType>,
  options : any,
  cb: CallbackType
) => {
  const [il, setIl] = useState(ilCreator<FieldLink, LinkerType>(host, Linker, options, { reset: false }, cb));

  const resetIl : ResetLinkerFunction<FieldLink, LinkerType> = (resetOptions: any = {}) => {
    if (resetOptions.defaultValues) {
      il.setDefaultValues(resetOptions.defaultValues);
    }
    if (!resetOptions.ignoreResetValues) {
      const changeMap : any = {};
      Object.values(il.fieldMap).forEach((f) => {
        changeMap[f.name] = f.defaultValue;
        f.setError(undefined, []);
      });
      il.changeValues(changeMap);
    }
    const newIl = ilCreator<FieldLink, LinkerType>(host, options, { ...resetOptions, reset: true }, cb)();
    setIl(newIl);
    return newIl;
  };

  return {
    il,
    setIl,
    resetIl,
  };
};
