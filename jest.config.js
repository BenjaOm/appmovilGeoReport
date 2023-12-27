module.exports = {
    preset: 'jest-expo',
    transform: {
      '^.+\\.jsx?$': 'babel-jest', // Transformar archivos JSX con babel-jest
    },
    testEnvironment: 'jsdom', // Utilizar jsdom como entorno de pruebas
    setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],

    moduleNameMapper: {
      // Mapeos para tus assets (puedes ajustarlos según tus necesidades)
      '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.js',
      '\\.(css|less|scss|sass)$': 'identity-obj-proxy'
    },
    transformIgnorePatterns: [
        'node_modules/(?!(react-native|expo|expo-.*|@react-native|@react-native-.*|react-navigation|@react-navigation/.*|@react-native-picker/picker|@react-native|@react-native-community)/)',
      ],
    globals: {
      // Configuraciones globales (ajustar según sea necesario)
      'ts-jest': {
        babelConfig: true,
        tsconfig: '<rootDir>/tsconfig.jest.json'
      }
    }
  };
  