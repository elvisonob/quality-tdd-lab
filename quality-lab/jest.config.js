import { createDefaultPreset } from 'ts-jest';

const tsJestTransformCfg = createDefaultPreset({
  tsconfig: {
    jsx: 'react-jsx',
  },
}).transform;

/** @type {import("jest").Config} */
export default {
  testEnvironment: 'jsdom',
  transform: {
    ...tsJestTransformCfg,
  },
  testPathIgnorePatterns: ['/node_modules/', '/tests/'],
};
