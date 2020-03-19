import axios from 'axios';

export type ModuleId = string;
export type ModuleDef = any;
export type ModuleDefs = { [s : string] : ModuleDef }
export type ModuleDefsForCompile = { [s : string] : ModuleDef }

export type ModuleExports = { [s : string] : any };

export type ModuleMetadata = {
  id : ModuleId;
  deps : ModuleId[];
  factory : Function;
  resolved : boolean;
  instance : any;
  exports?: ModuleExports;
};
export type ModuleMetadatas = { [s : string] : ModuleMetadata }

const depFilter = (dep : string) => dep !== 'exports';

const resolveModule = (moduleId : ModuleId, moduleMetadatas : ModuleMetadatas, initiateOrder : string[], resolvingSet : Set<ModuleId> = new Set()) => {
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
  moduleMetadata.deps.filter(depFilter).forEach((dep : ModuleId) => {
    resolveModule(dep, moduleMetadatas, initiateOrder, resolvingSet);
  });
  initiateOrder.push(moduleId);
  resolvingSet.delete(moduleId);
};

const compileModule = (moduleId : ModuleId, moduleMetadatas : ModuleMetadatas) => {
  const moduleMetadata = moduleMetadatas[moduleId];
  moduleMetadata.exports = {};
  const args : any[] = [];
  moduleMetadata.deps.forEach((dep) => {
    if (dep === 'exports') {
      args.push(moduleMetadata.exports);
    } else {
      args.push(moduleMetadatas[dep].exports);
    }
  });
  moduleMetadata.factory(...args);
};

export class Env {
  moduleDefs : ModuleDefs;
  moduleMetadatas : ModuleMetadatas;
  initiateOrder : ModuleId[];

  constructor(moduleDefs? : ModuleDefs) {
    this.moduleDefs = moduleDefs || {};
    this.moduleMetadatas = {};
    this.initiateOrder = [];
  }

  _toFileName(moduleId : ModuleId) : string {
    return `/${moduleId}.ts`;
  }

  _fromFileName(fileName : any) : ModuleId {
    let moduleId = fileName;
    if (moduleId.startsWith('/')) {
      moduleId = moduleId.substr(1);
    }
    if (moduleId.endsWith('.ts')) {
      moduleId = moduleId.substr(0, moduleId.length - 3);
    }
    return moduleId;
  }

  _toModuleDefsForCompile() : ModuleDefsForCompile {
    return Object.keys(this.moduleDefs)
    .reduce((map : ModuleDefsForCompile, k : ModuleId ) => {
      return {
        ...map,
        [this._toFileName(k)]: this.moduleDefs[k],
      };
    }, {});
  }

  _compiledCodeToModuleMetadata(moduleId : ModuleId, code : string) : ModuleMetadata {
    const define = new Function('define', code);
    let deps : string[] = [];
    let factory : any;
    define((_deps : string[], _factory : Function) => {
      deps = _deps;
      factory = _factory;
    });

    return {
      id: moduleId,
      deps,
      factory,
      resolved: false,
      instance: null,
    };
  }

  _fromModuleDefsForCompile(moduleDefsForCompile : ModuleDefsForCompile) {
    const moduleIds : ModuleId[] = [];
    this.moduleMetadatas = Object.keys(moduleDefsForCompile)
    .reduce((map : ModuleMetadatas, k : ModuleId) => {
      const moduleId = this._fromFileName(k);
      moduleIds.push(moduleId);
      return {
        ...map,
        [moduleId]: this._compiledCodeToModuleMetadata(moduleId, moduleDefsForCompile[k]),
      };
    }, {});
    return moduleIds;
  }

  _compile(moduleIds : ModuleId[] = []) {
    this.initiateOrder = [];
    moduleIds.forEach(
      moduleId => resolveModule(moduleId, this.moduleMetadatas, this.initiateOrder)
    );
    this.initiateOrder.forEach(
      moduleId => compileModule(moduleId, this.moduleMetadatas)
    );
  }

  getExports(moduleId : ModuleId) {
    const moduleMetadata = this.moduleMetadatas[moduleId];
    return moduleMetadata.exports;
  }

  build() {
    return axios({
      method: 'post',
      url: 'api/compile',
      data: {
        modules: this._toModuleDefsForCompile(),
      },
    })
    .then(({ data: m }) => {
      // console.log('m :', m);
      const moduleIds = this._fromModuleDefsForCompile(m);
      this._compile(moduleIds);
    });
  }
}

export const createEnv = (moduleDefs? : ModuleDefs) => {
  return new Env(moduleDefs);
};
