import equals from './equals';

export default config => {
  const { options } = config.module.rules[1].use[0];

  equals(options.useEslintrc, false, 'useEslintrc');
  delete options.useEslintrc;

  return config;
};
