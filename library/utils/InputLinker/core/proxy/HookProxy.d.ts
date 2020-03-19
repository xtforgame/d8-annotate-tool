import { ProxyTypeName, IlHost, IFieldLink, IInputLinker, FieldValue } from '../interfaces';
export default class StateProxy<FieldLink extends IFieldLink<FieldLink>, InputLinker extends IInputLinker<FieldLink>> {
    type: ProxyTypeName;
    link: FieldLink;
    linker: InputLinker;
    setter: (value: FieldValue) => void;
    constructor(type: ProxyTypeName, link: FieldLink);
    get host(): IlHost;
    _getUpdatedState: (prevState: any, fieldName: string, value: any) => {
        [x: number]: any;
    };
    updateSetter: (setter: (value: any) => void) => (value: any) => void;
    getValue: () => any;
    setValue: (value: any, rawArgs: any[]) => void;
}
