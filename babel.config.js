module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  env: {
    production: {
      plugins: [
        'react-native-reanimated/plugin',
        [
          'babel-plugin-inline-import',
          {
            extensions: ['.svg'],
          },
        ],
      ],
    },
    development: {
      plugins: ['react-native-reanimated/plugin'],
    },
  },
};
