export default {
  preset: 'ts-jest',
  testEnvironment: 'node',

  // Coverage configuration
  coverageThreshold: {
    global: {
      branches: 0,//this should updated i use 0 to valid the coverage test in pull request for this repository (template)
      functions: 75,
      lines: 75,
      statements: 75
    }
  },
  coverageReporters: ['lcov', 'text']
};
