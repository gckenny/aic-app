import { isArray, isNaN, isString, parseInt } from 'lodash';

import ipRegex from './ipRegex';

export const isValidIp = (string) => ipRegex({ exact: true }).test(string);
export const isValidIPv4 = (string) => ipRegex.v4({ exact: true }).test(string);
export const isValidIPv6 = (string) => ipRegex.v6({ exact: true }).test(string);
export const checkIPVersion = (string) => {
  if (!isValidIp(string)) {
    return undefined;
  }

  return isValidIp.v4(string) ? 4 : 6;
};

// Refer to https://jsfiddle.net/bryan_weaver/9WMAB for more details
export const isValidGUID = (str) => {
  if (!isString(str)) {
    return false;
  }

  if (str[0] === '{') {
    str = str.substring(1, str.length - 1);
  }
  var regexGuid =
    /^(\{){0,1}[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}(\}){0,1}$/gi;
  return regexGuid.test(str);
};

export const filterValidGuids = (guids) => {
  if (!isArray(guids)) {
    throw TypeError(`Expect number but got ${typeof guids}`);
  }
  return guids.filter(isValidGUID);
};

export const isNumberFormat = (target) => {
  return !isNaN(parseInt(target));
};
