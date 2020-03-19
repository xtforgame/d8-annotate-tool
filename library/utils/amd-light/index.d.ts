export declare type ModuleId = string;
export declare type ModuleDef = any;
export declare type ModuleDefs = {
    [s: string]: ModuleDef;
};
export declare type ModuleDefsForCompile = {
    [s: string]: ModuleDef;
};
export declare type ModuleExports = {
    [s: string]: any;
};
export declare type ModuleMetadata = {
    id: ModuleId;
    deps: ModuleId[];
    factory: Function;
    resolved: boolean;
    instance: any;
    exports?: ModuleExports;
};
export declare type ModuleMetadatas = {
    [s: string]: ModuleMetadata;
};
export declare class Env {
    moduleDefs: ModuleDefs;
    moduleMetadatas: ModuleMetadatas;
    initiateOrder: ModuleId[];
    constructor(moduleDefs?: ModuleDefs);
    _toFileName(moduleId: ModuleId): string;
    _fromFileName(fileName: any): ModuleId;
    _toModuleDefsForCompile(): ModuleDefsForCompile;
    _compiledCodeToModuleMetadata(moduleId: ModuleId, code: string): ModuleMetadata;
    _fromModuleDefsForCompile(moduleDefsForCompile: ModuleDefsForCompile): string[];
    _compile(moduleIds?: ModuleId[]): void;
    getExports(moduleId: ModuleId): ModuleExports | undefined;
    build(): Promise<void>;
}
export declare const createEnv: (moduleDefs?: ModuleDefs | undefined) => Env;
