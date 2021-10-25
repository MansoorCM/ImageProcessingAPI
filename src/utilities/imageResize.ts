import express from 'express';
import path from 'path';
import fileExists from './fileExists';
import resizeUsingSharp from './resizeUsingSharp';

//middleware that performs the image resize functionality.
const imageResize = async (
  req: express.Request,
  res: express.Response,
  next: Function
): Promise<void> => {
  try {
    // get query parameters
    const filename = req.query.filename || '';
    const widthstring = req.query.width as unknown as string;
    const heightstring = req.query.height as unknown as string;
    const width = parseInt(widthstring) || 0;
    const height = parseInt(heightstring) || 0;

    //get source and destination directories
    const directory = path.resolve('./');
    const destpath =
      directory +
      '/assets/thumb/' +
      filename + '_' + 
      widthstring +
      'x' +
      heightstring +
      '.jpg';
    const sourcepath = directory + '/assets/full/' + filename + '.jpg';

    if (filename == '') {
      res.send('No filename provided');
      return;
    }

    if (!(await fileExists(sourcepath))) {
      res.send("file doesn't exist");
      return;
    }

    if (width <= 0 || height <= 0) {
      res.send('Please provide valid width and height');
      return;
    }

    // have limited the width and height as positive integers below 4097 to avoid creating large files (since the input
    // image size will be lower than that ).
    if (width > 4096 || height > 4096) {
      res.send('Please keep width and height values below 4096');
      return;
    }

    const imageExists = await fileExists(destpath);
    if (imageExists) {
      //image exists
      res.status(200).sendFile(destpath);
    } else {
      //image doesn't exist, so resizing using sharp
      await resizeUsingSharp(width, height, sourcepath, destpath);
      res.status(200).sendFile(destpath);
    }
  } catch (err) {
    //some error occurred.
    res.send('Image processing failed.');
  }
  next();
};

export default imageResize;
