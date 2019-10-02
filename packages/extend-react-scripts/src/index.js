import babel from './babel';
import eslint from './eslint';

export default module => {
  let configPath;
  for (const path of [
    `${process.cwd()}/webpack.config`,
    '../../../../webpack.config',
  ]) {
    try {
      configPath = require.resolve(path);
      break;
    } catch (error) {
      // No custom config found.
    }
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
