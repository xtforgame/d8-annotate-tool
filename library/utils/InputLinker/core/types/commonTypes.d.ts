export declare const ExtraChildren: unique symbol;
export declare type IlHost = any;
export declare type HostProps = {
    [s: string]: any;
};
export declare type FieldProps = {
    [ExtraChildren]?: any;
    [s: string]: any;
};
export declare type FieldNonProps = {
    [s: string]: any;
};
export declare type FieldValue = any;
export declare type FieldNormalizedValue = any;
export declare type RawEventArgs = any[];
export declare enum StateMode {
    State = "state",
    Hook = "hook"
}
export declare type FieldName = string;
export declare type FieldKey = string;
export declare type FieldUniqueName = string;
export declare type ValidateError = any;
export interface ValueInfo {
    value: FieldValue;
    rawArgs: RawEventArgs;
}
export declare type ValidReactElement = JSX.Element | undefined;
