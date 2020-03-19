"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _interfaces = require("./interfaces");

var _utils = require("./utils");

var _FieldLink = _interopRequireDefault(require("./FieldLink"));

var _proxy = require("./proxy");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class InputLinker {
  constructor(host, _options = {}) {
    _defineProperty(this, "host", void 0);

    _defineProperty(this, "options", void 0);

    _defineProperty(this, "stateMode", void 0);

    _defineProperty(this, "namespace", void 0);

    _defineProperty(this, "proxyAndSliceNames", void 0);

    _defineProperty(this, "sliceNameInState", void 0);

    _defineProperty(this, "presets", void 0);

    _defineProperty(this, "ignoredUndefinedFromOutputs", void 0);

    _defineProperty(this, "FieldLink", void 0);

    _defineProperty(this, "fieldLinks", void 0);

    _defineProperty(this, "fieldMap", void 0);

    _defineProperty(this, "_idCounter", void 0);

    _defineProperty(this, "_pendingChanges", void 0);

    _defineProperty(this, "customData", void 0);

    _defineProperty(this, "resetDirtyFlags", (flag = false) => {
      Object.values(this.fieldMap).forEach(f => f.dirty = flag);
    });

    _defineProperty(this, "onFieldValueChange", (field, value, rawArgs, linkInfo) => {
      field.dirty = true;
    });

    _defineProperty(this, "addPendingChange", (cb, change) => {
      if (!this._pendingChanges.nextTick) {
        this._pendingChanges.nextTick = setTimeout(this.resolvePendingChanges, 0);
      }

      if (!this._pendingChanges.cb) {
        this._pendingChanges.cb = cb;
      }

      this._pendingChanges.changes.push(change);
    });

    _defineProperty(this, "resolvePendingChanges", () => {
      this._pendingChanges.cb(this._pendingChanges.changes, this, this._pendingChanges.changes.reduce((v, change) => _objectSpread({}, v, {
        [change.link.name]: change.value
      }), this.getValues()));

      this._pendingChanges = {
        changes: []
      };
    });

    _defineProperty(this, "getUniqueName", () => this.namespace ? `${this.namespace}-unnamed-${++this._idCounter}` : `unnamed-${++this._idCounter}`);

    _defineProperty(this, "getPreset", preset => {
      if (typeof preset === 'string') {
        const result = this.presets[preset];

        if (!result) {
          throw new Error(`preset: '${preset}' not found in Linker`);
        }

        return result;
      } else if (Array.isArray(preset)) {
        if (preset.length > 0) {
          const [funcName, ...args] = preset;
          const func = this.getPreset(funcName);

          if (!func) {
            throw new Error(`preset: '${funcName}' not found in Linker`);
          }

          return func(...args);
        }

        throw new Error('preset: length is zero');
      }

      return preset;
    });

    _defineProperty(this, "evaluateConfig", ({
      config: currentCfg,
      lastQueue = []
    }, c) => {
      let config;

      if (typeof c === 'function') {
        config = c(currentCfg);
      } else {
        config = currentCfg;
        const defaultCfgMiddlewares = {};
        const {
          preset,
          presets,
          evaluate = _config => _objectSpread({}, _config, {}, c),
          cfgMiddlewares: {
            before,
            after,
            last
          } = defaultCfgMiddlewares
        } = c;

        const addLast = c => {
          lastQueue.splice(0, 0, ...(0, _utils.toArray)(last));
          return c;
        };

        ({
          config
        } = (0, _utils.toArray)(before).concat((0, _utils.toArray)(preset)).concat((0, _utils.toArray)(presets)).concat((0, _utils.toArray)(evaluate)).concat([addLast]).concat((0, _utils.toArray)(after)).map(this.getPreset).reduce(this.evaluateConfig, {
          config,
          lastQueue
        }));
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
        const mwPreRenders = (0, _utils.toArray)(config.mwPreRender);
        config.mwPreRender = mwPreRenders;
        config.mwPreRenderArray = config.mwPreRenderArray || [];
        config.mwPreRenderArray.push(...mwPreRenders);
        delete config.mwPreRender;
      }

      if (config.mwRender) {
        const mwRenders = (0, _utils.toArray)(config.mwRender);
        config.mwRender = mwRenders;
        config.mwRenderArray = config.mwRenderArray || [];
        config.mwRenderArray.push(...mwRenders);
        delete config.mwRender;
      }

      if (config.extraConverter) {
        config.converter = _objectSpread({}, config.converter, {}, config.extraConverter);
        delete config.extraConverter;
      }

      if (config.extraProps) {
        config.props = _objectSpread({}, config.props, {}, config.extraProps);
        delete config.extraProps;
      }

      if (config.extraOptions) {
        config.options = _objectSpread({}, config.options, {}, config.extraOptions);
        delete config.extraOptions;
      }

      if (config.extraChildLinks) {
        config.extraChildLinks = (0, _utils.toArray)(config.extraChildLinks);
        config.childLinks.push(...config.extraChildLinks);
        delete config.extraChildLinks;
      }

      if (config.extraChildElements) {
        config.extraChildElements = (0, _utils.toArray)(config.extraChildElements);
        config.childElements.push(...config.extraChildElements);
        delete config.extraChildElements;
      }

      return {
        config,
        lastQueue
      };
    });

    _defineProperty(this, "getField", fieldName => this.fieldMap[fieldName]);

    _defineProperty(this, "getFields", () => this.fieldMap);

    _defineProperty(this, "getValue", fieldName => this.fieldMap[fieldName].getValue());

    _defineProperty(this, "getNormalizedValue", fieldName => this.fieldMap[fieldName].getNormalizedValue());

    _defineProperty(this, "getValues", () => Object.values(this.fieldMap).reduce((values, field) => {
      values[field.name] = field.getValue();
      return values;
    }, {}));

    _defineProperty(this, "getNormalizedValues", () => Object.values(this.fieldMap).reduce((values, field) => {
      values[field.name] = field.getNormalizedValue();
      return values;
    }, {}));

    _defineProperty(this, "getOutput", fieldName => this.fieldMap[fieldName].getOutput());

    _defineProperty(this, "getOutputs", () => Object.values(this.fieldMap).filter(field => !field.ignoredFromOutputs).reduce((values, field) => {
      const value = field.getOutput();

      if (!this.ignoredUndefinedFromOutputs || value !== undefined) {
        values[field.name] = value;
      }

      return values;
    }, {}));

    _defineProperty(this, "getDataFromSlice", (sliceName, state) => (state || this.host.state)[this.sliceNameInState[sliceName]]);

    _defineProperty(this, "getDataFromSliceByName", (sliceName, fieldName, state) => this.getDataFromSlice(sliceName, state)[fieldName]);

    _defineProperty(this, "changeValue", (fieldName, value) => {
      const field = this.getField(fieldName);

      if (field) {
        field.changeValue(value, []);
      }
    });

    _defineProperty(this, "changeValues", changeMap => {
      const changes = [];
      Object.keys(changeMap).forEach(fieldName => {
        const value = changeMap[fieldName];
        const field = this.getField(fieldName);

        if (field && this.host.props.onChanges) {
          changes.push({
            value,
            rawArgs: [],
            link: field
          });
        }
      });
      this.host.props.onChanges(changes, this, changes.reduce((v, change) => _objectSpread({}, v, {
        [change.link.name]: change.value
      }), this.getValues()));
    });

    _defineProperty(this, "getErrorStatus", fieldName => ({
      validateError: this.getDataFromSliceByName(_interfaces.ProxyTypeName.Error, fieldName)
    }));

    _defineProperty(this, "_renderPass", (fieldName, ctx, options = {}, ignoreKeyProp) => {
      const field = this.fieldMap[fieldName];

      if (!ignoreKeyProp) {
        ctx.props.key = field.key;
      }

      const {
        validateError
      } = this.getErrorStatus(fieldName);
      const newCtx = field.runRenderMiddlewares({
        value: field.getViewValue(),
        link: field,
        handleChange: field.handleChange,
        validateError,
        props: ctx.props,
        nonProps: ctx.nonProps ? ctx.nonProps : (0, _utils.mwDynamicNonPropsFilter)(field),
        options
      });
      const {
        childLinks
      } = field;
      return childLinks.reduce((_ctx, childLink) => this._renderPass(childLink.name, _ctx, options, true), newCtx);
    });

    _defineProperty(this, "renderProps", (fieldName, options = {}) => {
      const ctx = {};
      return this._renderPass(fieldName, ctx, options, false).props;
    });

    _defineProperty(this, "renderComponent", (fieldName, options = {}) => {
      const field = this.fieldMap[fieldName];
      const newCtx = field.runPreRenderMiddlewares({
        link: field,
        props: {},
        nonProps: (0, _utils.mwDynamicNonPropsFilter)(field),
        options
      });

      if (!newCtx.nonProps.shouldRender) {
        return undefined;
      }

      const extraChildren = field.childElements.map(child => this.renderComponent(child.name, options));

      let {
        props,
        nonProps
      } = this._renderPass(fieldName, newCtx, options, false);

      props = _objectSpread({}, props, {}, options.extraProps);
      props.children = field.mergeChildren(props.children, extraChildren, {
        isMergingChildElements: true
      });

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

      return _react.default.createElement(Component, props);
    });

    this.host = host;
    this.options = _options;
    this.stateMode = _options.stateMode || _interfaces.StateMode.State;
    this.namespace = _options.namespace || '';
    this.proxyAndSliceNames = [];
    this.sliceNameInState = _objectSpread({}, _options.sliceNameInState);

    _proxy.proxyTypeArray.forEach(p => {
      if (p.defaultSliceName && !this.sliceNameInState[p.name]) {
        this.sliceNameInState[p.name] = p.defaultSliceName;
      }

      if (this.sliceNameInState[p.name]) {
        this.proxyAndSliceNames.push({
          proxyName: p.name,
          sliceName: this.sliceNameInState[p.name]
        });
      }
    });

    this.presets = _options.presets || {};
    this.ignoredUndefinedFromOutputs = _options.ignoredUndefinedFromOutputs;
    this.FieldLink = _options.FieldLink || _FieldLink.default;
    this.fieldLinks = [];
    this.fieldMap = {};
    this._idCounter = 0;
    this._pendingChanges = {
      changes: []
    };
    this.customData = {};
  }

  get hostProps() {
    return this.host.props;
  }

  _add(configs) {
    return configs.map(_c => {
      const configChain = (0, _utils.toArray)(_c);
      let config = {
        converter: (0, _utils.createConverter)({}),
        props: {},
        mwPreRenderArray: [],
        mwRenderArray: [],
        childLinks: [],
        childElements: [],
        options: {}
      };
      let lastQueue = [];
      ({
        config,
        lastQueue
      } = configChain.reduce(this.evaluateConfig, {
        config,
        lastQueue
      }));

      while (lastQueue.length > 0) {
        ({
          config,
          lastQueue
        } = lastQueue.reduce(this.evaluateConfig, {
          config,
          lastQueue: []
        }));
      }

      config.name = config.name || this.getUniqueName();
      config.mwRenderArray = [config.props, ...config.mwRenderArray];
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

  add(...configs) {
    const result = this._add(configs);

    this.fieldLinks.push(...result);
    return result;
  }

  setDefaultValues(defaultValues) {
    Object.keys(defaultValues).forEach(key => {
      const field = this.getField(key);

      if (field) {
        field.defaultValue = defaultValues[key];
      }
    });
  }

  validate(keepErrors = true) {
    let passed = true;
    Object.values(this.fieldMap).forEach(field => {
      let error;

      try {
        const result = field.validate();

        if (result instanceof Error) {
          error = result;
        }
      } catch (e) {
        error = e;
      }

      if (error) {
        passed = false;
        field.onValidateError(error, {
          link: field
        });

        if (keepErrors) {
          field.setError(error, []);
        }
      }
    });
    return passed;
  }

  mergeInitState(state = {}) {
    const newState = _objectSpread({}, state);

    Object.values(this.sliceNameInState).filter(n => n).forEach(name => newState[name] = _objectSpread({}, state[name]));
    Object.values(this.fieldMap).filter(field => !field.handledByProps).forEach(field => newState[this.sliceNameInState.value][field.name] = this.fieldMap[field.name].defaultValue);
    return newState;
  }

  updateHost(host) {
    const state = _objectSpread({}, host.state);

    this.proxyAndSliceNames.forEach(({
      sliceName
    }) => {
      state[sliceName] = {};
    });

    const useStateForField = field => {
      this.proxyAndSliceNames.forEach(({
        proxyName,
        sliceName
      }) => {
        const proxy = field.proxies[proxyName];

        if (proxy.updateSetter) {
          const [value, setValue] = (0, _react.useState)(proxyName === 'value' ? field.defaultValue : undefined);
          state[sliceName][field.name] = value;
          proxy.updateSetter(setValue);
        }
      });
      field.childLinks.forEach(useStateForField);
      field.childElements.forEach(useStateForField);
    };

    this.fieldLinks.forEach(useStateForField);
    this.host = _objectSpread({}, host, {
      state
    });
  }

}

exports.default = InputLinker;