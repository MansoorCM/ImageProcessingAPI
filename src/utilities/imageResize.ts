import express from 'express';
import path from 'path';
import fileExists from './fileExists';
import resizeUsingSharp from './resizeUsingSharp';

//middleware that performs the image resize functionality.
const imageResize = async (req: express.Request, res: express.Response, next: Function) => {

    try{
        // get query parameters
        const filename = req.query.filename || '';
        const width = parseInt((req.query.width) as unknown as string) || 0;
        const height = parseInt((req.query.height) as unknown as string) || 0;

        //get source and destination directories
        const directory = path.resolve('./')
        const destpath = directory + '/assets/thumb/' + filename + '.jpg'
        const sourcepath = directory + '/assets/full/' + filename + '.jpg'

        const imageExists = await fileExists(destpath);
        if(imageExists){
            //image exists
            res.status(200).sendFile(destpath)
        }else{
            //image doesn't exist, so resizing using sharp
            if(filename == ''){
              res.send('Invalid filename');
              return
            }else if(width == 0 || height == 0){
              res.send('Please provide valid width and height')
              return
            }
            if (! await fileExists(sourcepath)){
              res.send('file doesn\'t exist');
              return
            }
            await resizeUsingSharp(width, height, sourcepath, destpath);
            res.status(200).sendFile(destpath)
        }
        }catch(err){
            console.log(err)
        }
        next();
}

export default imageResize;