'use strict';

const equals = require('./equals');

module.exports = config => {
  const { options } = config.module.rules[2].oneOf[1];

  equals(options.babelrc, false, 'babelrc');
  delete options.babelrc;

  equals(!options.cacheIdentifier, false, 'cacheIdentifier');
  delete options.cacheIdentifier;

  return config;
};
