/* eslint-disable no-underscore-dangle, react/no-this-in-sfc, no-param-reassign */
import React, { useState } from 'react';
import {
  StateMode,
  IlHost,
  ProxyAndSliceName,
  IlPreset,
  IlPresetMap,
  IFieldLinkClass,
  IFieldLink,
  FieldValue,
  RawEventArgs,
  FieldName,
  OnFieldValueChangeLinkInfo,
  SliceName,
  RenderCtx,
  PreRenderCtx,
  FieldConfig,
  FieldObjectConfig,
  ProxyTypeName,
  EvaluateConfigFunction,
  ConfigCreator,
  CfgMiddlewares,
  PendingChanges,
  ConfigWithLastQueue,
  ValidateResult,
  LinkerNamespace,
  LinkMiddleware,
  PendingChange,
  PendingChangeCallback,
  IInputLinker,
} from './interfaces';
import {
  toArray,
  mwDynamicNonPropsFilter,
  createConverter,
} from './utils';
import FieldLink from './FieldLink';
import {
  proxyTypeArray,
} from './proxy';

export default class InputLinker<FieldLink extends IFieldLink<FieldLink>> {
  host : any;
  options : any;

  stateMode : StateMode;
  namespace : LinkerNamespace;

  proxyAndSliceNames : ProxyAndSliceName[];

  sliceNameInState : { [s : string] : any };

  presets : IlPresetMap<FieldLink>;

  ignoredUndefinedFromOutputs : boolean;

  FieldLink : IFieldLinkClass;

  fieldLinks : FieldLink[];

  fieldMap : { [s : string] : FieldLink };

  _idCounter : number;

  _pendingChanges : PendingChanges<FieldLink>;

  customData : any;

  constructor(host : any, options : any = {}) {
    this.host = host;
    this.options = options;
    this.stateMode = options.stateMode || StateMode.State;
    this.namespace = options.namespace || '';
    this.proxyAndSliceNames = [];
    this.sliceNameInState = { ...options.sliceNameInState };
    proxyTypeArray.forEach((p) => {
      if (p.defaultSliceName && !this.sliceNameInState[p.name]) {
        this.sliceNameInState[p.name] = p.defaultSliceName;
      }
      if (this.sliceNameInState[p.name]) {
        this.proxyAndSliceNames.push({
          proxyName: p.name,
          sliceName: this.sliceNameInState[p.name],
        });
      }
    });
    this.presets = options.presets || {};
    this.ignoredUndefinedFromOutputs = options.ignoredUndefinedFromOutputs;
    this.FieldLink = options.FieldLink || FieldLink;
    this.fieldLinks = [];
    this.fieldMap = {};
    this._idCounter = 0;
    this._pendingChanges = { changes: [] };
    this.customData = {};
  }

  get hostProps() { return this.host.props; }

  resetDirtyFlags = (flag: boolean | undefined = false) => {
    Object.values(this.fieldMap).forEach(f => (f.dirty = flag));
  }

  onFieldValueChange = (
    field : FieldLink,
    value : FieldValue,
    rawArgs : RawEventArgs,
    linkInfo : OnFieldValueChangeLinkInfo<FieldLink>
  ) => {
    field.dirty = true;
  }

  addPendingChange = (cb : PendingChangeCallback<FieldLink>, change : PendingChange<FieldLink>) => {
    if (!this._pendingChanges.nextTick) {
      this._pendingChanges.nextTick = setTimeout(this.resolvePendingChanges, 0);
    }
    if (!this._pendingChanges.cb) {
      this._pendingChanges.cb = cb;
    }
    this._pendingChanges.changes.push(change);
  }

  resolvePendingChanges = () => {
    this._pendingChanges.cb!(
      this._pendingChanges.changes,
      this,
      this._pendingChanges.changes.reduce<any>(
        (v : any, change : PendingChange<FieldLink>) => ({
          ...v,
          [change.link.name]: change.value,
        }),
        this.getValues(),
      ),
    );
    this._pendingChanges = { changes: [] };
  }

  getUniqueName = () => (
    this.namespace
    ? `${this.namespace}-unnamed-${++this._idCounter}` : `unnamed-${++this._idCounter}`
  )

  getPreset = (preset : IlPreset<FieldLink>) : FieldConfig<FieldLink> => {
    if (typeof preset === 'string') {
      const result = this.presets[preset];
      if (!result) {
        throw new Error(`preset: '${preset}' not found in Linker`);
      }
      return result;
    } else if (Array.isArray(preset)) {
      if (preset.length > 0) {
        const [funcName, ...args] = preset;
        const func = (
          this.getPreset(funcName) as ConfigCreator<FieldObjectConfig<FieldLink>>
        );
        if (!func) {
          throw new Error(`preset: '${funcName}' not found in Linker`);
        }
        return func(...args);
      }
      throw new Error('preset: length is zero');
    }
    return preset;
  }

  evaluateConfig = (
    {
      config: currentCfg,
      lastQueue = [],
    } : ConfigWithLastQueue<FieldLink>,
    c : FieldConfig<FieldLink>,
  ) : ConfigWithLastQueue<FieldLink> => {
    let config : FieldObjectConfig<FieldLink>;
    if (typeof c === 'function') {
      config = (c as EvaluateConfigFunction<FieldObjectConfig<FieldLink>>)(currentCfg);
    } else {
      config = currentCfg;
      const defaultCfgMiddlewares : CfgMiddlewares<FieldLink> = {};
      const {
        preset,
        presets,
        evaluate = (_config : FieldObjectConfig<FieldLink>) => ({ ..._config, ...c }),
        cfgMiddlewares: {
          before,
          after,
          last,
        } = defaultCfgMiddlewares,
      } = c;

      const addLast = (c : any) => {
        lastQueue.splice(0, 0, ...toArray(last));
        return c;
      };

      ({ config } = toArray<any>(before)
        .concat(toArray(preset)).concat(toArray(presets)).concat(toArray(evaluate))
        .concat([addLast])
        .concat(toArray(after))
          .map(this.getPreset)
          .reduce(this.evaluateConfig, { config, lastQueue }));

      delete config.preset;
      delete config.presets;
      delete config.evaluate;
      delete config.cfgMiddlewares;
    }
    if (!config) {
      console.error('Wrong config', c);
      throw new Error('Wrong config');
    }
    if (config.mwPreRender) {
      const mwPreRenders = toArray<LinkMiddleware<PreRenderCtx<FieldLink>>>(config.mwPreRender);
      config.mwPreRender = mwPreRenders;
      config.mwPreRenderArray = config.mwPreRenderArray || [];
      config.mwPreRenderArray.push(...mwPreRenders);
      delete config.mwPreRender;
    }
    if (config.mwRender) {
      const mwRenders = toArray<LinkMiddleware<RenderCtx<FieldLink>>>(config.mwRender);
      config.mwRender = mwRenders;
      config.mwRenderArray = config.mwRenderArray || [];
      config.mwRenderArray.push(...mwRenders);
      delete config.mwRender;
    }
    if (config.extraConverter) {
      config.converter = { ...config.converter, ...config.extraConverter };
      delete config.extraConverter;
    }
    if (config.extraProps) {
      config.props = { ...config.props, ...config.extraProps };
      delete config.extraProps;
    }
    if (config.extraOptions) {
      config.options = { ...config.options, ...config.extraOptions };
      delete config.extraOptions;
    }
    if (config.extraChildLinks) {
      config.extraChildLinks = toArray(config.extraChildLinks);
      config.childLinks!.push(...config.extraChildLinks);
      delete config.extraChildLinks;
    }
    if (config.extraChildElements) {
      config.extraChildElements = toArray(config.extraChildElements);
      config.childElements!.push(...config.extraChildElements);
      delete config.extraChildElements;
    }
    return { config, lastQueue };
  }

  _add(configs : FieldConfig<FieldLink>[]) {
    return configs.map((_c) => {
      const configChain = toArray<FieldConfig<FieldLink>>(_c);
      let config : FieldObjectConfig<FieldLink> = {
        converter: createConverter({}),
        props: {},
        mwPreRenderArray: [],
        mwRenderArray: [],
        childLinks: [],
        childElements: [],
        options: {},
      };
      let lastQueue : any[] = [];
      ({ config, lastQueue } = configChain.reduce(this.evaluateConfig, { config, lastQueue }));
      while (lastQueue.length > 0) {
        ({ config, lastQueue } = lastQueue.reduce(this.evaluateConfig, { config, lastQueue: [] }));
      }
      config.name = config.name || this.getUniqueName();
      // set static props as the first middleware
      config.mwRenderArray = [config.props!, ...config.mwRenderArray!];
      this.fieldMap[config.name] = new this.FieldLink(this, config);
      const fieldLink = this.fieldMap[config.name];
      if (config.childLinks) {
        fieldLink.addChildLink(...this._add(config.childLinks));
      }
      if (config.childElements) {
        fieldLink.addChildElement(...this._add(config.childElements));
      }
      return fieldLink;
    });
  }

  add(...configs : FieldConfig<FieldLink>[]) {
    const result = this._add(configs);
    this.fieldLinks.push(...result);
    return result;
  }

  setDefaultValues(defaultValues : { [s : string] : FieldValue }) {
    Object.keys(defaultValues).forEach((key) => {
      const field = this.getField(key);
      if (field) {
        field.defaultValue = defaultValues[key];
      }
    });
  }

  getField = (fieldName : FieldName) => this.fieldMap[fieldName];

  getFields = () => this.fieldMap;

  getValue = (fieldName : FieldName) => this.fieldMap[fieldName].getValue();

  getNormalizedValue = (fieldName : FieldName) => this.fieldMap[fieldName].getNormalizedValue();

  getValues = () : any => Object.values(this.fieldMap).reduce<any>(
    (values, field) => {
      values[field.name] = field.getValue();
      return values;
    },
    {},
  )

  getNormalizedValues = () => Object.values(this.fieldMap).reduce<any>(
    (values, field) => {
      values[field.name] = field.getNormalizedValue();
      return values;
    },
    {},
  )

  getOutput = (fieldName : FieldName) => this.fieldMap[fieldName].getOutput();

  getOutputs = () => Object.values(this.fieldMap).filter(field => !field.ignoredFromOutputs).reduce<any>(
    (values, field) => {
      const value = field.getOutput();
      if (!this.ignoredUndefinedFromOutputs || value !== undefined) {
        values[field.name] = value;
      }
      return values;
    },
    {},
  )

  getDataFromSlice = (sliceName : SliceName, state?: any) => (state || this.host.state)[this.sliceNameInState[sliceName]];

  getDataFromSliceByName = (sliceName : SliceName, fieldName : FieldName, state?: any) : FieldValue => this.getDataFromSlice(sliceName, state)[fieldName];

  changeValue = (fieldName : FieldName, value : FieldValue) => {
    const field = this.getField(fieldName);
    if (field) {
      field.changeValue(value, []);
    }
  }

  changeValues = (changeMap : { [s : string] : FieldValue }) => {
    const changes : any[] = [];
    Object.keys(changeMap).forEach((fieldName) => {
      const value = changeMap[fieldName];
      const field = this.getField(fieldName);
      if (field && this.host.props.onChanges) {
        changes.push({
          value, rawArgs: [], link: field,
        });
      }
    });
    this.host.props.onChanges(
      changes,
      this,
      changes.reduce<any>(
        (v, change) => ({
          ...v,
          [change.link.name]: change.value,
        }),
        this.getValues(),
      ),
    );
  }

  validate(keepErrors = true) : ValidateResult {
    let passed = true;
    Object.values(this.fieldMap).forEach((field) => {
      let error;
      try {
        const result = field.validate();
        if (result instanceof Error) {
          error = result;
        }
      } catch (e) { error = e; }
      if (error) {
        passed = false;
        field.onValidateError(error, { link: field });
        if (keepErrors) {
          field.setError(error, []);
        }
      }
    });
    return passed;
  }

  getErrorStatus = (fieldName : FieldName) => ({
    validateError: this.getDataFromSliceByName(ProxyTypeName.Error, fieldName),
  })

  // render helpers
  _renderPass = (
    fieldName : FieldName,
    ctx : PreRenderCtx<FieldLink>,
    options = {},
    ignoreKeyProp : boolean,
  ) : RenderCtx<FieldLink> => {
    const field = this.fieldMap[fieldName];
    if (!ignoreKeyProp) { ctx.props.key = field.key; }
    const { validateError } = this.getErrorStatus(fieldName);

    const newCtx = field.runRenderMiddlewares<FieldLink>({
      value: field.getViewValue(),
      link: field,
      handleChange: field.handleChange,
      validateError,
      props: ctx.props,
      nonProps: ctx.nonProps ? ctx.nonProps : mwDynamicNonPropsFilter(field),
      options,
    });

    const { childLinks } = field;
    return childLinks.reduce<RenderCtx<FieldLink>>(
      (_ctx, childLink) => this._renderPass(childLink.name, _ctx, options, true),
      newCtx
    );
  }

  renderProps = (fieldName : FieldName, options = {}) => {
    const ctx : any = {};
    return this._renderPass(
      fieldName,
      ctx,
      options,
      false,
    ).props
  }

  renderComponent = (fieldName : FieldName, options : any = {}) => {
    const field = this.fieldMap[fieldName];
    const newCtx = field.runPreRenderMiddlewares<FieldLink>({
      link: field,
      props: {},
      nonProps: mwDynamicNonPropsFilter(field),
      options,
    });

    if (!newCtx.nonProps.shouldRender) {
      return undefined;
    }

    const extraChildren = field.childElements.map(child => this.renderComponent(child.name, options));
    let {
      props,
      nonProps,
    } = this._renderPass(fieldName, newCtx, options, false);
    props = {
      ...props,
      ...options.extraProps,
    };
    props.children = field.mergeChildren(
      props.children,
      extraChildren,
      { isMergingChildElements: true }
    );

    if (!nonProps.shouldRender) {
      return undefined;
    }
    const Component = nonProps.component;
    if (Component == null) {
      throw new Error(`Wrong Component Class (${fieldName})`);
    }
    if (!props.key) {
      console.warn('component with no key :', field);
    }
    return (<Component {...props} />);
  }

  // for component only
  mergeInitState(state : any = {}) {
    const newState : any = { ...state };
    Object.values(this.sliceNameInState).filter(n => n)
      .forEach(name => (newState[name] = { ...state[name] }));
    Object.values(this.fieldMap).filter(field => !field.handledByProps)
      .forEach(field => (newState[this.sliceNameInState.value][field.name] = this.fieldMap[field.name].defaultValue));
    return newState;
  }

  // for hook only
  updateHost(host : IlHost) {
    const state = { ...host.state };
    this.proxyAndSliceNames.forEach(({ sliceName }) => {
      state[sliceName] = {};
    });
    const useStateForField = (field : FieldLink) => {
      this.proxyAndSliceNames.forEach(({ proxyName, sliceName }) => {
        const proxy = field.proxies[proxyName];
        if (proxy.updateSetter) {
          const [value, setValue] = useState(proxyName === 'value' ? field.defaultValue : undefined);
          state[sliceName][field.name] = value;
          proxy.updateSetter(setValue);
        }
      });
      field.childLinks.forEach(useStateForField);
      field.childElements.forEach(useStateForField);
    };
    this.fieldLinks.forEach(useStateForField);
    this.host = { ...host, state };
  }
}
