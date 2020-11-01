import fs from 'fs-extra';

export default (file, updater, options = { spaces: 2 }, readOptions) =>
  fs.writeJSONSync(file, updater(fs.readJSONSync(file, readOptions)), options);
