import React, { Component } from 'react';
import { Menu, Icon, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import NavProductsItems from '~/modules/ecommerceCoreUI/components/header/headerActions/NavProductsItems';
import NavNotification from '~/modules/ecommerceCoreUI/components/header/headerActions/NavNotification';
import NavWishList from '~/modules/ecommerceCoreUI/components/header/headerActions/NavWishList';
import { cssMediaMax } from '~/modules/core/utils/cssHelpers/cssMedia';


const MenuContainer = styled(Menu)`
  ${cssMediaMax.tablet`
    margin-bottom: 0 !important;
  `}
  .item {
     padding-right: ${props => props.theme.paddings.large}px !important;
     padding-left: 0px !important;
  }
  .item:before {
    background: none !important;
  }
`;

const BurgerMenuIcon = styled(Icon)`
  padding-left: ${props => props.theme.paddings.large}px !important;
  color: ${props => props.theme.colors.primary};
  font-size: ${props => props.theme.fonts.sizes.xLarge}px !important;
  object-fit: contain;
`;
const ImageLogo = styled(Image)`
  max-width: 74% !important;
`;


class HeaderMobile extends Component {
  showSideMenu = () => {
    document.getElementById('root').classList.toggle('root-animation');
  };

  render() {
    return (
      <MenuContainer>
        <Menu.Item className="menu-btn">
          <BurgerMenuIcon name="bars" onClick={this.showSideMenu} />
        </Menu.Item>
        <Menu.Item>
          <Link to="/" href="/">
            <ImageLogo
              src="/images/Header/logo-header.png"
              className="logo"
            />
          </Link>
        </Menu.Item>
        <Menu.Menu position="right">
          <Menu.Item>
            <NavWishList />
          </Menu.Item>
          <Menu.Item>
            <NavNotification />
          </Menu.Item>
          <Menu.Item>
            <NavProductsItems />
          </Menu.Item>
        </Menu.Menu>
      </MenuContainer>
    );
  }
}

export default HeaderMobile;
