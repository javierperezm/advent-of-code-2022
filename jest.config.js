/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */

// eslint-disable-next-line fp/no-mutation
module.exports = {
  globalSetup: '<rootDir>/globalSetup.js',
  modulePaths: ['<rootDir>'],
  preset: 'ts-jest',
  testTimeout: 20000,
}
