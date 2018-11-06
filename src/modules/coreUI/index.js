import i18next from 'i18next';

import loadLocales from './locales/index';
import Home from './containers/Home';

const ModuleEntry = {
  name: 'coreUI',
  homePath: '/core-ui',
  displayName: 'ToBeLoaded',
  menuItemTitle: 'ToBeLoaded',
  loadModule: () => {
    loadLocales();
    ModuleEntry.displayName = i18next.t('coreUI:metadata.displayName');
    ModuleEntry.menuItemTitle = i18next.t('coreUI:home.menuTitle');
  },
  HomePage: Home,
};

export default ModuleEntry;
