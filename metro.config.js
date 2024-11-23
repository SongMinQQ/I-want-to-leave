const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
    resolver: {
        extraNodeModules: {
          '@env': require.resolve('react-native-dotenv'), // @env 모듈을 추가
        },
      },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
