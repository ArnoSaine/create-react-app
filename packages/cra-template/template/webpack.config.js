import Dotenv from 'dotenv-webpack';

export default env => config => {
  const {
    plugins,
    resolve: { modules }
  } = config;

  plugins.push(
    new Dotenv({
      safe: true,
      systemvars: true
    })
  );

  modules.push('shared');

  return config;
};
