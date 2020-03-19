import {
  ProxyTypeName,
  ProxyType,
} from '../interfaces';

export const proxyTypeArray : ProxyType[] = [
  {
    name: ProxyTypeName.Value,
    defaultSliceName: 'fields',
  },
  {
    name: ProxyTypeName.Error,
    defaultSliceName: 'errors',
  },
  {
    name: ProxyTypeName.CustomState,
  },
];

export const proxyTypes : { [s : string] : string } = {};
export const proxyTypeMap : { [s : string] : ProxyType } = {};

proxyTypeArray.forEach((t) => {
  proxyTypes[t.name] = t.name;
  proxyTypeMap[t.name] = t;
});
