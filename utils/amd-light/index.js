"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createEnv = exports.Env = void 0;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const depFilter = dep => dep !== 'exports';

const resolveModule = (moduleId, moduleMetadatas, initiateOrder, resolvingSet = new Set()) => {
  const moduleMetadata = moduleMetadatas[moduleId];

  if (!moduleMetadata) {
    throw new Error(`Module not found :${moduleId}`);
  }

  if (moduleMetadata.resolved) {
    return;
  }

  if (resolvingSet.has(moduleId)) {
    throw new Error(`Circular dependencies occured :${moduleId}`);
  }

  moduleMetadata.resolved = true;
  resolvingSet.add(moduleId);
  moduleMetadata.deps.filter(depFilter).forEach(dep => {
    resolveModule(dep, moduleMetadatas, initiateOrder, resolvingSet);
  });
  initiateOrder.push(moduleId);
  resolvingSet.delete(moduleId);
};

const compileModule = (moduleId, moduleMetadatas) => {
  const moduleMetadata = moduleMetadatas[moduleId];
  moduleMetadata.exports = {};
  const args = [];
  moduleMetadata.deps.forEach(dep => {
    if (dep === 'exports') {
      args.push(moduleMetadata.exports);
    } else {
      args.push(moduleMetadatas[dep].exports);
    }
  });
  moduleMetadata.factory(...args);
};

class Env {
  constructor(moduleDefs) {
    _defineProperty(this, "moduleDefs", void 0);

    _defineProperty(this, "moduleMetadatas", void 0);

    _defineProperty(this, "initiateOrder", void 0);

    this.moduleDefs = moduleDefs || {};
    this.moduleMetadatas = {};
    this.initiateOrder = [];
  }

  _toFileName(moduleId) {
    return `/${moduleId}.ts`;
  }

  _fromFileName(fileName) {
    let moduleId = fileName;

    if (moduleId.startsWith('/')) {
      moduleId = moduleId.substr(1);
    }

    if (moduleId.endsWith('.ts')) {
      moduleId = moduleId.substr(0, moduleId.length - 3);
    }

    return moduleId;
  }

  _toModuleDefsForCompile() {
    return Object.keys(this.moduleDefs).reduce((map, k) => {
      return _objectSpread({}, map, {
        [this._toFileName(k)]: this.moduleDefs[k]
      });
    }, {});
  }

  _compiledCodeToModuleMetadata(moduleId, code) {
    const define = new Function('define', code);
    let deps = [];
    let factory;
    define((_deps, _factory) => {
      deps = _deps;
      factory = _factory;
    });
    return {
      id: moduleId,
      deps,
      factory,
      resolved: false,
      instance: null
    };
  }

  _fromModuleDefsForCompile(moduleDefsForCompile) {
    const moduleIds = [];
    this.moduleMetadatas = Object.keys(moduleDefsForCompile).reduce((map, k) => {
      const moduleId = this._fromFileName(k);

      moduleIds.push(moduleId);
      return _objectSpread({}, map, {
        [moduleId]: this._compiledCodeToModuleMetadata(moduleId, moduleDefsForCompile[k])
      });
    }, {});
    return moduleIds;
  }

  _compile(moduleIds = []) {
    this.initiateOrder = [];
    moduleIds.forEach(moduleId => resolveModule(moduleId, this.moduleMetadatas, this.initiateOrder));
    this.initiateOrder.forEach(moduleId => compileModule(moduleId, this.moduleMetadatas));
  }

  getExports(moduleId) {
    const moduleMetadata = this.moduleMetadatas[moduleId];
    return moduleMetadata.exports;
  }

  build() {
    return (0, _axios.default)({
      method: 'post',
      url: 'api/compile',
      data: {
        modules: this._toModuleDefsForCompile()
      }
    }).then(({
      data: m
    }) => {
      const moduleIds = this._fromModuleDefsForCompile(m);

      this._compile(moduleIds);
    });
  }

}

exports.Env = Env;

const createEnv = moduleDefs => {
  return new Env(moduleDefs);
};

exports.createEnv = createEnv;