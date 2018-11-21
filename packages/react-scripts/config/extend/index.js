'use strict';

const babel = require('./babel');
const eslint = require('./eslint');

module.exports = function(module) {
  const custom = '../../../../../webpack.config';
  let hasCustomConfiguration;
  try {
    require.resolve(custom);
    hasCustomConfiguration = true;
  } catch (error) {
    // No custom config found.
  }
  const config = module.exports;
  const extended = env => babel(eslint(config(env)));
  module.exports = hasCustomConfiguration
    ? env => require(custom)(env)(extended(env))
    : extended;
};
