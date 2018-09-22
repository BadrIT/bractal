import i18next from 'i18next';

const loadLocales = () => {
  i18next.addResourceBundle('en', 'apiMonitoring', {
    metadata: {
      name: 'apiMonitoring',
      displayName: 'Api Monitoring',
      description: 'ApiMonitoring is the best module you could ever find and I LOVE it !',
    },
    home: {
      menuTitle: 'Api Monitoring',
    },
  }, true, true);

  i18next.loadNamespaces('apiMonitoring');
};

export default loadLocales;
