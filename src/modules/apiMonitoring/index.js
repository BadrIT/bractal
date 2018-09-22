import i18next from 'i18next';

import loadLocales from './locales/index';
import Home from './containers/Home';

const ModuleEntry = {
  name: 'apiMonitoring',
  homePath: '/admin/api-monitoring',
  displayName: 'ToBeLoaded',
  menuItemTitle: 'ToBeLoaded',
  loadModule: () => {
    loadLocales();
    ModuleEntry.displayName = i18next.t('apiMonitoring:metadata.displayName');
    ModuleEntry.menuItemTitle = i18next.t('apiMonitoring:home.menuTitle');
  },
  HomePage: Home,
};

export default ModuleEntry;
