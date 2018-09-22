import React from 'react';

import BractalCore from '~/modules/core/containers/main';
import modulesConfig from '~/modulesConfig';

import Layout, { LayoutHeader, LayoutPageContent, LayoutSideMenu } from '~/modules/coreUI/components/layouts/defaultSiteLayout';

import Header from '~/modules/modulesDocs/containers/main/Header';
import PageContent from '~/modules/modulesDocs/containers/main/PageContent';
import SideMenu from '~/modules/modulesDocs/containers/main/SideMenu';

import '~/styles/css/App.css';

// Loading gloabl styles
// eslint-disable-next-line no-unused-vars
import fontFamily from '~/modules/coreUI/globalStyles/fontFamily';

export const { renderApp } = BractalCore;
BractalCore.renderApp(
  modulesConfig,
  <Layout>
    <LayoutSideMenu>
      <SideMenu />
    </LayoutSideMenu>
    <LayoutHeader>
      <Header />
    </LayoutHeader>
    <LayoutPageContent>
      <PageContent />
    </LayoutPageContent>
  </Layout>,
);

export default BractalCore;
