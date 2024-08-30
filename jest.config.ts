import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  testEnvironment: 'node',
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: 'src',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.ts?$': [
      'ts-jest',
      {
        tsconfig: './tsconfig.json',
      },
    ],
  },
  coverageDirectory: '../coverage',
  moduleNameMapper: {
    '^@entities/(.*)': '<rootDir>/entities/$1',
    '^@dtos/(.*)': '<rootDir>/dtos/$1',
    '^@interfaces/(.*)': '<rootDir>/interfaces/$1',
    '^@repositories/(.*)': '<rootDir>/repositories/$1',
    '^@shared/(.*)': '<rootDir>/shared/$1',
    '^@use-cases/(.*)': '<rootDir>/use-cases/$1',
  },
  coveragePathIgnorePatterns: ['<rootDir>/main.ts'],
};

export default config;
