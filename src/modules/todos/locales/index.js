import i18next from 'i18next';

const loadLocales = () => {
  i18next.addResourceBundle('en', 'todos', {
    metadata: {
      name: 'todos',
      displayName: 'Todos Module',
      description: 'Todos is the best module you could ever find and I LOVE it !',
    },
    home: {
      menuTitle: 'Todos',
    },
  }, true, true);

  i18next.loadNamespaces('todos');
};

export default loadLocales;
