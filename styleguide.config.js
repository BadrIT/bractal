const path = require('path');

module.exports = {
  components: 'src/modules/coreUI/components/basic/experimental/**/*.{ts,tsx,js,jsx}',
  webpackConfig: require('./config/webpack.config.dev.js'),
  template: {
    head: {
      links: [
        {
          rel: 'stylesheet',
          href: 'http://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css',
        },
      ],
    },
  },
};
