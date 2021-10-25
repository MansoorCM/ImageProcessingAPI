import path from 'path';
import fileExists from '../../utilities/fileExists';

describe('Tests if file is present', () => {
  const directory = path.resolve('./');

  //works if the 'full' folder has the file 'berkshire.jpg'
  it('returns true for existing file', async () => {
    const imagepath = directory + '/assets/full/berkshire.jpg';
    const result = await fileExists(imagepath);
    expect(result).toBe(true);
  });

  //works if the 'full' folder doesn't have the file 'apple.jpg'
  it('returns false if file is missing', async () => {
    const wrongpath = directory + '/assets/full/apple.jpg';
    const result = await fileExists(wrongpath);
    expect(result).toBe(false);
  });
});
