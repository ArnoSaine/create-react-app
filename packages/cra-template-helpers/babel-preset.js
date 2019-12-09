'use strict';

module.exports = function() {
  return {
    plugins: [
      // Adds syntax support for bind operator (::)
      require('@babel/plugin-proposal-function-bind').default,

      // Adds support for experimental features from stage 1
      require('@babel/plugin-proposal-export-default-from').default,
      require('@babel/plugin-proposal-logical-assignment-operators').default,
      [
        require('@babel/plugin-proposal-pipeline-operator'),
        { proposal: 'minimal' },
      ],
      require('@babel/plugin-proposal-do-expressions').default,
      require('@babel/plugin-proposal-partial-application').default,

      // Adds support for experimental features from stage 2
      require('@babel/plugin-proposal-function-sent').default,
      require('@babel/plugin-proposal-throw-expressions').default,

      // Adds support for experimental features from stage 3
      require('@babel/plugin-syntax-import-meta').default,
      require('@babel/plugin-proposal-private-methods').default,

      // Adds support for adding React import declaration if file contains JSX
      // tags.
      require('babel-plugin-react-require').default,
    ],
  };
};
