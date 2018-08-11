import React from 'react';
import PropTypes from 'prop-types';
import cuid from 'cuid';
import styled from 'styled-components';
// TODO : this should be moved to Header.js as part of Mobile Menu handling
import NavProductsSearch from '~/modules/ecommerceCoreUI/components/header/headerActions/NavProductsSearch';
import HeaderDesktop from './HeaderDesktop';
import HeaderMobile from './HeaderMobile';


const SideMenuContent = styled.div`
  position: relative;
`;

class TwoLevelsHeader extends React.Component {
  state = {
    width: window.innerWidth,
  };

  componentWillMount() {
    window.addEventListener('resize', this.handleWindowSizeChange);
  }

  // make sure to remove the listener
  // when the component is not mounted anymore
  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowSizeChange);
  }

  handleWindowSizeChange = () => {
    this.setState({ width: window.innerWidth });
  };

  generateMenuItemsKeys = (menuInfo) => {
    const AllItemsGroups = [
      menuInfo.desktop.top.left,
      menuInfo.desktop.top.center,
      menuInfo.desktop.top.right,

      menuInfo.desktop.bottom.left,
      menuInfo.desktop.bottom.center,
      menuInfo.desktop.bottom.right,

      menuInfo.mobile.top.left,
      menuInfo.mobile.top.center,
      menuInfo.mobile.top.right,

      menuInfo.mobile.bottom.left,
      menuInfo.mobile.bottom.center,
      menuInfo.mobile.bottom.right,
    ];

    AllItemsGroups.forEach((menuSpecs) => {
      if (!menuSpecs) {
        return;
      }
      menuSpecs.forEach((item) => {
        if (item.key) return;
        // eslint-disable-next-line no-param-reassign
        item.key = cuid();
      });
    });
  };

  render() {
    const { menuInfo, desktopTopHeaderStyles, desktopBottomHeaderStyles } = this.props;
    const {
      width,
    } = this.state;

    const isMobile = width <= 1201;
    let header;

    this.generateMenuItemsKeys(menuInfo);

    if (isMobile) {
      header = (
        <SideMenuContent>
          <HeaderMobile />
          {/* // TODO : this should be moved to Header.js as part of Mobile Menu handling.  */}
          <NavProductsSearch />
        </SideMenuContent>
      );
    } else {
      header = (
        <div>
          <HeaderDesktop
            menuInfo={menuInfo.desktop}
            topHeaderStyles={desktopTopHeaderStyles}
            bottomHeaderStyles={desktopBottomHeaderStyles}
          />
        </div>
      );
    }

    return header;
  }
}

TwoLevelsHeader.propTypes = PropTypes.shape({
  desktopTopHeaderStyles: PropTypes.string,
  desktopBottomHeaderStyles: PropTypes.string,
  menuInfo: PropTypes.shape({
    desktop: PropTypes.shape({
      ...HeaderDesktop.MenuInfoPropTypes,
    }).isRequired,
    mobile: PropTypes.shape({
      // TODO : Change this when a mobile version is ready
      ...HeaderMobile.MenuInfoPropTypes,
    }),
  }).isRequired,
}).isRequired;

export default TwoLevelsHeader;
