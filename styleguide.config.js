const path = require('path');

module.exports = {
  components: ['src/modules/coreUI/components/basic/**/*.{ts,tsx,js,jsx}', 'src/modules/coreUI/components/layouts/helpers/**/*.{ts,tsx,js,jsx}'],
  skipComponentsWithoutExample: true,
  require: [path.resolve(__dirname, 'src/styleguidist/setup.js')],
  webpackConfig: require('./config/webpack.config.dev.js'),
  styleguideComponents: {
    Wrapper: path.join(__dirname, 'src/styleguidist/Wrapper'),
  },
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
