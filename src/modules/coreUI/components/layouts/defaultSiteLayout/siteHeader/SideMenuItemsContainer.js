import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';

import { Column } from '~/modules/coreUI/components/layouts/helpers/LinearLayout';
import Spacer from '~/modules/coreUI/components/layouts/helpers/Spacer';

import MenuItemRenderer from './MenuItemRenderer';


const CustomLinkStyle = props => css`
  font-size: ${props.theme.fonts.sizes.xLarge}px;
  color: ${props.theme.colors.invertedLabels.important};
  padding: ${props.theme.paddings.large}px;

  &:hover {
    color: ${props.theme.colors.invertedLabels.normal};
  }
`;

const appendDefaultLinkStyle = (itemInfo) => {
  if (itemInfo.customStyle) {
    return {
      ...itemInfo,
      customStyle: props => css`
        ${CustomLinkStyle(props)}
        ${itemInfo.customStyle(props)}
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
