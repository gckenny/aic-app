import { get, indexOf, isArray, isString, sortBy } from 'lodash';

export function sortByKey(array, key, order) {
  if (!isString(key)) {
    throw new TypeError(`Argument \`key\` must be a string, but get ${typeof key} instead.`);
  }

  if (!isArray(order)) {
    return sortBy(array, key);
  } else {
    return sortBy(array, (item) => {
      const itemValue = get(item, key);
      const itemOrderIndex = indexOf(order, itemValue);
      return itemOrderIndex === -1 ? order.length : itemOrderIndex;
    });
  }
}
