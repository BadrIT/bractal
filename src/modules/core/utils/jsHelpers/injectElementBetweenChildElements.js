/* eslint-disable function-paren-newline */
import React from 'react';
import _ from 'lodash';
import cuid from 'cuid';

const generateMissingKeys = element => (element.props.key ? (
  element
) : (
  React.cloneElement(
    element,
    {
      key: cuid(),
    },
  )
));

export default (items, separator, generateKeysIfNeeded) => {
  if (!separator) {
    return items;
  }
  if (!items) {
    return [];
  } else if (items.length === 0 || !_.isArray(items)) {
    return [items];
  }

  let elementItems = items.filter(element =>
    (_.isArray(element) && element.length > 0) ||
    React.isValidElement(element) ||
    (_.isString(element) && element.trim().length > 0),
  );

  elementItems = _.flatten(elementItems);

  const keyedSeparator = () => (generateKeysIfNeeded ? generateMissingKeys(separator) : separator);

  const itemsWithExtraSeparator = [
    ..._.flatten(elementItems.map(item =>
      (item ? ([item, keyedSeparator()]) : null))),
  ];
  return itemsWithExtraSeparator.slice(
    0,
    itemsWithExtraSeparator.length - 1,
  );
};
