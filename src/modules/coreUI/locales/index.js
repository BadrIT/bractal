import i18next from 'i18next';

const loadLocales = () => {
  i18next.addResourceBundle('en', 'coreUI', {
    metadata: {
      name: 'coreUI',
      displayName: 'Core Ui Module',
      description: 'The most common and basic UI elements',
    },
    home: {
      menuTitle: 'Core Ui',
    },
  }, true, true);

  i18next.loadNamespaces('coreUI');
};

export default loadLocales;
