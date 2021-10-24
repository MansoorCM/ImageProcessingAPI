import express from 'express';
import images from './api/images';

const routes = express.Router()

routes.get('/',(req, res) => {
    res.send('main api endpoint called');
})

// the image resize api (which uses the sharp module). 
routes.use('/images', images);

export default routes;