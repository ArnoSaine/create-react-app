module.exports = requirePath => {
  try {
    return require.resolve(requirePath);
  } catch (error) {
    for (const ext of ['cjs', 'mjs']) {
      try {
        return require.resolve(`${requirePath}.${ext}`);
        // eslint-disable-next-line no-empty
      } catch (error) {}
    }
    throw error;
  }
};
