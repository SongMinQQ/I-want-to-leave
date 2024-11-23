module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    '@babel/plugin-proposal-export-namespace-from',
    'react-native-reanimated/plugin', // 이 줄을 추가하세요.
    ['module:react-native-dotenv',
      {
        moduleName: '@env', // 환경 변수 모듈 이름
        path: '.env', // .env 파일 경로
        safe: false,
        allowUndefined: true,
      },],

  ],
};
