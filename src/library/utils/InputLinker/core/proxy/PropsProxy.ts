/* eslint-disable no-underscore-dangle, react/no-this-in-sfc, no-param-reassign */
import {
  ProxyTypeName,
  IlHost,
  LinkInfoBasic,
  IFieldLink,
  IInputLinker,
  ProxySetter,
  FieldName,
  HandledByProps,
  WrappedHandledByPropsOnChangeOnChange,
  InputHandledByPropsOnChange,
  FieldValue,
  RawEventArgs,
} from '../interfaces';

export default class PropsProxy<FieldLink extends IFieldLink<FieldLink>, InputLinker extends IInputLinker<FieldLink>> {
  type : ProxyTypeName;
  link : FieldLink;
  linker : InputLinker;

  name : FieldName;

  handledByProps : HandledByProps<FieldLink>;

  constructor(type : ProxyTypeName, link : FieldLink) {
    this.type = type;
    this.link = link;
    this.linker = this.link.linker;

    this.name = this.link.name;

    this.handledByProps = this.link.config.handledByProps && { ...this.link.config.handledByProps };
    if (this.linker.options.controlled) {
      const onChange : WrappedHandledByPropsOnChangeOnChange<FieldLink> = (
        { value, rawArgs },
        { link, link: { hostProps },
      }) => {
        if (hostProps.onChange) {
          hostProps.onChange(value, rawArgs, link, {
            ...this.linker.getValues(),
            [this.name]: value,
          });
        }
        if (hostProps.onChanges) {
          if (this.linker.options.applyChangesSync) {
            this.linker.changeValues({
              [this.name]: value,
            });
          } else {
            this.linker.addPendingChange(hostProps.onChanges, {
              value, rawArgs, link,
            });
          }
        }
      };
      this.handledByProps = {
        value: ({ link: { hostProps } }) => hostProps.value && hostProps.value[this.name],
        onChange,
      };
    } else if (this.handledByProps) {
      if (!this.handledByProps.value || !this.handledByProps.onChange) {
        throw new Error('Wrong options: handledByProps');
      }
      if (typeof this.handledByProps.value === 'string') {
        const valueProp = this.handledByProps.value;
        this.handledByProps.value = ({ link: { hostProps } }) => hostProps[valueProp];
      }

      if (typeof this.handledByProps.onChange === 'string') {
        const onChangeProp = this.handledByProps.onChange;
        const onChange : WrappedHandledByPropsOnChangeOnChange<FieldLink> = ({ value, rawArgs }, { link, link: { hostProps } }) => {
          if (hostProps[onChangeProp]) {
            hostProps[onChangeProp](value, rawArgs, link);
          }
        };
        this.handledByProps.onChange = onChange;
      } else {
        const onChange = <InputHandledByPropsOnChange<FieldLink>>this.handledByProps.onChange;
        const onChange2 : WrappedHandledByPropsOnChangeOnChange<FieldLink> = ({ value, rawArgs }, { link }) => {
          if (onChange) {
            onChange(value, rawArgs, link);
          }
        };
        this.handledByProps.onChange = onChange2;
      }
    }
  }

  get host() {
    return this.linker.host;
  }

  getValue = () => this.handledByProps.value({ link: this.link });

  setValue = (value : FieldValue, rawArgs : RawEventArgs) => (<WrappedHandledByPropsOnChangeOnChange<FieldLink>>this.handledByProps.onChange)({ value, rawArgs }, { link: this.link });
}
