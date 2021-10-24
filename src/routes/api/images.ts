import express from 'express';
import imageResize from '../../utilities/imageResize';

const images = express.Router();

// the images api which resizes the image using the sharp module. 
images.get('/', imageResize, (req: express.Request, res: express.Response) => {
    // all the work is done in the middleware.
})

export default images;