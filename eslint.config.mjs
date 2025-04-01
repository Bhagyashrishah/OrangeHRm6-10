// eslint.config.mjs
import globals from 'globals';
import pluginJs from '@eslint/js';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';
import pluginCypress from 'eslint-plugin-cypress/flat';
/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
{
files: ['cypress/**/*.js'],
languageOptions: {
globals: {
... globals.browser,
... globals.node,
... globals.cypress,
Cypress: true,
require: true,
module: true,
},
},
plugins: {
prettier: prettierPlugin,
cypress: pluginCypress,
},
rules: {
'prettier/prettier': 'error',
'no-undef': 'off', // Disable no-undef errors for Cypress
globals
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
pluginCypress.configs.globals,
pluginJs.configs.recommended,
prettierConfig,
];
