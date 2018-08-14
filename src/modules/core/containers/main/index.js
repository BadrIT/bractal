/* eslint-env browser */

import React from 'react';
import ReactDOM from 'react-dom';
import { I18nextProvider } from 'react-i18next';
import 'semantic-ui-css/semantic.min.css';
import { BrowserRouter as Router } from 'react-router-dom';

import { ThemeProvider } from 'styled-components';
import UserInfoProvider from '~/modules/core/utils/accessManagementHelpers/UserInfoProvider';
import ModalTrackerProvider from '~/modules/core/utils/modalHelpers/ModalTrackerProvider';
import DefaultLayout from '~/modules/core/layouts/simple/Layout';

import ModulesLoader from '~/modules/core/utils/modulesLoader';
import RelayInitializer from '~/modules/core/utils/relayHelpers/RelayInitializer';

import assert from '~/modules/core/utils/jsHelpers/assert';

import DefaultTheme from './defaultTheme';
import registerServiceWorker from './registerServiceWorker';
import i18nextLoader from './i18n'; // initialized i18next instance

let i18next = null;

const portalEndPoint = process.env.REACT_APP_GRAPHQL_ENDPOINT;
assert(portalEndPoint, "Backend endpoint isn't set correctly, call the npm build (or start), as follows : 'REACT_APP_GRAPHQL_ENDPOINT=http://portal.ayk-dev.badrit.com/graphql npm start''");

const renderApp = (AppComponent, theme, modules, environment) => {
  ReactDOM.render(
    <Router>
      <RelayInitializer.Context.Provider value={environment}>
        <ModulesLoader.Context.Provider value={modules} >
          <I18nextProvider i18n={i18next}>
            <ThemeProvider theme={theme}>
              <UserInfoProvider>
                <ModalTrackerProvider>
                  <AppComponent />
                </ModalTrackerProvider>
              </UserInfoProvider>
            </ThemeProvider>
          </I18nextProvider>
        </ModulesLoader.Context.Provider>
      </RelayInitializer.Context.Provider>
    </Router>,
    document.getElementById('root'),
  );
  registerServiceWorker();
};

export default {
  renderApp: (modulesConfig, AppComponent, theme) => {
    i18next = i18nextLoader.load((err) => {
      if (err) return console.error(err);
      const environment = RelayInitializer.init(portalEndPoint);
      const modules = modulesConfig ? ModulesLoader.loadModules(modulesConfig) : [];
      renderApp(
        AppComponent || DefaultLayout,
        theme || DefaultTheme,
        modules,
        environment,
      );
      return null;
    });
  },
};
