/* eslint-disable no-underscore-dangle, react/no-this-in-sfc, no-param-reassign */
import {
  FieldValue,
  RawEventArgs,
} from './commonTypes';

import {
  LinkInfoBasic,
  IFieldLink,
  ValidateResult,
} from './fieldLinkInterfaces';

export interface LinkInfoMergeChildren<
  FieldLink extends IFieldLink<FieldLink>
> extends LinkInfoBasic<FieldLink> {
  isMergingChildElements?: boolean;
}

export interface OnFieldValueChangeLinkInfo<
  FieldLink extends IFieldLink<FieldLink>
> extends LinkInfoBasic<FieldLink> {
}

export type CvtFromView<
  FieldLink extends IFieldLink<FieldLink>
> = (valueArgs: any, linkInfo : LinkInfoBasic<FieldLink>) => any;

export type CvtToView<
  FieldLink extends IFieldLink<FieldLink>
> = (valueInState: any, linkInfo : LinkInfoBasic<FieldLink>) => any;

export type CvtToOutput<
  FieldLink extends IFieldLink<FieldLink>
> = (normalizeValue: any, linkInfo : LinkInfoBasic<FieldLink>) => any;

export type CvtNormalize<
  FieldLink extends IFieldLink<FieldLink>
> = (valueInState: any, linkInfo : LinkInfoBasic<FieldLink>) => any;

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

export type MergeChildrenFunction<FieldLink extends IFieldLink<FieldLink>> = (
  children1 : any[],
  children2 : any[],
  linkInfo : LinkInfoMergeChildren<FieldLink>,
) => any[];

export type ValidateFunction<FieldLink extends IFieldLink<FieldLink>> = (
  valueInState: any,
  linkInfo: LinkInfoBasic<FieldLink>,
) => ValidateResult;
