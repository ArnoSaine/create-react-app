import fs from 'fs-extra';
import path from 'path';
import sortPackageJson from 'sort-package-json';
import updateJSONSync from '../updateJSONSync.js';
import omitEmptyDependencies from './omitEmptyDependencies.js';

export default (init, ...args) => {
  const [appPath, appName, verbose, originalDirectory, templateName] = args;
  let result;
  const templatePath = path.dirname(
    require.resolve(`${templateName}/package.json`, { paths: [appPath] })
  );
  const templateJsonPath = path.join(templatePath, 'template.json');

  result = init(...args);

  if (fs.existsSync(templateJsonPath)) {
    const templateJson = fs.readJSONSync(templateJsonPath);
    const {
      package: { devDependencies = {}, peerDependencies, files } = {},
    } = templateJson;

    updateJSONSync(path.join(appPath, 'package.json'), packageJson =>
      sortPackageJson(
        omitEmptyDependencies({
          ...packageJson,
          peerDependencies: {
            ...packageJson.peerDependencies,
            ...peerDependencies,
          },
          files,
        })
      )
    );
  }

  return result;
};
