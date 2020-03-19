import { IFieldLink, IInputLinker, LinkerNamespace } from '~/utils/InputLinker/core/interfaces';
import { RsBeforeRender, RsAfterRender } from './core/RenderSession';
import { JsonFormProps, OnDidMountFunction } from './interfaces';
export declare type PropsEx<FieldLink extends IFieldLink<FieldLink>, LinkerType extends IInputLinker<FieldLink>> = {
    namespace: LinkerNamespace;
    rsBeforeRender: RsBeforeRender<FieldLink, LinkerType>;
    rsAfterRender: RsAfterRender<FieldLink, LinkerType>;
    onDidMount: OnDidMountFunction<FieldLink, LinkerType>;
    [s: string]: any;
};
declare const _default: <FieldLink extends IFieldLink<FieldLink>, LinkerType extends IInputLinker<FieldLink>>(props: JsonFormProps<FieldLink, LinkerType>) => {
    jsonConfig: import("./interfaces").NormalizedJsonFormConfig<FieldLink, LinkerType>;
    propsEx: PropsEx<FieldLink, LinkerType>;
};
export default _default;
