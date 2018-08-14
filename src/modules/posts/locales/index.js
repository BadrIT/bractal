import i18next from 'i18next';

const loadLocales = () => {
  i18next.addResourceBundle('en', 'posts', {
    metadata: {
      name: 'posts',
      displayName: 'Posts Module',
      description: 'Posts is the best module you could ever find and I LOVE it !',
    },
    home: {
      menuTitle: 'Posts',
    },
  }, true, true);

  i18next.loadNamespaces('posts');
};

export default loadLocales;
