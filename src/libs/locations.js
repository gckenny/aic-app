import { has, split } from 'lodash';
import qs from 'qs';

import { isUICExists } from './window';

export function getLocation() {
  return isUICExists ? window.parent.location : window.location;
}

export function getEndpointInventoryAppUrl() {
  const location = getLocation();
  return `${location.origin}/${getReplaceQueryParamHashResult(null, location.hash)}`;
}

export function getEndpointInventoryAppHashString() {
  const location = getLocation();
  return getReplaceQueryParamHashResult(null, location.hash);
}

export function checkHasQueryParam(paramName, location = window.location) {
  const queryParameters = getQueryParams(location);
  return has(queryParameters, paramName);
}

export function getQueryString(location = window.location) {
  return qs.stringify(getQueryParams(location), {
    arrayFormat: 'comma',
    encodeValuesOnly: true,
  });
}

export function getQueryParamValue(paramName, location = window.location) {
  const queryParameters = getQueryParams(location);
  const isMatched = has(queryParameters, paramName);
  return isMatched ? queryParameters[paramName] : null;
}

export function getQueryParams(location = window.location) {
  return getQueryParamsFromHashString(location.hash);
}

export function getQueryParamsFromHashString(hashString) {
  // Example:
  // hash
  //   #/?modal=recommended-list&from=ri
  // return
  //   { modal: 'recommended-list', from: 'ri' }
  return qs.parse(split(hashString, '?', 2)[1], {
    ignoreQueryPrefix: true,
    comma: true,
  });
}

export function removeQueryParams(paramNames, location = window.location) {
  let newHash = location.hash;
  paramNames.forEach((paramName) => {
    newHash = getRemoveQueryParamHashResult(paramName, newHash);
  });
  location.hash = newHash; // only assign to actual location once to prevent multiple history being pushed
}

export function removeQueryParam(paramName, location = window.location) {
  location.hash = getRemoveQueryParamHashResult(paramName, location.hash);
}

export function getRemoveQueryParamHashResult(paramName, hashString) {
  const paramMap = getQueryParamsFromHashString(hashString);
  delete paramMap[paramName];
  return getReplaceQueryParamHashResult(paramMap, hashString);
}

export function getAppendQueryParamHashResult(paramMap, hashString) {
  const queryParameters = getQueryParamsFromHashString(hashString);
  Object.assign(queryParameters, paramMap);
  return getReplaceQueryParamHashResult(queryParameters, hashString);
}

export function getReplaceQueryParamHashResult(paramMap, hashString) {
  const path = split(hashString, '?', 2)[0];
  const queryString = qs.stringify(paramMap, {
    arrayFormat: 'comma',
    encodeValuesOnly: true,
  });

  return queryString ? `${path}?${queryString}` : path;
}
