import _ from 'lodash';

export default (items, separator) => {
  if (!items) {
    return [];
  } else if (items.length === 0 || !_.isArray(items)) {
    return [items];
  }

  const itemsWithExtraSeparator = [
    ..._.flatten(items.map(item =>
      (item ? ([item, separator]) : null))),
  ];
  return itemsWithExtraSeparator.slice(
    0,
    itemsWithExtraSeparator.length - 1,
  );
};
