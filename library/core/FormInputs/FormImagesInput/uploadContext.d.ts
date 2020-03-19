import React from 'react';
import * as Rx from 'rxjs';
import { ProcessFileResult } from '~/utils/imageHelpers';
export declare type ObservableInfo = {
    uploadProgressSubject: Rx.BehaviorSubject<number>;
};
export declare type ImageInfo = {
    id: string;
    content?: string;
    imageUploadInfo?: ProcessFileResult;
    image: {
        id: string;
        imgUrl: string;
        hash: string;
        name: string;
        metadata: {
            [s: string]: any;
        };
    };
};
export declare const observableInfo: {
    [resourceId: string]: ObservableInfo;
};
export declare type GetObservableInfo = (resourceId: string) => ObservableInfo;
export declare const getObservableInfo: (resourceId: string) => ObservableInfo;
export declare type HandleUpload = (imageInfo: ImageInfo, uploadProgressSubject: Rx.BehaviorSubject<number>) => Promise<any>;
export declare const createHandleUploadFunction: (urlBase: any) => (imageInfo: ImageInfo, uploadProgressSubject: Rx.BehaviorSubject<number>) => Promise<null>;
export declare type UploadImage = (imageInfo: ImageInfo, handleUpload: HandleUpload) => Promise<any>;
export declare const uploadImage: (imageInfo: ImageInfo, handleUpload: HandleUpload) => Promise<any>;
export declare type Context = {
    getObservableInfo: GetObservableInfo;
    uploadImage: UploadImage;
};
export declare const isImageUploaded: (imageInfo: ImageInfo) => boolean;
declare const _default: React.Context<Context>;
export default _default;
