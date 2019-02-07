# @arnosaine/react-scripts

A tiny fork of `react-scripts` that enables modifying the internal Babel, ESLint and Webpack configs without ejecting.

## Usage

```sh
npx create-react-app --scripts-version @arnosaine/react-scripts my-app
```

### Install other included templates

```sh
npx create-react-app --scripts-version @arnosaine/react-scripts --internal-testing-template ./my-app/node_modules/@visma/create-react-app-template/template my-app
```

## Examples

### `.babelrc`

```json
{
  "plugins": ["babel-plugin-react-require"]
}
```

### `.eslintrc.json`

```json
{
  "extends": ["./node_modules/eslint-config-react-app/index.js"],
  "rules": {
    "react/react-in-jsx-scope": "off"
  }
}
```

### `webpack.config.mjs`

Export function that takes `env` and returns function. Returned function takes the internal Webpack config that can be modified and finally returned.
See [react-scripts webpack.config.js](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/config/webpack.config.js) for config structure.

#### Add `dotenv-webpack` plugin

```js
import Dotenv from 'dotenv-webpack';

export default _env => config => {
  config.plugins.push(new Dotenv());

  return config;
};
```

#### Edit output path

```js
import path from 'path';
import paths from '@arnosaine/react-scripts/config/paths';

paths.appBuild = path.resolve(process.cwd(), 'other/output/path');

export default _env => config => {
  return config;
};
```

#### Add `.properties` loader

```js
import path from 'path';

export default env => config => {
  const { oneOf } = config.module.rules[2];
  // Last rule should be original file-loader fallback. Insert new rules just
  // before last rule.
  oneOf.splice(oneOf.length - 2, 0, {
    test: /\.properties$/,
    loader: 'properties-loader',
  });

  return config;
};
```
