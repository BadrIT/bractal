import i18next from 'i18next';

const loadLocales = () => {
  i18next.addResourceBundle('en', 'modulesDocs', {
    metadata: {
      name: 'modulesDocs',
      displayName: 'Modules Docs Module',
      description: 'This module shows the very basic usage of Bractal, and it simply does only one job, which is loading and showing all home pages of all the loaded modules',
    },
    home: {
      menuTitle: 'Modules Docs',
    },
  }, true, true);

  i18next.loadNamespaces('modulesDocs');
};

export default loadLocales;
