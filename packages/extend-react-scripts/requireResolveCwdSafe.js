import path from 'path';
import requireResolve from './requireResolve.cjs';

export default requirePath => {
  try {
    return requireResolve(path.join(process.cwd(), requirePath));
    // eslint-disable-next-line no-empty
  } catch (error) {}
};
