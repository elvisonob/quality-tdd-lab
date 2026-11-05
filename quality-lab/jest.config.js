import { createDefaultPreset } from 'ts-jest';

const tsJestTransformCfg = createDefaultPreset({
  tsconfig: {
    module: 'ESNext',
    jsx: 'react-jsx',
    types: ['jest', 'node', 'vite/client'],
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
