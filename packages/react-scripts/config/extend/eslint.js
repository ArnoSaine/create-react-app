'use strict';

const equals = require('./equals');

module.exports = config => {
  const { options } = config.module.rules[1].use[0];

  equals(options.useEslintrc, false, 'useEslintrc');
  delete options.useEslintrc;

  return config;
};
