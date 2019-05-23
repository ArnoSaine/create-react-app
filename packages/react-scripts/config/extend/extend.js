'use strict';

const babel = require('./babel');
const eslint = require('./eslint');

module.exports = function(module) {
  let configPath;
  try {
    configPath = require.resolve('../../../../../webpack.config');
  } catch (error) {
    // No custom config found.
  }
  const config = module.exports;
  const extended = env => babel(eslint(config(env)));
  module.exports = configPath
    ? env => {
        const customizer = require(configPath);
        return (customizer.__esModule ? customizer.default : customizer)(env)(
          extended(env)
        );
      }
    : extended;
};
