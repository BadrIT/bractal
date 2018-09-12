import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'styled-components';

import { Column } from '~/modules/coreUI/components/layouts/helpers/LinearLayout';
import Spacer from '~/modules/coreUI/components/layouts/helpers/Spacer';

import MenuItemRenderer from './MenuItemRenderer';


const CustomLinkStyle = css`
  font-size: ${props => props.theme.fonts.sizes.xLarge}px;
  color: ${props => props.theme.colors.invertedLabels.important};
  padding: ${props => props.theme.paddings.large}px;

  &:hover {
    color: ${props => props.theme.colors.invertedLabels.normal};
  }
`;

const appendDefaultLinkStyle = (itemInfo) => {
  if (itemInfo.customStyle) {
    return {
      ...itemInfo,
      customStyle: css`
        ${CustomLinkStyle}
        ${itemInfo.customStyle}
      `,
    };
  }
  return {
    ...itemInfo,
    customStyle: CustomLinkStyle,
  };
};


const SideMenuItemsContainer = ({
  menuInfo,
}) => (
  <Column leftAligned>
    <Spacer />
    {menuInfo && menuInfo.top && menuInfo.top.map(item => (
      <MenuItemRenderer
        key={item.key}
        itemInfo={appendDefaultLinkStyle(item)}
      />
    ))}
  </Column>
);

SideMenuItemsContainer.propTypes = PropTypes.shape({
  menuInfo: PropTypes.shape({
    top: PropTypes.arrayOf(PropTypes.shape({
      ...MenuItemRenderer.ItemInfoPropTypes,
    })),
  }),
}).isRequired;

export default SideMenuItemsContainer;
