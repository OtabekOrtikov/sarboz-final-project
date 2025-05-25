/* eslint-env node, commonjs */
/* eslint-disable no-undef */
/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testMatch: ['**/__tests__/**/*.(ts|tsx|js)'],
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{ts,tsx}'],
  coverageThreshold: {
    global: {
      branches: 60,
      functions: 60,
      lines: 60,
      statements: 60,
    },
  },
  moduleNameMapper: {
    // mock out all style imports (css / less / sass / scss)
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy'
  },
  transform: {
    // let ts-jest handle TS and JS files
    '^.+\\.[tj]sx?$': 'ts-jest'
  }
};
