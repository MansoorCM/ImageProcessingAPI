import {promises as fsPromises} from 'fs';
import express from 'express';
import path from 'path';
import sharp from 'sharp';

const imageResize = async (req: express.Request, res: express.Response, next: Function) => {

    try{
        // get query parameters
        const filename = req.query.filename;
        const width = parseInt((req.query.width) as unknown as string);
        const height = parseInt((req.query.height) as unknown as string);

        //get source and destination directories
        const directory = path.resolve('./')
        const destpath = directory + '/assets/thumb/' + filename + '.jpg'
        const sourcepath = directory + '/assets/full/' + filename + '.jpg'

        const imageExists = await fileExists(destpath);
        if(imageExists){
            //image exists
            res.status(200).sendFile(destpath)
        }else{
            //image doesn\'t exist, so resizing using sharp
            await resizeUsingSharp(width, height, sourcepath, destpath);
            res.status(200).sendFile(destpath)
        }
        }catch(err){
            console.log(err)
        }
        next();
}

// function to resize image using the "sharp" module.
const resizeUsingSharp = async (setwidth: number, setheight: number, sourcepath: string, destpath: string) => {
    try {
      await sharp(sourcepath)
        .resize(
          setwidth,
          setheight,
          {fit:"contain"}
        )
        .toFormat("jpeg")
        .toFile(destpath);
    } catch (error) {
      console.log(error);
    }
  }

// checks if the resized image already exists. 
const fileExists = async (path: string) => !!(await fsPromises.stat(path).catch(e => false));

export default imageResize;