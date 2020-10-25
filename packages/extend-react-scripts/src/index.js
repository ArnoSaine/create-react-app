import babel from './babel';
import requireResolveCwdSafe from './requireResolveCwdSafe';

export default module => {
  const configPath = requireResolveCwdSafe('webpack.config');
  const config = module.exports;
  const extended = env => babel(config(env));
  module.exports = configPath
    ? env => {
        const customizer = require(configPath);
        return (customizer.__esModule ? customizer.default : customizer)(env)(
          extended(env)
        );
      }
    : extended;
};
