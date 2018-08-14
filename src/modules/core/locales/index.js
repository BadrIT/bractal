import i18next from 'i18next';

const loadLocales = () => {
  i18next.addResourceBundle('en', 'core', {
    metadata: {
      appName: 'Bractal',
      displayName: 'Core Module',
      description: 'An examplar usage of React for all of our React-Relay projects. It shows how the ideal project would look like, and thus maximum care was taken when writing this code to be of high quality',
    },
    home: {
      menuTitle: 'Home',
      howToUse: {
        title: 'Usage',
        description: 'In the above menu, every link opens the entry page for each extension.',
      },
      modules: {
        title: 'Loaded Modules',
      },
    },
  }, true, true);

  i18next.addResourceBundle('ar', 'core', {
    metadata: {
      appName: 'نموذج بدر',
      description: 'توضيح كيفية التعامل مع React عن طريق الكثير من الأمثله الواجب اتباعها لأي مشروع جديد',
    },
    home: {
      menuTitle: 'الرئيسية',
      howToUse: {
        title: 'طريقة الاستخدام',
        description: 'يمكنك استكشاف طريقك هنا ، من القائمه في الأعلى . كل رابط في القائمه يفتح الصفحه الرئيسيه لواحد من الإضافات',
      },
      modules: {
        title: 'الإضافات المتاحة',
      },
    },
  }, true, true);

  i18next.loadNamespaces('core');
};

export default loadLocales;
