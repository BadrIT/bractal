/* eslint-disable function-paren-newline */

import React from 'react';
import PropTypes from 'prop-types';
import cuid from 'cuid';
import styled from 'styled-components';
import _ from 'lodash';

import Header from './Header';

import { DefaultHeaderTopRowContainer, DefaultHeaderBottomRowContainer } from './HeaderRowContainers';


const SideMenuContent = styled.div`
  position: relative;
`;

// TODO : Move to JS Helpers
const generateRandomKeys = (current) => {
  if (React.isValidElement(current)) {
    return current;
  } else if (_.isPlainObject(current)) {
    return {
      ..._.mapValues(current, value => generateRandomKeys(value)),
      key: cuid(),
    };
  } else if (_.isArray(current)) {
    return current.map(entry => generateRandomKeys(entry));
  }
  return current;
};

class SiteHeader extends React.Component {
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

  render() {
    const {
      menuInfo,
      desktopTopRowContainer,
      desktopBottomRowContainer,
      mobileTopRowContainer,
      mobileBottomRowContainer,
    } = this.props;
    const {
      width,
    } = this.state;

    const isMobile = width <= 1201;
    let header;

    const menuInfoWithKeys = generateRandomKeys(menuInfo);

    // TODO : Use the cssMedia form
    if (isMobile) {
      header = (
        <SideMenuContent>
          <Header
            menuInfo={menuInfoWithKeys.mobile}
            topRowContainer={mobileTopRowContainer}
            bottomRowContainer={mobileBottomRowContainer}
          />
        </SideMenuContent>
      );
    } else {
      header = (
        <Header
          menuInfo={menuInfoWithKeys.desktop}
          topRowContainer={desktopTopRowContainer}
          bottomRowContainer={desktopBottomRowContainer}
        />
      );
    }

    return header;
  }
}

SiteHeader.defaultProps = {
  desktopTopRowContainer: DefaultHeaderTopRowContainer,
  desktopBottomRowContainer: DefaultHeaderBottomRowContainer,

  mobileTopRowContainer: DefaultHeaderTopRowContainer,
  mobileBottomRowContainer: DefaultHeaderBottomRowContainer,
};

SiteHeader.propTypes = {
  desktopTopRowContainer: PropTypes.element,
  desktopBottomRowContainer: PropTypes.element,

  mobileTopRowContainer: PropTypes.element,
  mobileBottomRowContainer: PropTypes.element,

  menuInfo: PropTypes.shape({
    desktop: PropTypes.shape({
      ...Header.MenuInfoPropTypes,
    }).isRequired,
    mobile: PropTypes.shape({
      ...Header.MenuInfoPropTypes,
    }),
  }).isRequired,
};

export default SiteHeader;
