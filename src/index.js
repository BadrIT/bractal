import React from 'react';

import BractalCore from '~/modules/core/containers/main';
import modulesConfig from '~/modulesConfig';

import Layout from '~/modules/modulesDocs/layouts/index';

import './styles/css/App.css';

export const { renderApp } = BractalCore;
BractalCore.renderApp(
  modulesConfig,
  <Layout />,
);

export default BractalCore;
