import type { Config } from 'jest'

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  rootDir: '.',
  moduleNameMapper: {
    '^route(.*)$': '<rootDir>/src/route$1',
    '^middleware(.*)$': '<rootDir>/src/middleware$1',
    '^constant(.*)$': '<rootDir>/src/constant$1',
    '^myapp$': '<rootDir>/src/config/index.ts'
  },
  moduleFileExtensions: ['ts', 'js', 'json'],
  roots: ['<rootDir>/src', '<rootDir>/src/test'],
}

export default config
