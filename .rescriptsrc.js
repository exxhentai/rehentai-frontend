const path = require('path');

module.exports = [
  ['use-babel-config', '.babelrc'],
  ['use-eslint-config', '.eslintrc'],
  'disable-eslint',
  [
    'service-worker-loader',
    {
      entry: path.join(__dirname, 'src/ipfs-service-worker/index.js'),
      publicPath: '/',
    },
  ],
];
