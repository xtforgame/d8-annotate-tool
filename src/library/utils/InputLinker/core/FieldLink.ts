/* eslint-disable no-underscore-dangle, react/no-this-in-sfc, no-param-reassign */
import {
  FieldValue,
  RawEventArgs,
  ProxyTypeName,
  IFieldLink,
  StateMode,
  FieldProps,
  ValueProxy,
  ValueProxyClass,
  IInputLinker,
  FieldObjectConfig,
  Converter,
  LinkInfoBasic,
  ICtx,

  PreRenderCtx,
  RenderCtx,
  LinkMiddleware,
  InputOnChange,
  OnValidateErrorFunction,
  MergeChildrenFunction,
  ValidateFunction,
  IBasicFieldLink,
  ValidateResult,
  ExtraChildren,
} from './interfaces';
import {
  toArray,
  createConverter,
} from './utils';
import * as proxy from './proxy';

export default class FieldLink implements IFieldLink<FieldLink> {
  linker : IInputLinker<FieldLink>;
  config : FieldObjectConfig<FieldLink>;
  childLinks : any[];
  childElements : any[];
  namespace : string;
  name : string;
  uniqueName : string;
  key : string;
  defaultValue : any;
  component : any;
  shouldRender : boolean;
  ignoredFromOutputs : boolean;

  _mergeChildren : MergeChildrenFunction<FieldLink>;
  options : any;

  dirty : boolean;
  converter : Converter<FieldLink>;

  _validate : ValidateFunction<FieldLink>;

  props : FieldProps;

  data : any;

  _renderMiddlewares : LinkMiddleware<RenderCtx<FieldLink>>[];
  _preRenderMiddlewares : LinkMiddleware<PreRenderCtx<FieldLink>>[];

  onChange : InputOnChange<FieldLink>;
  onValidateError : OnValidateErrorFunction<FieldLink>;

  StateProxy : ValueProxyClass;

  valueProxy : ValueProxy;
  errorProxy : ValueProxy;
  customStateProxy : ValueProxy;

  proxies : { [s : string] : ValueProxy };

  getNormalizedValue : () => any;
  getOutput : () => any;
  getViewValue : () => any;
  validate : () => ValidateResult;

  constructor(linker : IInputLinker<FieldLink>, config : FieldObjectConfig<FieldLink>) {
    this.linker = linker;
    this.config = config;
    this.childLinks = [];
    this.childElements = [];
    this.namespace = this.linker.namespace;
    this.name = config.name!;
    this.uniqueName = this.namespace ? `${this.namespace}-${this.name}` : this.name;
    this.key = this.uniqueName;
    this.defaultValue = config.defaultValue;
    this.component = config.component;
    this.shouldRender = true;
    this.ignoredFromOutputs = config.ignoredFromOutputs || false;
    this._mergeChildren = config.mergeChildren
      || ((children1, children2) => children1.concat(children2));
    this.options = config.options;
    if (this.options.unmountWhileReset) {
      this.key = `${this.key}${Math.random()}`;
    }
    this.dirty = false;

    this.converter = createConverter(config.converter);

    this._validate = config.validate || (() => true);
    this._renderMiddlewares = config.mwRenderArray!;
    this._preRenderMiddlewares = config.mwPreRenderArray!;
    this.props = config.props!;
    this.data = config.data || {};

    this.onChange = config.onChange || (() => {});
    this.onValidateError = config.onValidateError || (() => {});

    this.StateProxy = this.linker.stateMode === StateMode.Hook ? proxy.HookProxy : proxy.StateProxy;

    // functions
    if (config.handledByProps || this.linker.options.controlled) {
      this.valueProxy = new proxy.PropsProxy<FieldLink, IInputLinker<FieldLink>>(ProxyTypeName.Value, this);
    } else {
      this.valueProxy = new this.StateProxy<FieldLink, IInputLinker<FieldLink>>(ProxyTypeName.Value, this);
    }

    this.errorProxy = new this.StateProxy<FieldLink, IInputLinker<FieldLink>>(ProxyTypeName.Error, this);
    this.customStateProxy = new this.StateProxy<FieldLink, IInputLinker<FieldLink>>(ProxyTypeName.CustomState, this);
    this.proxies = {
      value: this.valueProxy,
      error: this.errorProxy,
      customState: this.customStateProxy,
    };

    const getLinkInfo : () => LinkInfoBasic<FieldLink> = () => ({ link: this });

    this.getNormalizedValue = () => this.converter.normalize(this.getValue(), getLinkInfo());
    this.getOutput = () => this.converter.toOutput(this.getNormalizedValue(), getLinkInfo());
    this.getViewValue = () => this.converter.toView(this.getValue(), getLinkInfo());
    this.validate = () => this._validate(this.getNormalizedValue(), getLinkInfo());
  }

  getValue = () => this.valueProxy.getValue();

  setValue = (value : FieldValue, rawArgs : RawEventArgs, clearError = true) => {
    this.valueProxy.setValue(value, rawArgs);
    if (clearError) {
      this.setError(undefined, []);
    }
  }

  getCustomState = () => this.customStateProxy.getValue();

  setCustomState = (
    value : FieldValue, rawArgs : RawEventArgs,
  ) => this.customStateProxy.setValue(value, rawArgs)

  getError = () => this.errorProxy.getValue();

  setError = (
    value : FieldValue, rawArgs : RawEventArgs,
  ) => this.errorProxy.setValue(value, rawArgs)

  addChildLink(...children : any[]) {
    this.childLinks.push(...children);
  }

  addChildElement(...children : any[]) {
    this.childElements.push(...children);
  }

  mergeChildren = (
    children1 : any[], children2 : any[], extraLinkInfo : any,
  ) : any[] | undefined => {
    let children : any[] | undefined = this._mergeChildren(
      toArray(children1), toArray(children2),
      { link: this, ...extraLinkInfo }
    );
    if (!children || children.length === 0) {
      children = undefined;
    } else if (children.length === 1) { ([children] = children); }
    return children;
  }

  _changeValue = (getValue : (rawArgs : RawEventArgs, linkInfo : LinkInfoBasic<FieldLink>) => FieldValue, rawArgs : RawEventArgs) => {
    const storedValue = this.getValue();
    const linkInfo = { storedValue, link: this };
    const value = getValue(rawArgs, linkInfo);
    this.onChange(value, rawArgs, linkInfo);
    this.linker.onFieldValueChange(this, value, rawArgs, linkInfo);
    this.setValue(value, rawArgs);
  }

  changeValue = (value : FieldValue, rawArgs : RawEventArgs) : void => this._changeValue(
    () => value,
    rawArgs,
  )

  // handlers
  handleChange = (...rawArgs : any[]) => this._changeValue(this.converter.fromView, rawArgs);

  handleExtraChildren = (props : FieldProps) => {
    if (ExtraChildren in props) {
      const newProps : FieldProps = {
        ...props,
        children: this.mergeChildren(props.children, props[ExtraChildren], {}),
      };
      delete newProps[ExtraChildren];
      return newProps;
    }
    return props;
  }

  runMiddlewares = <Ctx extends ICtx>(
    c : Ctx,
    middlewares : LinkMiddleware<Ctx>[],
  ) : Ctx => toArray<LinkMiddleware<Ctx>>(middlewares).reduce<Ctx>(
    (ctx, m) => {
      const result = typeof m === 'function' ? m(ctx) : m;
      if (result) {
        const [props, nonProps] = Array.isArray(result) ? result : [result, {}];
        ctx.props = { ...ctx.props, ...props };
        ctx.nonProps = { ...ctx.nonProps, ...nonProps };
      }
      ctx.props = this.handleExtraChildren(ctx.props);
      return ctx;
    },
    c,
  )

  runPreRenderMiddlewares = <FieldLink extends IBasicFieldLink>(
    ctx : PreRenderCtx<FieldLink>,
    middlewares?: LinkMiddleware<PreRenderCtx<FieldLink>>[],
  ) : PreRenderCtx<FieldLink> => this.runMiddlewares(
    ctx, middlewares || this._preRenderMiddlewares,
  )

  runRenderMiddlewares = <FieldLink extends IBasicFieldLink>(
    ctx : RenderCtx<FieldLink>,
    middlewares?: LinkMiddleware<RenderCtx<FieldLink>>[],
  ) : RenderCtx<FieldLink> => this.runMiddlewares<RenderCtx<FieldLink>>(
    ctx, middlewares || this._renderMiddlewares,
  )

  get host() { return this.linker.host; }

  get hostProps() { return this.host.props; }
}
