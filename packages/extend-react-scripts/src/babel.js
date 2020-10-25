import { strict as assert } from 'assert';
import requireResolveCwdSafe from './requireResolveCwdSafe';

export default config => {
  const hasConfig = ['.babelrc', 'babel.config'].some(requireResolveCwdSafe);

  if (hasConfig) {
    const babelLoader = require.resolve('babel-loader');
    for (const { oneOf } of config.module.rules) {
      if (oneOf) {
        for (const { loader, options } of oneOf) {
          if (loader === babelLoader) {
            assert.equal(options.babelrc, false, 'babelrc');
            delete options.babelrc;

            assert.equal(options.configFile, false, 'configFile');
            delete options.configFile;

            assert.equal(
              typeof options.cacheIdentifier,
              'string',
              'cacheIdentifier'
            );
            delete options.cacheIdentifier;
          }
        }
      }
    }
  }

  return config;
};
