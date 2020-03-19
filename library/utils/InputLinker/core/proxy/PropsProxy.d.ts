import { ProxyTypeName, IFieldLink, IInputLinker, FieldName, HandledByProps, RawEventArgs } from '../interfaces';
export default class PropsProxy<FieldLink extends IFieldLink<FieldLink>, InputLinker extends IInputLinker<FieldLink>> {
    type: ProxyTypeName;
    link: FieldLink;
    linker: InputLinker;
    name: FieldName;
    handledByProps: HandledByProps<FieldLink>;
    constructor(type: ProxyTypeName, link: FieldLink);
    get host(): any;
    getValue: () => any;
    setValue: (value: any, rawArgs: RawEventArgs) => any;
}
