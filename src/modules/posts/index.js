import i18next from 'i18next';

import loadLocales from './locales/index';
import Home from './containers/Home';

const ModuleEntry = {
  name: 'posts',
  homePath: '/posts',
  displayName: 'ToBeLoaded',
  menuItemTitle: 'ToBeLoaded',
  loadModule: () => {
    loadLocales();
    ModuleEntry.displayName = i18next.t('posts:metadata.displayName');
    ModuleEntry.menuItemTitle = i18next.t('posts:home.menuTitle');
  },
  HomePage: Home,
};

export default ModuleEntry;
