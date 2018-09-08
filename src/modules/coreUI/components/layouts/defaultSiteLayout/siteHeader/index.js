/* eslint-disable function-paren-newline */

import React from 'react';
import PropTypes from 'prop-types';
import cuid from 'cuid';

import Media from 'react-media';

import { mediaQueryMax } from '~/modules/core/utils/cssHelpers/cssMedia';

import _ from 'lodash';

import Header from './Header';

import { DefaultHeaderTopRowContainer, DefaultHeaderBottomRowContainer } from './HeaderRowContainers';
import { setRoleAsLayoutPageContent, setRoleAsLayoutHeader, setRoleAsLayoutSideMenu } from './componentsRoles';


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

const generateRandomKeysForMenu = (menuInfo, isMobile) => {
  const info = generateRandomKeys(menuInfo);
  return isMobile ? info.mobile : info.desktop;
};

const SiteHeader = ({
  menuInfo,
  desktopTopRowContainer,
  desktopBottomRowContainer,
  mobileTopRowContainer,
  mobileBottomRowContainer,
}) => (
  <Media query={mediaQueryMax('tablet')}>
    {isMobile => (
      <Header
        menuInfo={generateRandomKeysForMenu(menuInfo, isMobile)}
        topRowContainer={isMobile ? mobileTopRowContainer : desktopTopRowContainer}
        bottomRowContainer={isMobile ? mobileBottomRowContainer : desktopBottomRowContainer}
      />
    )}
  </Media>
);

SiteHeader.defaultProps = {
  desktopTopRowContainer: DefaultHeaderTopRowContainer,
  desktopBottomRowContainer: DefaultHeaderBottomRowContainer,

  mobileTopRowContainer: DefaultHeaderTopRowContainer,
  mobileBottomRowContainer: DefaultHeaderBottomRowContainer,
};

SiteHeader.propTypes = {
  desktopTopRowContainer: PropTypes.element, // eslint-disable-line react/no-unused-prop-types
  desktopBottomRowContainer: PropTypes.element, // eslint-disable-line react/no-unused-prop-types

  mobileTopRowContainer: PropTypes.element, // eslint-disable-line react/no-unused-prop-types
  mobileBottomRowContainer: PropTypes.element, // eslint-disable-line react/no-unused-prop-types

  menuInfo: PropTypes.shape({ // eslint-disable-line react/no-unused-prop-types
    desktop: PropTypes.shape({
      ...Header.MenuInfoPropTypes,
    }).isRequired,
    mobile: PropTypes.shape({
      ...Header.MenuInfoPropTypes,
    }),
  }).isRequired,
};

export default SiteHeader;

export const LayoutHeader = props => <React.Fragment>{props.children}</React.Fragment>;
LayoutHeader.propTypes = { children: PropTypes.element.isRequired };
setRoleAsLayoutHeader(LayoutHeader);

export const LayoutPageContent = props => <React.Fragment>{props.children}</React.Fragment>;
LayoutPageContent.propTypes = { children: PropTypes.element.isRequired };
setRoleAsLayoutPageContent(LayoutPageContent);

export const LayoutSideMenu = props => <React.Fragment>{props.children}</React.Fragment>;
LayoutSideMenu.propTypes = { children: PropTypes.element.isRequired };
setRoleAsLayoutSideMenu(LayoutSideMenu);
