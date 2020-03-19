import { FieldValue, RawEventArgs, IlHost } from './commonTypes';
export declare enum ProxyMode {
    State = "state",
    Hook = "hook",
    Props = "props"
}
export declare enum ProxyTypeName {
    Value = "value",
    Error = "error",
    CustomState = "customState"
}
export declare type SliceName = ProxyTypeName;
export declare type ProxyType = {
    name: ProxyTypeName;
    defaultSliceName?: string;
};
export declare type ProxySetter = (value: FieldValue, rawArgs: RawEventArgs) => void;
export interface ValueProxy {
    host: IlHost;
    updateSetter?: (value: FieldValue) => void;
    getValue: () => FieldValue;
    setValue: ProxySetter;
}
