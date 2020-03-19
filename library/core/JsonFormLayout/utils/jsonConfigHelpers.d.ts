import { IFieldLink, IInputLinker } from '~/utils/InputLinker/core/interfaces';
import { JsonFormConfig, NormalizedJsonFormConfig } from '../interfaces';
export declare const normalizeJsonConfig: <FieldLink extends IFieldLink<FieldLink>, LinkerType extends IInputLinker<FieldLink>>(json: JsonFormConfig<FieldLink, LinkerType>) => NormalizedJsonFormConfig<FieldLink, LinkerType>;
export declare const formFunctionNameList: string[];
export declare const buildJsonConfig: <FieldLink extends IFieldLink<FieldLink>, LinkerType extends IInputLinker<FieldLink>>(jsonConfig: JsonFormConfig<FieldLink, LinkerType>) => Promise<void>;
