# @arnosaine/react-scripts

A tiny fork of `react-scripts` that enables modifying the internal Babel, ESLint and Webpack configs without ejecting.

## Usage

### Create new project

```sh
npx create-react-app --scripts-version @arnosaine/react-scripts my-app
```

### Replace official CRA in existing project

```sh
npm install @arnosaine/react-scripts
npm uninstall react-scripts
```

### Use other templates

```sh
npx create-react-app --scripts-version @arnosaine/react-scripts --template @arnosaine/cra-template my-app
```

## Examples

### `.babelrc.json`

```json
{
  "plugins": ["babel-plugin-react-require"]
}
```

### `babel.config.js`

```js
module.exports = {
  plugins: ['babel-plugin-react-require'],
};
```

### `.eslintrc.json`

```json
{
  "extends": ["react-app"],
  "rules": {
    "react/react-in-jsx-scope": "off"
  }
}
```

### `webpack.config.js`

Export function that takes `env` and returns function. Returned function takes the internal Webpack config that can be modified and finally returned.
See [react-scripts webpack.config.js](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/config/webpack.config.js) for config structure.

ES module syntax is supported.

#### Add `dotenv-webpack` plugin

```js
import Dotenv from 'dotenv-webpack';

export default (_env) => (config) => {
  config.plugins.push(new Dotenv());

  return config;
};
```

#### Edit output path

```js
import path from 'path';
import paths from '@arnosaine/react-scripts/config/paths';

paths.appBuild = path.resolve(process.cwd(), 'other/output/path');

export default (_env) => (config) => {
  return config;
};
```

#### Add `.properties` loader

```js
import path from 'path';

export default (env) => (config) => {
  const { oneOf: rules } = config.module.rules[2];
  // Last rule should be original file-loader fallback. Insert new rules just
  // before last rule.
  rules.splice(rules.length - 2, 0, {
    test: /\.properties$/,
    use: 'properties-loader',
  });

  return config;
};
```

#### Transpile JSX and other syntax in `node_modules`

```js
import path from 'path';

export default (env) => (config) => {
  const { oneOf: rules } = config.module.rules[2];
  const babel = rules[1];
  const { include } = babel;

  babel.include = [
    include,
    path.join(process.cwd(), 'node_modules/some-package'),
  ];

  return config;
};
```

#### Add Webpack alias fields

Useful when developing packages with `npm link`.

```js
function addAlias(config, ...dependencies) {
  for (const dependency of dependencies) {
    config.resolve.alias[dependency] = require.resolve(dependency);
  }

  return config;
}

export default (env) => (config) => {
  // ...

  return addAlias(config, 'react', 'react-dom');
};
```
