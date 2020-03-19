import { IFieldLink, IInputLinker, IlHost } from '~/utils/InputLinker/core/interfaces';
export default class RenderSession<FieldLink extends IFieldLink<FieldLink>, LinkerType extends IInputLinker<FieldLink>> {
    parent: RenderSession<FieldLink, LinkerType> | void;
    name: any;
    linker: LinkerType;
    host: IlHost;
    state: string;
    options: any;
    prevRenderSession: RenderSession<FieldLink, LinkerType> | void;
    [s: string]: any;
    constructor(parent: RenderSession<FieldLink, LinkerType> | void, name: any, linker: LinkerType, host: IlHost, options?: any);
    beforeRender(): void;
    afterRender(): void;
}
export declare type RsEventHandler<FieldLink extends IFieldLink<FieldLink>, LinkerType extends IInputLinker<FieldLink>> = (rs: RenderSession<FieldLink, LinkerType>) => any;
export declare type RsBeforeRender<FieldLink extends IFieldLink<FieldLink>, LinkerType extends IInputLinker<FieldLink>> = RsEventHandler<FieldLink, LinkerType>;
export declare type RsAfterRender<FieldLink extends IFieldLink<FieldLink>, LinkerType extends IInputLinker<FieldLink>> = RsEventHandler<FieldLink, LinkerType>;
