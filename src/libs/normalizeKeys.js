/**
 * `createHumps` is referenced from `lodash-humps` repo.
 * Reference: https://github.com/cape-io/lodash-humps/blob/master/src/createHumps.js
 */
import {
  camelCase,
  isArray,
  isObjectLike,
  isPlainObject,
  map,
  set,
  snakeCase,
  transform,
} from 'lodash';

function createIteratee(converter, self) {
  return (result, value, key) =>
    set(result, converter(key), isObjectLike(value) ? self(value) : value);
}

export function createHumps(keyConverter) {
  return function humps(node) {
    if (isArray(node)) {
      return map(node, humps);
    }
    if (isPlainObject(node)) {
      return transform(node, createIteratee(keyConverter, humps));
    }
    return node;
  };
}

export const toCamelCaseKeys = createHumps(camelCase);
export const toSnakeCaseKeys = createHumps(snakeCase);

const normalizeKeys = {
  createHumps,
  toCamelCaseKeys,
  toSnakeCaseKeys,
};

export default normalizeKeys;
