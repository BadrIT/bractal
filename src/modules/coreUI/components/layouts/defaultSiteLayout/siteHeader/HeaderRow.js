import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

import MenuItemRenderer from './MenuItemRenderer';

const SubMenuContainer = styled.div` 
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const CenteredSubMenuContainer = styled(SubMenuContainer)`
  justify-content: stretch;
  flex-grow: 1;
`;

const HeaderRow = ({
  menuInfo,
  headerRowContainer,
}) => {
  const HeaderRowContainer = headerRowContainer;

  return (
    <HeaderRowContainer>
      <SubMenuContainer>
        {menuInfo && menuInfo.left && menuInfo.left.map(item => (
          <MenuItemRenderer key={item.key} itemInfo={item} />
        ))}
      </SubMenuContainer>
      <CenteredSubMenuContainer>
        {menuInfo && menuInfo.center && menuInfo.center.map(item => (
          <MenuItemRenderer key={item.key} itemInfo={item} />
        ))}
      </CenteredSubMenuContainer>
      <SubMenuContainer>
        {menuInfo && menuInfo.right && menuInfo.right.map(item => (
          <MenuItemRenderer key={item.key} itemInfo={item} />
        ))}
      </SubMenuContainer>
    </HeaderRowContainer>
  );
};

HeaderRow.MenuInfoPropTypes = {
  left: PropTypes.shape({
    ...MenuItemRenderer.ItemInfoPropTypes,
  }),
  center: PropTypes.shape({
    ...MenuItemRenderer.ItemInfoPropTypes,
  }),
  right: PropTypes.shape({
    ...MenuItemRenderer.ItemInfoPropTypes,
  }),
};

HeaderRow.propTypes = PropTypes.shape({
  ...HeaderRow.MenuInfoPropTypes,
  headerRowContainer: PropTypes.element.isRequired,
}).isRequired;

export default HeaderRow;
