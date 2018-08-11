// const path = require('path');
const changeCase = require('change-case');

module.exports = (plop) => {
  // setGenerator creates a generator that can be run with "plop generatorName"
  plop.setGenerator('generate_master_details_module', {
    description: "Creating a module that's based on a master detail navigation",
    prompts: [
      {
        type: 'input',
        name: 'modelName',
        message: 'What is a single element model name in GraphQL Schema ? for example : Product  (modelName) ?',
        validate: (value) => {
          if ((/.+/).test(value)) { return true; }
          return 'modelName is required';
        },
      }, {
        type: 'input',
        name: 'moduleName',
        message: 'What is your module name (name) ?',
        validate: (value) => {
          if ((/.+/).test(value)) { return true; }
          return 'moduleName is required';
        },
      }, {
        type: 'input',
        name: 'moduleDescription',
        message: 'What can you tell the world about your module (description) ?',
        default: answers => `${changeCase.pascal(answers.moduleName)} is the best module you could ever find and I LOVE it !`,
        validate: (value) => {
          if ((/.+/).test(value)) { return true; }
          return 'moduleEntryURL is required';
        },
      }, {
        type: 'input',
        name: 'moduleShortUniqueName',
        message: 'What is the short and unique name of your module (Will be used for menu, url....etc) (moduleShortUniqueName) ?',
        default: answers => answers.moduleName,
        validate: (value) => {
          if ((/.+/).test(value)) { return true; }
          return 'moduleShortUniqueName is required';
        },
      }, {
        type: 'input',
        name: 'uiItemName',
        message: 'What would be name of your UI ? for example : HomePageHotDeal   (uiItemName) ?',
        default: answers => answers.modelName,
        validate: (value) => {
          if ((/.+/).test(value)) { return true; }
          return 'uiItemName is required';
        },
      }, {
        type: 'input',
        name: 'graphQLMainQueryName',
        message: 'What is the entry point to your GraphQL (GraphQL query name, i.e, productsList) (graphQLMainQueryName) ?',
        default: answers => `${changeCase.camel(answers.modelName)}s`,
        validate: (value) => {
          if ((/.+/).test(value)) { return true; }
          return 'graphQLMainQueryName is required';
        },
      }, {
        type: 'input',
        name: 'graphQLSingleItemQueryName',
        message: 'What is your GraphQL entry point for a single item (GraphQL query name, i.e, productWithID) (graphQLSingleItemQueryName) ?',
        default: answers => `find${changeCase.pascal(answers.modelName)}ByID`,
        validate: (value) => {
          if ((/.+/).test(value)) { return true; }
          return 'graphQLMainQueryName is required';
        },
      }, {
        type: 'input',
        name: 'itemsListEntryFields',
        message: 'What fields should we ask GraphQL endpoint for the List view ? (itemsListEntryFields) ?',
        validate: (value) => {
          if ((/.+/).test(value)) { return true; }
          return 'itemsListEntryFields is required';
        },
      }, {
        type: 'input',
        name: 'itemDetailsEntryFields',
        message: 'What fields should we ask GraphQL endpoint for the Details view ? (itemDetailEntryFields) ?',
        validate: (value) => {
          if ((/.+/).test(value)) { return true; }
          return 'itemDetailsEntryFields is required';
        },
      }, {
        type: 'input',
        name: 'graphQLRootEntry',
        message: "Are you using viewer or me, as a root entry point ? if yes, write it's name, else leave this empty ...",
      },
      /* , {
        type: 'input',
        name: 'moduleEntryURL',
        message: 'How old are you?',
        validate: function (value) {
          var digitsOnly = /\d+/;
          if (digitsOnly.test(value)) { return true; }
          return 'Invalid age! Must be a number genius!';
        }
      }, {
        type: 'checkbox',
        name: 'toppings',
        message: 'What pizza toppings do you like?',
        choices: [
          { name: 'Cheese', value: 'cheese', checked: true },
          { name: 'Pepperoni', value: 'pepperoni' },
          { name: 'Pineapple', value: 'pineapple' },
          { name: 'Mushroom', value: 'mushroom' },
          { name: 'Bacon', value: 'bacon', checked: true },
        ],
      }, */
    ],
    actions: [
      {
        type: 'add',
        path: '../src/modules/{{moduleName}}/index.js',
        templateFile: 'templates/module_generator_master_details/sampleModule/index.js.hbr',
        abortOnFail: true,
      }, {
        type: 'add',
        path: '../src/modules/{{moduleName}}/locales/index.js',
        templateFile: 'templates/module_generator_master_details/sampleModule/locales/index.js.hbr',
        abortOnFail: true,
      }, {
        type: 'add',
        path: '../src/modules/{{moduleName}}/containers/Home.js',
        templateFile: 'templates/module_generator_master_details/sampleModule/containers/Home.js.hbr',
        abortOnFail: true,
      }, {
        type: 'add',
        path: '../src/modules/{{moduleName}}/containers/{{uiItemName}}sList.js',
        templateFile: 'templates/module_generator_master_details/sampleModule/containers/ItemsList.js.hbr',
        abortOnFail: true,
      }, {
        type: 'add',
        path: '../src/modules/{{moduleName}}/containers/{{uiItemName}}sListEntry.js',
        templateFile: 'templates/module_generator_master_details/sampleModule/containers/ItemsListEntry.js.hbr',
        abortOnFail: true,
      }, {
        type: 'add',
        path: '../src/modules/{{moduleName}}/containers/{{uiItemName}}sListPage.js',
        templateFile: 'templates/module_generator_master_details/sampleModule/containers/ItemsListPage.js.hbr',
        abortOnFail: true,
      }, {
        type: 'add',
        path: '../src/modules/{{moduleName}}/containers/{{uiItemName}}DetailsPage.js',
        templateFile: 'templates/module_generator_master_details/sampleModule/containers/ItemDetailsPage.js.hbr',
        abortOnFail: true,
      }, {
        type: 'add',
        path: '../src/modules/{{moduleName}}/containers/{{uiItemName}}Details.js',
        templateFile: 'templates/module_generator_master_details/sampleModule/containers/ItemDetails.js.hbr',
        abortOnFail: true,
      },
      /*
      function customAction(answers) {
        // move the current working directory to the plop file path
        // this allows this action to work even when the generator is
        // executed from inside a subdirectory
        process.chdir(plop.getPlopfilePath());

        // custom function can be synchronous or async (by returning a promise)
        var fs = require('fs');
        var existsMsg = 'psst {{name}}, change-me.txt already exists';
        var copiedMsg = 'hey {{name}}, I copied change-me.txt for you';
        var changeFileName = 'change-me.txt';
        var changeFilePath = 'folder/' + changeFileName;

        // you can use plop.renderString to render templates
        existsMsg = plop.renderString(existsMsg, answers);
        copiedMsg = plop.renderString(copiedMsg, answers);

        if (fs.existsSync(changeFilePath)) {
          // returned value shows up in the console
          return existsMsg;
        } else {
          // do a synchronous copy via node fs
          fs.writeFileSync(changeFilePath, fs.readFileSync('templates/' + changeFileName));
          return copiedMsg;
        }
      }, {
        type: 'modify',
        path: 'folder/change-me.txt',
        pattern: /(-- APPEND ITEMS HERE --)/gi,
        template: '$1\r\n{{name}}: {{age}}'
      }, {
        type: 'modify',
        path: 'folder/change-me.txt',
        pattern: /(-- PREPEND ITEMS HERE --)/gi,
        templateFile: 'templates/part.txt'
      }, {
        type: 'modify',
        path: 'folder/change-me.txt',
        pattern: /## replace name here ##/gi,
        template: 'replaced => {{dashCase name}}'
      } */
    ],
  });

  plop.setGenerator('generate_simple_module', {
    description: 'Creating a very basic and empty module',
    prompts: [
      {
        type: 'input',
        name: 'moduleName',
        message: 'What is your module name (name) ?',
        validate: (value) => {
          if ((/.+/).test(value)) { return true; }
          return 'moduleName is required';
        },
      }, {
        type: 'input',
        name: 'moduleDescription',
        message: 'What can you tell the world about your module (description) ?',
        default: answers => `${changeCase.pascal(answers.moduleName)} is the best module you could ever find and I LOVE it !`,
        validate: (value) => {
          if ((/.+/).test(value)) { return true; }
          return 'moduleEntryURL is required';
        },
      }, {
        type: 'input',
        name: 'moduleShortUniqueName',
        message: 'What is the short and unique name of your module (Will be used for menu, url....etc) (moduleShortUniqueName) ?',
        default: answers => answers.moduleName,
        validate: (value) => {
          if ((/.+/).test(value)) { return true; }
          return 'moduleShortUniqueName is required';
        },
      },
    ],
    actions: [
      {
        type: 'add',
        path: '../src/modules/{{moduleName}}/index.js',
        templateFile: 'templates/module_generator_simple/index.js.hbr',
        abortOnFail: true,
      }, {
        type: 'add',
        path: '../src/modules/{{moduleName}}/locales/index.js',
        templateFile: 'templates/module_generator_simple/locales/index.js.hbr',
        abortOnFail: true,
      }, {
        type: 'add',
        path: '../src/modules/{{moduleName}}/containers/Home.js',
        templateFile: 'templates/module_generator_simple/containers/Home.js.hbr',
        abortOnFail: true,
      },
    ],
  });
};
