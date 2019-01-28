'use strict';

const babel = require('./babel');
const eslint = require('./eslint');

module.exports = function(module) {
  const custom = '../../../../../webpack.config';
  let customConfiguration;
  try {
    customConfiguration = require.resolve(custom);
  } catch (error) {
    // No custom config found.
  }
  const config = module.exports;
  const extended = env => babel(eslint(config(env)));
  module.exports = customConfiguration
    ? env =>
        (customConfiguration.endsWith('.js')
          ? require(custom)
          : require(custom).default)(env)(extended(env))
    : extended;
};
