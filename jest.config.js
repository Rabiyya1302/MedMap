module.exports = {
  preset: 'react-native',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|@react-navigation)/)',
  ],
  setupFiles: ['./jest.setup.js'],
  testEnvironment: 'node',
  collectCoverage: true,
  collectCoverageFrom: [
    'MedMap/**/*.{js,jsx,ts,tsx}',
    'MedMap-Backend/**/*.{js,jsx,ts,tsx}',
    '!**/node_modules/**',
    '!**/coverage/**',
    '!**/.expo/**',
    '!**/types/**',
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/MedMap/$1',
    '^@backend/(.*)$': '<rootDir>/MedMap-Backend/$1',
  },
}; 