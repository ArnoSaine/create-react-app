import lodash from 'lodash';

export default packageJson =>
  lodash.omitBy(
    packageJson,
    (value, key) =>
      key.toLowerCase().endsWith('dependencies') && !Object.keys(value).length
  );
