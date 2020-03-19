import { ProxyTypeName, IFieldLink, IInputLinker, RawEventArgs } from '../interfaces';
export default class StateProxyPropsProxy<FieldLink extends IFieldLink<FieldLink>, InputLinker extends IInputLinker<FieldLink>> {
    type: ProxyTypeName;
    link: FieldLink;
    linker: InputLinker;
    constructor(type: ProxyTypeName, link: FieldLink);
    get host(): any;
    _getUpdatedState: (prevState: any, fieldName: string, value: any) => {
        [x: number]: any;
    };
    getValue: () => any;
    setValue: (value: any, rawArgs: RawEventArgs) => any;
}
