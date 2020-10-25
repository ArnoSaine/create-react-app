import path from 'path';

export default requirePath => {
  try {
    return require.resolve(path.join(process.cwd(), requirePath));
    // eslint-disable-next-line no-empty
  } catch (error) {}
};
