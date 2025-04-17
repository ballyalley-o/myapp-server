import type { Config } from 'jest'

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.test.json' }],
  },
  moduleNameMapper: {
    '^config/(.*)$': '<rootDir>/src/config/$1',
    '^constant$': '<rootDir>/src/constant/$1',
    '^constant/(.*)$': '<rootDir>/src/constant/$1',
    '^controller$': '<rootDir>/src/controller/$1',
    '^locale$': '<rootDir>/src/locale/$1',
    '^middleware$': '<rootDir>/src/middleware/$1',
    '^model$': '<rootDir>/src/model/$1',
    '^model/(.*)$': '<rootDir>/src/model/$1',
    '^route$': '<rootDir>/src/route/$1',
    '^route/(.*)$': '<rootDir>/src/route/$1',
    '^myapp$': '<rootDir>/src/config/index.ts',
    '^utility$': '<rootDir>/src/utility/$1',
  },
  moduleFileExtensions: ['ts', 'js', 'json'],
  roots: ['<rootDir>/src'],
  setupFiles: ['<rootDir>/jest.setup.ts'],
  clearMocks: true,
}

export default config
