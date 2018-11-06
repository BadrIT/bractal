import i18next from 'i18next';
import { reactI18nextModule } from 'react-i18next';

const Loader = {
  load: (callback) => {
    i18next
      .use(reactI18nextModule)
      .init(
        {
          fallbackLng: 'en',
          interpolation: {
          // React already does escaping
            escapeValue: false,
          },
          lng: 'en', // 'en' | 'es'
        },
        callback,
      );
    return i18next;
  },
};

export default Loader;
