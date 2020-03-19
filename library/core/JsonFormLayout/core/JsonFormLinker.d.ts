import Linker from '~/utils/InputLinker/core/Linker';
import { IFieldLink } from '~/utils/InputLinker';
import { BasicValidateFunction } from '../interfaces';
export default class JsonFormLinker<FieldLink extends IFieldLink<FieldLink>> extends Linker<FieldLink> {
    basicValidate: BasicValidateFunction;
    constructor(host: any, options?: any);
    validate(): any;
}
