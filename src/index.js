
import React from 'react';

import BractalCore from '~/modules/core/containers/main';
import modulesConfig from '~/modulesConfig';

import Layout, { LayoutHeader, LayoutPageContent, LayoutSideMenu } from '~/modules/coreUI/components/layouts/defaultSiteLayout';

import Header from '~/modules/modulesDocs/containers/main/Header';
import PageContent from '~/modules/modulesDocs/containers/main/PageContent';
import SideMenu from '~/modules/modulesDocs/containers/main/SideMenu';

import './index.css';
import * as serviceWorker from './serviceWorker';

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

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