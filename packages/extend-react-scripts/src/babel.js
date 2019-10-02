import equals from './equals';

export default config => {
  const { options } = config.module.rules[2].oneOf[1];

  equals(options.babelrc, false, 'babelrc');
  delete options.babelrc;

  equals(options.configFile, false, 'babel.config.js');
  delete options.configFile;

  equals(!options.cacheIdentifier, false, 'cacheIdentifier');
  delete options.cacheIdentifier;

  return config;
};
