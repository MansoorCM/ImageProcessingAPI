import sharp from 'sharp';

// function to resize image using the "sharp" module.
const resizeUsingSharp = async (
  setwidth: number,
  setheight: number,
  sourcepath: string,
  destpath: string
) => {
  try {
    await sharp(sourcepath)
      .resize(setwidth, setheight, { fit: 'contain' })
      .toFormat('jpeg')
      .toFile(destpath);
  } catch (error) {
    console.log(error);
  }
};

export default resizeUsingSharp;
