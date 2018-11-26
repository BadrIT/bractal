/* eslint-env browser */
import React from 'react';
import ReactDOM from 'react-dom';
import { I18nextProvider } from 'react-i18next';
import 'semantic-ui-css/semantic.min.css';
import { BrowserRouter as Router } from 'react-router-dom';

import { ThemeProvider } from 'emotion-theming';
import UserInfoProvider from '~/modules/core/utils/accessManagementHelpers/UserInfoProvider';
import ModalTrackerProvider from '~/modules/core/utils/modalHelpers/ModalTrackerProvider';
import SideMenuTrackerProvider from '~/modules/core/utils/sideMenuHelpers/SideMenuTrackerProvider';
import AlertProvider from '~/modules/core/utils/alertHelpers/AlertProvider';
import ModulesLoader from '~/modules/core/utils/modulesLoader';
import RelayInitializer from '~/modules/core/utils/relayHelpers/RelayInitializer';

import assert from '~/modules/core/utils/jsHelpers/assert';

import DefaultTheme from './defaultTheme';
import registerServiceWorker from './registerServiceWorker';
import i18nextLoader from './i18n'; // initialized i18next instance

const portalEndPoint = process.env.REACT_APP_GRAPHQL_ENDPOINT;
assert(portalEndPoint, "Backend endpoint isn't set correctly, call the npm build (or start), as follows : 'REACT_APP_GRAPHQL_ENDPOINT=http://localhost:4000 npm start''");

const createAppRoot = (AppComponent, theme, modules, environment, i18next) => (
  <Router>
    <RelayInitializer.Context.Provider value={environment}>
      <ModulesLoader.Context.Provider value={modules} >
        <I18nextProvider i18n={i18next}>
          <ThemeProvider theme={theme}>
            <AlertProvider>
              <UserInfoProvider>
                <ModalTrackerProvider>
                  <SideMenuTrackerProvider>
                    { AppComponent }
                  </SideMenuTrackerProvider>
                </ModalTrackerProvider>
              </UserInfoProvider>
            </AlertProvider>
          </ThemeProvider>
        </I18nextProvider>
      </ModulesLoader.Context.Provider>
    </RelayInitializer.Context.Provider>
  </Router>
);

const createApp = (modulesConfig, AppComponent, theme = null, callback) => {
  const i18next = i18nextLoader.load((err) => {
    if (err) throw (err);

    const environment = RelayInitializer.init(portalEndPoint);
    const modules = modulesConfig ? ModulesLoader.loadModules(modulesConfig) : [];

    const appRoot = createAppRoot(
      AppComponent,
      theme || DefaultTheme,
      modules,
      environment,
      i18next,
    );

    callback(appRoot);
  });
};

export default {
  createApp,
  renderApp: (modulesConfig, AppComponent = null, theme = null) => {
    createApp(
      modulesConfig,
      AppComponent,
      theme,
      (appRoot) => {
        ReactDOM.render(
          appRoot,
          document.getElementById('root'),
        );
        registerServiceWorker();
      },
    );
  },
};
