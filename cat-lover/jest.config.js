module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    moduleNameMapper: {
      '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
      '^@/(.*)$': '<rootDir>/src/$1',
    },
    transform: {
      '^.+\\.tsx?$': 'ts-jest',
    },
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
    testMatch: ['**/__tests__/**/*.ts?(x)', '**/?(*.)+(spec|test).ts?(x)'],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  }
  