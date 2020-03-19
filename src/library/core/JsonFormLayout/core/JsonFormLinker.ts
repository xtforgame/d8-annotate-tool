/* eslint-disable no-param-reassign */
import Linker from '~/utils/InputLinker/core/Linker';
import { IFieldLink, ValidateResult } from '~/utils/InputLinker';
import { BasicValidateFunction } from '../interfaces';

export default class JsonFormLinker<
  FieldLink extends IFieldLink<FieldLink>
> extends Linker<FieldLink> {
  basicValidate : BasicValidateFunction;

  constructor(host: any, options?: any) {
    super(host, options);
    console.log('JsonFormLinker');
    this.basicValidate = super.validate.bind(this);
  }

  validate() {
    if (this.options.globalValidator) {
      return this.options.globalValidator({
        linker: this,
        validate: this.basicValidate,
      });
    }
    return super.validate();
  }
}
