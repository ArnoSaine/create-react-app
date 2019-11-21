'use strict';

module.exports = function(api, options) {
  api.cache(true);

  return {
    plugins: [
      // Stage 0
      '@babel/plugin-proposal-function-bind',

      // Stage 1
      '@babel/plugin-proposal-export-default-from',
      '@babel/plugin-proposal-logical-assignment-operators',
      [
        '@babel/plugin-proposal-pipeline-operator',
        { proposal: 'minimal', ...options },
      ],
      '@babel/plugin-proposal-do-expressions',

      // Stage 2
      // ['@babel/plugin-proposal-decorators', options],
      '@babel/plugin-proposal-function-sent',
      '@babel/plugin-proposal-export-namespace-from',
      '@babel/plugin-proposal-throw-expressions',

      // Stage 3
      '@babel/plugin-syntax-import-meta',
      '@babel/plugin-proposal-json-strings',

      // Other
      'babel-plugin-react-require',
    ],
  };
};
