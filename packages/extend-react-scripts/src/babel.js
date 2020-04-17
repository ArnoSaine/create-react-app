import equals from './equals';

const babelLoader = require.resolve('babel-loader');

export default (config) => {
  for (const { oneOf = [] } of config.module.rules) {
    for (const { loader, options } of oneOf) {
      if (loader === babelLoader) {
        equals(options.babelrc, false, 'babelrc');
        delete options.babelrc;

        equals(options.configFile, false, 'babel.config.js');
        delete options.configFile;

        equals(!options.cacheIdentifier, false, 'cacheIdentifier');
        delete options.cacheIdentifier;
      }
    }
  }

  return config;
};
