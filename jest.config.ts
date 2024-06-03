export default {
  preset: 'ts-jest',
  testEnvironment: 'node',

  // Coverage configuration
  coverageThreshold: {
    global: {
      branches: 75,
      functions: 75,
      lines: 75,
      statements: 75
    }
  },
  coverageReporters: ['lcov', 'text']
};
