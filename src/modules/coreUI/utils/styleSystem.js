import { css } from 'emotion';
import _ from 'lodash';

import { responsiveStyle } from '~/modules/coreUI/utils/infereStyle';
import changeCase from 'change-case';

const styleAliases = [
  ['width', 'w'],
  ['height', 'h'],
  ['minWidth'],
  ['minHeight'],
  ['maxWidth'],
  ['maxHeight'],
  ['padding', 'p'],
  ['paddingTop', 'pt'],
  ['paddingBottom', 'pb'],
  ['paddingLeft', 'pl'],
  ['paddingRight', 'pr'],
  ['margin', 'm'],
  ['marginTop', 'mt'],
  ['marginBottom', 'mb'],
  ['marginLeft', 'ml'],
  ['marginRight', 'mr'],
];

const styleExists = (props, style) =>
  style.some(styleName => props[styleName]);

export const getSize = (props, size) => {
  if (_.isNumber(size)) {
    return `${size * props.theme.new.spacer}px`;
  } else if (size && parseFloat(size).toString() === size) {
    return `${parseFloat(size.toString()) * props.theme.new.spacer}px`;
  }
  return size;
};

export default props => css`
  ${_.flatten(styleAliases.filter(aliasGroup => styleExists(props, aliasGroup)).map((aliasGroup) => {
    const styleName = aliasGroup[0];
    return aliasGroup.map(styleAlias => props[styleAlias] &&
      responsiveStyle(props, styleAlias, size => css`
        ${changeCase.paramCase(styleName)}: ${getSize(props, size)};
      `));
  }))};
  `;
