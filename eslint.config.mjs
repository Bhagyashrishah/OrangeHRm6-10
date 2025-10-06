import globals from 'globals';
import pluginJs from '@eslint/js';
import prettierPlugin from 'eslint-plugin-prettier';
import pluginCypress from 'eslint-plugin-cypress/flat';

export default [
  {
    files: ['cypress/**/*.js'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.cypress,
        Cypress: true,
        require: true,
        module: true,
        process: true,
      },
    },
    plugins: {
      prettier: prettierPlugin,
      cypress: pluginCypress,
    },
    rules: {
      'prettier/prettier': 'error',
      'no-undef': 'off', // Disable no-undef errors for Cypress globals
      'no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^[_$]',
          varsIgnorePattern: '^[_$]',
        },
      ],
      'cypress/no-unnecessary-waiting': 'off',
      'cypress/unsafe-to-chain-command': 'error',
    },
  },
  pluginCypress.configs.recommended,
  pluginJs.configs.recommended,
];