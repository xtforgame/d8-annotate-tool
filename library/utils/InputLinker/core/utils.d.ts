import { IFieldLink, Converter } from './interfaces';
export declare const toArray: <T = any>(value: any) => T[];
export declare const mwDynamicNonPropsFilter: (nonProps: any, dist?: any) => any;
export declare const createConverter: <FieldLink extends IFieldLink<FieldLink>>(converter: any) => Converter<FieldLink>;
