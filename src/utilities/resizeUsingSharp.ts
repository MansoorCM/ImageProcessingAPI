import sharp from 'sharp';

// function to resize image using the "sharp" module.
const resizeUsingSharp = async (
  setwidth: number,
  setheight: number,
  sourcepath: string,
  destpath: string
): Promise<void> => {
  try {
    await sharp(sourcepath)
      .resize(setwidth, setheight, { fit: 'contain' })
      .toFormat('jpeg')
      .toFile(destpath);
  } catch (error) {
    //failed to resize the image using sharp.
  }
};

export default resizeUsingSharp;
