export declare function isUploadSupported(): boolean;
export declare function isFileReaderSupported(): {
    new (form?: HTMLFormElement | undefined): FormData;
    prototype: FormData;
};
export declare const defaultHashFunc: (data: any) => any;
export declare type ProcessFileResult = {
    file: string;
    fileName: string;
    fileType: string;
    dataURL: string;
    hash?: string;
};
export declare function processFile(dataURL: any, file: any, options?: any): Promise<ProcessFileResult>;
export declare const readFile: (file: any, options?: {}) => Promise<unknown>;
