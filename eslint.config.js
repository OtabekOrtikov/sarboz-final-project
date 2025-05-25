// eslint.config.js  (flat config for ESLint 9)
import js       from '@eslint/js';
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import globals  from 'globals';

export default [

  /* 1️⃣  Base JS recommendations */
  js.configs.recommended,

  /* 2️⃣  TypeScript + browser source files  */
  {
    files: ['src/**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 2020,
      sourceType: 'module',
      globals: {
        ...globals.browser              // ➜ document / window / localStorage / console …
      },
    },
    plugins: { '@typescript-eslint': tsPlugin },
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
    },
  },

  /* 3️⃣  Jest test files  */
  {
    files: ['**/__tests__/**/*.{js,ts,jsx,tsx}'],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 2020,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.jest,               // ➜ describe / it / expect / jest …
      },
    },
    plugins: { '@typescript-eslint': tsPlugin },
    rules: {},
  },

  /* 4️⃣  Ignore generated stuff */
  {
    ignores: ['dist/**', 'coverage/**', 'node_modules/**'],
  },
];
