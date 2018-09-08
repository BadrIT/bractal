import _ from 'lodash';

export default (items, separator) => {
  if (items.length === 0) {
    return items;
  }

  const itemsWithExtraSeparator = [
    ..._.flatten(items.map(item => ([
      item,
      separator,
    ]))),
  ];

  return itemsWithExtraSeparator.slice(
    0,
    itemsWithExtraSeparator.length - 1,
  );
};
