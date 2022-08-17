module.exports = async () => {
   return {
      verbose: true,
      testEnvironment: 'jsdom',
      collectCoverage: true,
      verbose: true,
      moduleNameMapper: {
         '.(css|less|sass|scss)$': '<rootDir>/__mocks__/styleMock.js',
         '.(gif|ttf|eot|svg|jpg)$': '<rootDir>/__mocks__/fileMock.js',
      },
      moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
      globals: {
         __API__: '/api',
      },
      testMatch: [
         '**/__tests__/**/*.+(ts|tsx|js)',
         '**/?(*.)+(spec|test).+(ts|tsx|js)',
      ],
      transform: {
         '^.+\\.(ts|tsx)$': 'ts-jest',
      },
   };
};
