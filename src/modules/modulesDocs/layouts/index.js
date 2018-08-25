import React from 'react';
import { translate } from 'react-i18next';
import styled from 'styled-components';

import AllLoadedModulesContent from '~/modules/modulesDocs/containers/AllLoadedModulesContent';
import { Row, Column } from '~/modules/coreUI/components/layouts/helpers/LinearLayout';
import { cssMediaMax } from '~/modules/core/utils/cssHelpers/cssMedia';

import Header from './Header';

const SIDE_MENU_WIDTH = 200;

const SideMenu = styled(Column)`
  width: 0px;
  display: none;
  
  ${cssMediaMax.tablet`
    display: block;
    max-width: ${SIDE_MENU_WIDTH}px;
    min-width: ${SIDE_MENU_WIDTH}px;
  `}
`;

const RootContainer = styled(Row)`
  width: 100vw;
  ${cssMediaMax.tablet`
    width: calc(100vw + ${SIDE_MENU_WIDTH}px);
  `}

  background-color: ${props => props.theme.colors.primary};
`;

const PageContent = styled(Column)`
  width: '100vw';

  background-color: ${props => props.theme.colors.named.white};
`;

const Layout = () => (
  <RootContainer topAligned stretchJustified>
    <SideMenu >
      <Column>
        <h1>Hello</h1>
        <h2>Bye</h2>
      </Column>
    </SideMenu>
    <PageContent grow>
      <Header />
      <AllLoadedModulesContent />
    </PageContent>
  </RootContainer>
);

export default translate('core')(Layout);
