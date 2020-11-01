import babel from './babel.js';
import requireResolveCwdSafe from '../requireResolveCwdSafe.js';

export default async (config, ...args) => {
  const extended = babel(config(...args));
  const configPath = requireResolveCwdSafe('webpack.config');
  if (configPath) {
    const customizer = (await import(`file://${configPath}`)).default;
    return customizer(...args)(extended);
  } else {
    return extended;
  }
};
