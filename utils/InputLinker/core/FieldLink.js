"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _interfaces = require("./interfaces");

var _utils = require("./utils");

var proxy = _interopRequireWildcard(require("./proxy"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class FieldLink {
  constructor(linker, config) {
    _defineProperty(this, "linker", void 0);

    _defineProperty(this, "config", void 0);

    _defineProperty(this, "childLinks", void 0);

    _defineProperty(this, "childElements", void 0);

    _defineProperty(this, "namespace", void 0);

    _defineProperty(this, "name", void 0);

    _defineProperty(this, "uniqueName", void 0);

    _defineProperty(this, "key", void 0);

    _defineProperty(this, "defaultValue", void 0);

    _defineProperty(this, "component", void 0);

    _defineProperty(this, "shouldRender", void 0);

    _defineProperty(this, "ignoredFromOutputs", void 0);

    _defineProperty(this, "_mergeChildren", void 0);

    _defineProperty(this, "options", void 0);

    _defineProperty(this, "dirty", void 0);

    _defineProperty(this, "converter", void 0);

    _defineProperty(this, "_validate", void 0);

    _defineProperty(this, "props", void 0);

    _defineProperty(this, "data", void 0);

    _defineProperty(this, "_renderMiddlewares", void 0);

    _defineProperty(this, "_preRenderMiddlewares", void 0);

    _defineProperty(this, "onChange", void 0);

    _defineProperty(this, "onValidateError", void 0);

    _defineProperty(this, "StateProxy", void 0);

    _defineProperty(this, "valueProxy", void 0);

    _defineProperty(this, "errorProxy", void 0);

    _defineProperty(this, "customStateProxy", void 0);

    _defineProperty(this, "proxies", void 0);

    _defineProperty(this, "getNormalizedValue", void 0);

    _defineProperty(this, "getOutput", void 0);

    _defineProperty(this, "getViewValue", void 0);

    _defineProperty(this, "validate", void 0);

    _defineProperty(this, "getValue", () => this.valueProxy.getValue());

    _defineProperty(this, "setValue", (value, rawArgs, clearError = true) => {
      this.valueProxy.setValue(value, rawArgs);

      if (clearError) {
        this.setError(undefined, []);
      }
    });

    _defineProperty(this, "getCustomState", () => this.customStateProxy.getValue());

    _defineProperty(this, "setCustomState", (value, rawArgs) => this.customStateProxy.setValue(value, rawArgs));

    _defineProperty(this, "getError", () => this.errorProxy.getValue());

    _defineProperty(this, "setError", (value, rawArgs) => this.errorProxy.setValue(value, rawArgs));

    _defineProperty(this, "mergeChildren", (children1, children2, extraLinkInfo) => {
      let children = this._mergeChildren((0, _utils.toArray)(children1), (0, _utils.toArray)(children2), _objectSpread({
        link: this
      }, extraLinkInfo));

      if (!children || children.length === 0) {
        children = undefined;
      } else if (children.length === 1) {
        [children] = children;
      }

      return children;
    });

    _defineProperty(this, "_changeValue", (getValue, rawArgs) => {
      const storedValue = this.getValue();
      const linkInfo = {
        storedValue,
        link: this
      };
      const value = getValue(rawArgs, linkInfo);
      this.onChange(value, rawArgs, linkInfo);
      this.linker.onFieldValueChange(this, value, rawArgs, linkInfo);
      this.setValue(value, rawArgs);
    });

    _defineProperty(this, "changeValue", (value, rawArgs) => this._changeValue(() => value, rawArgs));

    _defineProperty(this, "handleChange", (...rawArgs) => this._changeValue(this.converter.fromView, rawArgs));

    _defineProperty(this, "handleExtraChildren", props => {
      if (_interfaces.ExtraChildren in props) {
        const newProps = _objectSpread({}, props, {
          children: this.mergeChildren(props.children, props[_interfaces.ExtraChildren], {})
        });

        delete newProps[_interfaces.ExtraChildren];
        return newProps;
      }

      return props;
    });

    _defineProperty(this, "runMiddlewares", (c, middlewares) => (0, _utils.toArray)(middlewares).reduce((ctx, m) => {
      const result = typeof m === 'function' ? m(ctx) : m;

      if (result) {
        const [props, nonProps] = Array.isArray(result) ? result : [result, {}];
        ctx.props = _objectSpread({}, ctx.props, {}, props);
        ctx.nonProps = _objectSpread({}, ctx.nonProps, {}, nonProps);
      }

      ctx.props = this.handleExtraChildren(ctx.props);
      return ctx;
    }, c));

    _defineProperty(this, "runPreRenderMiddlewares", (ctx, middlewares) => this.runMiddlewares(ctx, middlewares || this._preRenderMiddlewares));

    _defineProperty(this, "runRenderMiddlewares", (ctx, middlewares) => this.runMiddlewares(ctx, middlewares || this._renderMiddlewares));

    this.linker = linker;
    this.config = config;
    this.childLinks = [];
    this.childElements = [];
    this.namespace = this.linker.namespace;
    this.name = config.name;
    this.uniqueName = this.namespace ? `${this.namespace}-${this.name}` : this.name;
    this.key = this.uniqueName;
    this.defaultValue = config.defaultValue;
    this.component = config.component;
    this.shouldRender = true;
    this.ignoredFromOutputs = config.ignoredFromOutputs || false;

    this._mergeChildren = config.mergeChildren || ((children1, children2) => children1.concat(children2));

    this.options = config.options;

    if (this.options.unmountWhileReset) {
      this.key = `${this.key}${Math.random()}`;
    }

    this.dirty = false;
    this.converter = (0, _utils.createConverter)(config.converter);

    this._validate = config.validate || (() => true);

    this._renderMiddlewares = config.mwRenderArray;
    this._preRenderMiddlewares = config.mwPreRenderArray;
    this.props = config.props;
    this.data = config.data || {};

    this.onChange = config.onChange || (() => {});

    this.onValidateError = config.onValidateError || (() => {});

    this.StateProxy = this.linker.stateMode === _interfaces.StateMode.Hook ? proxy.HookProxy : proxy.StateProxy;

    if (config.handledByProps || this.linker.options.controlled) {
      this.valueProxy = new proxy.PropsProxy(_interfaces.ProxyTypeName.Value, this);
    } else {
      this.valueProxy = new this.StateProxy(_interfaces.ProxyTypeName.Value, this);
    }

    this.errorProxy = new this.StateProxy(_interfaces.ProxyTypeName.Error, this);
    this.customStateProxy = new this.StateProxy(_interfaces.ProxyTypeName.CustomState, this);
    this.proxies = {
      value: this.valueProxy,
      error: this.errorProxy,
      customState: this.customStateProxy
    };

    const getLinkInfo = () => ({
      link: this
    });

    this.getNormalizedValue = () => this.converter.normalize(this.getValue(), getLinkInfo());

    this.getOutput = () => this.converter.toOutput(this.getNormalizedValue(), getLinkInfo());

    this.getViewValue = () => this.converter.toView(this.getValue(), getLinkInfo());

    this.validate = () => this._validate(this.getNormalizedValue(), getLinkInfo());
  }

  addChildLink(...children) {
    this.childLinks.push(...children);
  }

  addChildElement(...children) {
    this.childElements.push(...children);
  }

  get host() {
    return this.linker.host;
  }

  get hostProps() {
    return this.host.props;
  }

}

exports.default = FieldLink;