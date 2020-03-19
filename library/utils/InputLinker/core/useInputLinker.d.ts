import { IFieldLink, IInputLinker, IInputLinkerClass } from './interfaces';
export declare type CallbackType = (il: any, createOptions: any) => any;
export declare type ResetLinkerFunction<FieldLink extends IFieldLink<FieldLink>, LinkerType extends IInputLinker<FieldLink>> = (resetOptions?: any) => LinkerType;
declare const _default: <FieldLink extends IFieldLink<FieldLink>, LinkerType extends IInputLinker<FieldLink>>(host: any, Linker: IInputLinkerClass<FieldLink, LinkerType>, options: any, cb: CallbackType) => {
    il: LinkerType;
    setIl: import("react").Dispatch<import("react").SetStateAction<LinkerType>>;
    resetIl: ResetLinkerFunction<FieldLink, LinkerType>;
};
export default _default;
