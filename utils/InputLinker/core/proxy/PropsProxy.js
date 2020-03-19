"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class PropsProxy {
  constructor(type, link) {
    _defineProperty(this, "type", void 0);

    _defineProperty(this, "link", void 0);

    _defineProperty(this, "linker", void 0);

    _defineProperty(this, "name", void 0);

    _defineProperty(this, "handledByProps", void 0);

    _defineProperty(this, "getValue", () => this.handledByProps.value({
      link: this.link
    }));

    _defineProperty(this, "setValue", (value, rawArgs) => this.handledByProps.onChange({
      value,
      rawArgs
    }, {
      link: this.link
    }));

    this.type = type;
    this.link = link;
    this.linker = this.link.linker;
    this.name = this.link.name;
    this.handledByProps = this.link.config.handledByProps && _objectSpread({}, this.link.config.handledByProps);

    if (this.linker.options.controlled) {
      const onChange = ({
        value,
        rawArgs
      }, {
        link,
        link: {
          hostProps
        }
      }) => {
        if (hostProps.onChange) {
          hostProps.onChange(value, rawArgs, link, _objectSpread({}, this.linker.getValues(), {
            [this.name]: value
          }));
        }

        if (hostProps.onChanges) {
          if (this.linker.options.applyChangesSync) {
            this.linker.changeValues({
              [this.name]: value
            });
          } else {
            this.linker.addPendingChange(hostProps.onChanges, {
              value,
              rawArgs,
              link
            });
          }
        }
      };

      this.handledByProps = {
        value: ({
          link: {
            hostProps
          }
        }) => hostProps.value && hostProps.value[this.name],
        onChange
      };
    } else if (this.handledByProps) {
      if (!this.handledByProps.value || !this.handledByProps.onChange) {
        throw new Error('Wrong options: handledByProps');
      }

      if (typeof this.handledByProps.value === 'string') {
        const valueProp = this.handledByProps.value;

        this.handledByProps.value = ({
          link: {
            hostProps
          }
        }) => hostProps[valueProp];
      }

      if (typeof this.handledByProps.onChange === 'string') {
        const onChangeProp = this.handledByProps.onChange;

        const onChange = ({
          value,
          rawArgs
        }, {
          link,
          link: {
            hostProps
          }
        }) => {
          if (hostProps[onChangeProp]) {
            hostProps[onChangeProp](value, rawArgs, link);
          }
        };

        this.handledByProps.onChange = onChange;
      } else {
        const onChange = this.handledByProps.onChange;

        const onChange2 = ({
          value,
          rawArgs
        }, {
          link
        }) => {
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

}

exports.default = PropsProxy;