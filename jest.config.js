const nextJest = require('next/jest')

const createJestConfig = nextJest()

const customJestConfig = {
	testMatch: ['**/*.test.js', '**/*.test.ts', '**/*.test.tsx'],
	setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
	verbose: true,
	rootDir: 'test',
	testEnvironment: 'jest-environment-jsdom',
};

module.exports = createJestConfig(customJestConfig);
