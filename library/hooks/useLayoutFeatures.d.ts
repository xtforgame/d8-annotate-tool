import { IFieldLink, IInputLinker } from '~/utils/InputLinker/core/interfaces';
export declare const defaultIlOnInit: <FieldLink extends IFieldLink<FieldLink>, LinkerType extends IInputLinker<FieldLink>>(props: any) => (il: LinkerType) => void;
export declare type OnSubmitFunction<LinkerType> = (outputs: {
    [s: string]: any;
}, il: LinkerType) => any;
export declare type LayoutFeatureProps<LinkerType> = {
    onSubmit?: OnSubmitFunction<LinkerType>;
    [s: string]: any;
};
declare const _default: <FieldLink extends IFieldLink<FieldLink>, LinkerType extends IInputLinker<FieldLink>>(props: LayoutFeatureProps<LinkerType>, ilOnInit?: Function | undefined) => {
    classesByNs: any;
    tData: any;
    host: {
        handleSubmit: () => {
            outputs: {
                [s: string]: any;
            };
            linker: LinkerType;
        } | null;
        props: {
            classesByNs: any;
            onSubmit?: OnSubmitFunction<LinkerType> | undefined;
        };
    };
    il: LinkerType;
    setIl: import("react").Dispatch<import("react").SetStateAction<LinkerType>>;
    resetIl: import("../utils/InputLinker/core/useInputLinker").ResetLinkerFunction<FieldLink, LinkerType>;
};
export default _default;
