/**
 * Jest configuration for the Fitness Tracker for Social Sharing MVP.
 * 
 * This configuration file defines the settings for running Jest tests.
 * It includes configurations for:
 * - Test environment
 * - Test runner
 * - Coverage reporting
 * - File transformations
 * - Setup and teardown scripts
 * - Custom Jest globals
 * - Module mocking
 * - Snapshot testing
 * - Code coverage thresholds
 * 
 * This configuration ensures that Jest runs efficiently and effectively
 * for the entire Fitness Tracker for Social Sharing MVP.
 */
module.exports = {
  // Specify the test environment to use
  // (e.g., node, jsdom, browser)
  // This is typically 'jsdom' for Next.js applications.
  // Refer to 'next.config.js' for potential conflicts.
  testEnvironment: 'jsdom',

  // Specify the test runner to use.
  // This is usually 'jest-circus' for better performance.
  // Consult 'package.json' for potential dependency conflicts.
  runner: 'jest-circus',

  // Configuration for Jest coverage reporting.
  // This is essential for ensuring sufficient code coverage.
  // Consult 'package.json' for potential conflicts with coverage reporting tools.
  coverageDirectory: 'coverage',

  // Transform configuration for specific file types.
  // This is particularly relevant for JavaScript and TypeScript files.
  // Refer to 'tsconfig.json' for TypeScript-specific configuration.
  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest',
  },

  // Setup and teardown scripts to be run before and after tests.
  // These scripts can be used for database setup or mock data creation.
  // Consult the 'tools' directory and 'package.json' for relevant scripts.
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],

  // Customize Jest globals for easier testing.
  // This can include custom functions or mocking utilities.
  // Consult 'jest.setup.ts' for existing globals.
  globals: {
    'ts-jest': {
      // Configuration for TypeScript-specific settings.
      // Refer to 'tsconfig.json' for alignment.
      tsconfig: '<rootDir>/tsconfig.json',
    },
  },

  // Configuration for module mocking.
  // This allows for isolating specific modules during testing.
  // Consult 'jest.setup.ts' for potential mocking utilities.
  moduleNameMapper: {
    '^.+\\.(css|less|sass|scss)$': '<rootDir>/__mocks__/styleMock.js',
    '^.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/__mocks__/fileMock.js',
  },

  // Configuration for snapshot testing.
  // This helps in ensuring that UI components maintain their structure.
  // Consult existing UI component tests for best practices.
  snapshotSerializers: ['enzyme-to-json/serializer'],

  // Set code coverage thresholds to ensure sufficient test coverage.
  // This helps to maintain the quality and reliability of the codebase.
  // Consult 'package.json' for potential conflicts with code coverage tools.
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },

  // Configuration for Jest's watch mode.
  // This is useful for running tests during development.
  watchPlugins: ['jest-watch-typeahead/filename', 'jest-watch-typeahead/testname'],

  //  Configuration for collecting and reporting code coverage.
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/types/*.ts',
    '!src/utils/*.ts',
    '!src/services/*.ts',
    '!src/pages/**/*.spec.ts',
    '!src/components/**/*.spec.ts',
    '!src/components/features/auth/LoginForm.spec.ts',
    '!src/components/features/auth/SignupForm.spec.ts',
  ],

  //  Configuration for setting up Jest globals before each test file.
  // This file will be run before each test file.
  // 'jest.setup.ts' is a good place to define any global constants, functions,
  // or setup for mocking.
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],

  //  Configuration for transforming file extensions.
  // The 'babel-jest' transform is used for TypeScript and JavaScript files.
  // Consult 'babel.config.js' for Babel configuration details.
  transform: {
    '^.+\\.(t|j)sx?$': 'babel-jest',
  },

  //  Configuration for mapping modules for testing.
  // This is used for mocking certain files, like styles or images.
  // Consult 'package.json' and 'jest.setup.ts' for any existing mocks.
  moduleNameMapper: {
    '^.+\\.(css|less|sass|scss)$': '<rootDir>/__mocks__/styleMock.js',
    '^.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/__mocks__/fileMock.js',
  },

  //  Configuration for snapshot testing, used for comparing UI elements.
  // Consult existing UI component tests for snapshot testing examples.
  snapshotSerializers: ['enzyme-to-json/serializer'],

  //  Configuration for collecting and reporting code coverage.
  // Ensure sufficient coverage is achieved for all components and features.
  // Consult 'package.json' for potential conflicts with coverage reporting tools.
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/types/*.ts',
    '!src/utils/*.ts',
    '!src/services/*.ts',
    '!src/pages/**/*.spec.ts',
    '!src/components/**/*.spec.ts',
    '!src/components/features/auth/LoginForm.spec.ts',
    '!src/components/features/auth/SignupForm.spec.ts',
  ],

  //  Configuration for code coverage thresholds.
  // Ensure a minimum coverage threshold is met for each category.
  // Consult 'package.json' for potential conflicts with code coverage tools.
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
};