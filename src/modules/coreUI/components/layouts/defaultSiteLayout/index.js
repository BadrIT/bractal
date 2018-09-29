import React from 'react';
import { translate } from 'react-i18next';
import styled from 'react-emotion';
import PropTypes from 'prop-types';

import { Row, Column } from '~/modules/coreUI/components/layouts/helpers/LinearLayout';
import { cssMediaMax } from '~/modules/core/utils/cssHelpers/cssMedia';
import withSideMenuTracker from '~/modules/core/utils/sideMenuHelpers/withSideMenuTracker';

import { setRoleAsLayoutPageContent, setRoleAsLayoutHeader, setRoleAsLayoutSideMenu, getLayoutHeader, getLayoutPageContent, getLayoutSideMenu } from './componentsRoles';

const SIDE_MENU_WIDTH = 280;

const SideMenu = styled(Column)`
  width: 0px;
  display: none;
  
  ${props => props.isSideMenuOpen && cssMediaMax.tablet`
    display: flex;
    align-items: flex-start;
    padding-left: ${props2 => props2.theme.paddings.large}px;
    max-width: ${SIDE_MENU_WIDTH}px;
    min-width: ${SIDE_MENU_WIDTH}px;
  `}
`;

const RootContainer = styled(Row)`
  width: 100vw;
  min-height: 100vh;
  
  ${props => props.isSideMenuOpen && cssMediaMax.tablet`
    width: calc(100vw + ${SIDE_MENU_WIDTH}px);
  `}

  background-color: ${props => props.theme.colors.primary};
`;

const PageContent = styled(Column)`
  width: '100vw'; 
  min-height: 100vh;
  justify-content: flex-start;

  background-color: ${props => props.theme.colors.named.white};
`;

const Layout = ({ isSideMenuOpen, children }) => (
  <RootContainer topAligned stretchJustified isSideMenuOpen={isSideMenuOpen}>
    <SideMenu isSideMenuOpen={isSideMenuOpen}>
      {getLayoutSideMenu(children)}
    </SideMenu>
    <PageContent grow>
      {getLayoutHeader(children)}
      {getLayoutPageContent(children)}
    </PageContent>
  </RootContainer>
);

Layout.propTypes = {
  isSideMenuOpen: PropTypes.bool.isRequired,
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};

export default translate('core')(withSideMenuTracker(Layout));

export const LayoutHeader = props => <React.Fragment>{props.children}</React.Fragment>;
LayoutHeader.propTypes = { children: PropTypes.element.isRequired };
setRoleAsLayoutHeader(LayoutHeader);

export const LayoutPageContent = props => <React.Fragment>{props.children}</React.Fragment>;
LayoutPageContent.propTypes = { children: PropTypes.element.isRequired };
setRoleAsLayoutPageContent(LayoutPageContent);

export const LayoutSideMenu = props => <React.Fragment>{props.children}</React.Fragment>;
LayoutSideMenu.propTypes = { children: PropTypes.element.isRequired };
setRoleAsLayoutSideMenu(LayoutSideMenu);
