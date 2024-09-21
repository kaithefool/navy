import pluginJs from '@eslint/js';
import pluginReact from 'eslint-plugin-react';
import tseslint from 'typescript-eslint';

export default [
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    rules: {
      indent: ['error', 2],
      semi: ['error', 'always'],
      quotes: ['error', 'single'],
      'no-trailing-spaces': ['error'],
      'no-multiple-empty-lines': ['error', { max: 1 }],
      'comma-dangle': ['error', 'always-multiline'],
      'quote-props': ['error', 'as-needed'],
      'max-len': ['error', { code: 80 }],
      'object-curly-spacing': ['error', 'always'],
      'object-curly-newline': ['error', { multiline: true }],
      'key-spacing': ['error', { beforeColon: false, afterColon: true }],
      'array-bracket-spacing': ['error', 'never'],
    },
  },
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
  ...tseslint.configs.recommended,
];