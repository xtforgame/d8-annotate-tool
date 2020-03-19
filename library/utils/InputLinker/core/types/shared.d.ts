import { LinkInfoBasic, IFieldLink, ValidateResult } from './fieldLinkInterfaces';
export interface LinkInfoMergeChildren<FieldLink extends IFieldLink<FieldLink>> extends LinkInfoBasic<FieldLink> {
    isMergingChildElements?: boolean;
}
export interface OnFieldValueChangeLinkInfo<FieldLink extends IFieldLink<FieldLink>> extends LinkInfoBasic<FieldLink> {
}
export declare type CvtFromView<FieldLink extends IFieldLink<FieldLink>> = (valueArgs: any, linkInfo: LinkInfoBasic<FieldLink>) => any;
export declare type CvtToView<FieldLink extends IFieldLink<FieldLink>> = (valueInState: any, linkInfo: LinkInfoBasic<FieldLink>) => any;
export declare type CvtToOutput<FieldLink extends IFieldLink<FieldLink>> = (normalizeValue: any, linkInfo: LinkInfoBasic<FieldLink>) => any;
export declare type CvtNormalize<FieldLink extends IFieldLink<FieldLink>> = (valueInState: any, linkInfo: LinkInfoBasic<FieldLink>) => any;
export interface Converter<FieldLink extends IFieldLink<FieldLink>> {
    fromView: CvtFromView<FieldLink>;
    toView: CvtToView<FieldLink>;
    toOutput: CvtToOutput<FieldLink>;
    normalize: CvtNormalize<FieldLink>;
}
export interface ConfigConverter<FieldLink extends IFieldLink<FieldLink>> {
    fromView?: CvtFromView<FieldLink>;
    toView?: CvtToView<FieldLink>;
    toOutput?: CvtToOutput<FieldLink>;
    normalize?: CvtNormalize<FieldLink>;
}
export declare type MergeChildrenFunction<FieldLink extends IFieldLink<FieldLink>> = (children1: any[], children2: any[], linkInfo: LinkInfoMergeChildren<FieldLink>) => any[];
export declare type ValidateFunction<FieldLink extends IFieldLink<FieldLink>> = (valueInState: any, linkInfo: LinkInfoBasic<FieldLink>) => ValidateResult;
