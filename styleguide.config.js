const path = require('path');

module.exports = {
  title: 'Bractal Styleguide & Documetnation',
  pagePerSection: true,
  sections: [
    {
      name: 'Introduction',
      content: 'docs/sections/intro/introduction.md',
    },
    {
      name: 'Atoms',
      content: 'docs/sections/atoms/introduction.md',
      sections: [
        {
          name: 'Colors',
          components: () => [
            'src/modules/coreUI/components/basic/ColorsPalette.jsx',            
          ],
        },
        {
          name: 'Text Content',
          components: () => [
            'src/modules/coreUI/components/basic/Labels.jsx',            
          ],
        },
        {
          name: 'Form Elements',
          components: () => [
            'src/modules/coreUI/components/basic/Button.jsx',
            'src/modules/coreUI/components/basic/ToggleButton.js',
            'src/modules/coreUI/components/basic/Checkbox.jsx',
            'src/modules/coreUI/components/basic/RadioButton.js',
            'src/modules/coreUI/components/basic/PopupSelect.js',
          ],
        },
        {
          name: 'Layout Helpers',
          components: () => [
            'src/modules/coreUI/components/layouts/helpers/LinearLayout.jsx',
            'src/modules/coreUI/components/layouts/helpers/Separator.jsx',
          ],
        },
      ],
      sectionDepth: 1,
    },
    {
			name: 'Molecules',
      content: 'docs/sections/atoms/introduction.md',
      components: () => [
        'src/modules/core/utils/alertHelpers/**/*.{ts,tsx,js,jsx}',
        'src/modules/core/components/Pagination/PaginationBoxDesktop.js',
        'src/modules/core/components/Pagination/PaginationBoxMobile.js',
      ],
		},
	],
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
        {
          rel: 'stylesheet',
          href: 'https://use.fontawesome.com/releases/v5.2.0/css/all.css',
        },        
      ],
    },
  },
};
