import type {Config} from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'react-native',
  setupFilesAfterEnv: ['./jest.setup.js'],
  // snapshotSerializers: ['enzyme-to-json/serializer'],
  testMatch: [
    '**/__tests__/**/*.js?(x)',
    '**/__tests__/**/*.ts?(x)',
    '**/?(*.)+(spec|test).js?(x)',
    '**/?(*.)+(spec|test).ts?(x)',
  ],
  testPathIgnorePatterns: [
    './node_modules/',
    './android/',
    './ios/',
    './build/',
  ],
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|@react-native|recoil|axios)',
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node', 'svg'],
  moduleNameMapper: {
    recoil: 'recoil/native',
  },
};

export default config;
