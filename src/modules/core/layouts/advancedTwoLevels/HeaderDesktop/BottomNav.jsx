
import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { withModules } from '../../../utils/modulesLoader';
import MenuItemRenderer from './MenuItemRenderer';

const SubMenuContainer = styled.div` 
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const LightBorderMenu = styled.div`
  &&& {
    display: flex;
    align-items: center;
    justify-content: space-between;
    
    border: solid;
    border-color: rgba(40,40,40,0.1);
    border-width: 1px;
    background-color: white;

    ${props => props['custom-header-styles']}
  }
`;

class BottomNav extends Component {
  state = {
    dropdownMenuVisible: false,
  };
  handleClick = () => {
    this.setState({ dropdownMenuVisible: !this.state.dropdownMenuVisible });
  };
  render() {
    const { menuInfo, customHeaderStyles } = this.props;

    return (
      <LightBorderMenu custom-header-styles={customHeaderStyles}>
        <SubMenuContainer>
          {menuInfo.left.map(item => (
            <MenuItemRenderer key={item.key} itemInfo={item} />
          ))}
        </SubMenuContainer>
        <SubMenuContainer position="right">
          {menuInfo.right.map(item => (
            <MenuItemRenderer key={item.key} itemInfo={item} />
          ))}
        </SubMenuContainer>
      </LightBorderMenu>
    );
  }
}

BottomNav.MenuInfoPropTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    ...MenuItemRenderer.ItemInfoPropTypes,
  })),
};

BottomNav.propTypes = PropTypes.shape({
  customHeaderStyles: PropTypes.string,
  menuInfo: PropTypes.shape({
    left: PropTypes.shape({
      ...BottomNav.MenuInfoPropTypes,
    }),
    right: PropTypes.shape({
      ...BottomNav.MenuInfoPropTypes,
    }),
  }).isRequired,
}).isRequired;

export default withModules(BottomNav);
