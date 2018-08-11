import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

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

const BorderLessHeader = styled.div`  
  &&& {
    display: flex;
    align-items: center;
    justify-content: space-between;
    
    border: none;
    box-shadow: none;
    background-color: transparent;
    border-radius: 8px;

    .item:before {
      background: rgba(34,36,38,0);
    }

    ${props => props['custom-header-styles']}
  }
`;

const TopNav = ({ menuInfo, customHeaderStyles }) => (
  <BorderLessHeader custom-header-styles={customHeaderStyles}>
    <SubMenuContainer>
      {menuInfo.left.map(item => (
        <MenuItemRenderer key={item.key} itemInfo={item} />
      ))}
    </SubMenuContainer>
    <CenteredSubMenuContainer>
      {menuInfo.center.map(item => (
        <MenuItemRenderer key={item.key} itemInfo={item} />
      ))}
    </CenteredSubMenuContainer>
    <SubMenuContainer>
      {menuInfo.right.map(item => (
        <MenuItemRenderer key={item.key} itemInfo={item} />
      ))}
    </SubMenuContainer>
  </BorderLessHeader>
);

TopNav.propTypes = PropTypes.shape({
  customHeaderStyles: PropTypes.string,
  menuInfo: PropTypes.shape({
    left: PropTypes.shape({
      ...MenuItemRenderer.ItemInfoPropTypes,
    }),
    right: PropTypes.shape({
      ...MenuItemRenderer.ItemInfoPropTypes,
    }),
  }).isRequired,
}).isRequired;

export default TopNav;
