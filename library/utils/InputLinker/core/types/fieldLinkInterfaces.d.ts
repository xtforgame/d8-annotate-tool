import { FieldName, FieldKey, FieldUniqueName, FieldValue, HostProps, FieldProps, FieldNonProps, RawEventArgs, IlHost, ValidateError, ValueInfo } from './commonTypes';
import { ValueProxy } from './proxyTypes';
export declare type ValidateResult = boolean | Error;
export interface LinkInfoBasic<FieldLink extends IBasicFieldLink> {
    link: FieldLink;
}
export interface LinkInfoHandledByProps<FieldLink extends IBasicFieldLink> extends LinkInfoBasic<FieldLink> {
}
export declare type InputHandledByPropsOnChange<FieldLink extends IBasicFieldLink> = (value: FieldValue, rawArgs: RawEventArgs, link: FieldLink) => any;
export declare type WrappedHandledByPropsOnChangeOnChange<FieldLink extends IBasicFieldLink> = (valueInfo: ValueInfo, linkInfo: LinkInfoHandledByProps<FieldLink>) => any;
export interface HandledByProps<FieldLink extends IBasicFieldLink> {
    value: (linkInfo: LinkInfoHandledByProps<FieldLink>) => any;
    onChange: InputHandledByPropsOnChange<FieldLink> | WrappedHandledByPropsOnChangeOnChange<FieldLink>;
}
export interface HandledByPropsInConfig<FieldLink extends IBasicFieldLink> {
    value: string | ((linkInfo: LinkInfoHandledByProps<FieldLink>) => any);
    onChange: InputHandledByPropsOnChange<FieldLink> | WrappedHandledByPropsOnChangeOnChange<FieldLink>;
}
export declare type HandleChangeFunction = (...rawArgs: any[]) => any;
export declare type InputOnChange<FieldLink extends IBasicFieldLink> = (value: FieldValue, rawArgs: RawEventArgs, linkInfo: LinkInfoBasic<FieldLink>) => any;
export interface OnValidateErrorLinkInfo<FieldLink extends IBasicFieldLink> extends LinkInfoBasic<FieldLink> {
}
export declare type OnValidateErrorFunction<FieldLink extends IBasicFieldLink> = (error: any, linkInfo: OnValidateErrorLinkInfo<FieldLink>) => any;
export interface ICtx {
    props: FieldProps;
    nonProps: FieldNonProps;
    options: any;
}
export interface PreRenderCtx<FieldLink extends IBasicFieldLink> extends ICtx {
    link: FieldLink;
}
export interface RenderCtx<FieldLink extends IBasicFieldLink> extends ICtx {
    value: any;
    link: FieldLink;
    handleChange: HandleChangeFunction;
    validateError: ValidateError;
    options: any;
}
export declare type LinkResult = FieldProps | [FieldProps, FieldNonProps];
export declare type LinkFunctionMiddleware<Ctx extends ICtx> = (ctx: Ctx) => LinkResult;
export declare type LinkMiddleware<Ctx extends ICtx> = LinkFunctionMiddleware<Ctx> | LinkResult;
export interface IBasicFieldLink {
    name: FieldName;
    key: FieldKey;
    uniqueName: FieldUniqueName;
    linker: any;
    config: any;
    childLinks: any[];
    childElements: any[];
    data: any;
    defaultValue: any;
    dirty: boolean;
    ignoredFromOutputs: boolean;
    proxies: {
        [s: string]: ValueProxy;
    };
    host: IlHost;
    hostProps: HostProps;
    options: any;
    getNormalizedValue: () => any;
    getOutput: () => any;
    getViewValue: () => any;
    validate: () => ValidateResult;
    getValue: () => FieldValue;
    setValue: (value: FieldValue, rawArgs: RawEventArgs, clearError: boolean) => void;
    getCustomState: () => any;
    setCustomState: (value: FieldValue, rawArgs: RawEventArgs) => void;
    getError: () => any;
    setError: (value: FieldValue, rawArgs: RawEventArgs) => any;
    addChildLink: (...children: any[]) => any;
    addChildElement: (...children: any[]) => any;
    mergeChildren: (children1: any[], children2: any[], extraLinkInfo: any) => any[] | undefined;
    changeValue: (value: FieldValue, rawArgs: RawEventArgs) => void;
    handleChange: HandleChangeFunction;
    handleExtraChildren: (props: FieldProps) => FieldProps;
    runMiddlewares: <Ctx extends ICtx>(ctx: Ctx, middlewares: LinkMiddleware<Ctx>[]) => Ctx;
    runPreRenderMiddlewares: <FieldLink extends IBasicFieldLink>(ctx: PreRenderCtx<FieldLink>, middlewares?: any) => PreRenderCtx<FieldLink>;
    runRenderMiddlewares: <FieldLink extends IBasicFieldLink>(ctx: RenderCtx<FieldLink>, middlewares?: any) => RenderCtx<FieldLink>;
}
export interface IFieldLink<ThisFieldLink extends IBasicFieldLink> extends IBasicFieldLink {
    handledByProps?: HandledByPropsInConfig<ThisFieldLink>;
    onChange: InputOnChange<ThisFieldLink>;
    onValidateError: OnValidateErrorFunction<ThisFieldLink>;
}
