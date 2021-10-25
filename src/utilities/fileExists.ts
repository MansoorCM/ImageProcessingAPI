import { promises as fsPromises } from 'fs';

// checks if the resized image already exists.
const fileExists = async (path: string) =>
  !!(await fsPromises.stat(path).catch((e) => false));

export default fileExists;
