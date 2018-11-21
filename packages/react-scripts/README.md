# @arnosaine/react-scripts

A tiny fork of `react-scripts` that enables modifying the internal Babel, ESLint and Webpack configs without ejecting.

## Usage

```sh
npx create-react-app --scripts-version @arnosaine/react-scripts my-app
```

## Examples

`.babelrc`:

```json
{
  "plugins": ["babel-plugin-react-require"]
}
```

`.eslintrc.json`:

```json
{
  "extends": ["./node_modules/eslint-config-react-app/index.js"],
  "rules": {
    "react/react-in-jsx-scope": "off"
  }
}
```

`webpack.config.js`:

Export function that takes `env` and returns function. Returned function takes the internal Webpack config that can be modified and finally returned.
See [react-scripts webpack.config.js](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/config/webpack.config.js) for config structure.

```js
const path = require('path');

module.exports = env => config => {
  const { oneOf } = config.module.rules[2];
  // Last rule should be original file-loader fallback. Insert new rules just
  // before last rule.
  oneOf.splice(oneOf.length - 2, 0, {
    test: /\.properties$/,
    loader: 'properties-loader',
  });

  config.output.path = path.resolve(__dirname, 'other/output/path');

  return config;
};
```
