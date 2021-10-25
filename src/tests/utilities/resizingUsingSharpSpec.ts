import path from 'path';
import resizeUsingSharp from '../../utilities/resizeUsingSharp';
import fileExists from '../../utilities/fileExists';

//performs the image processing on the file berkshire.jpg and checks if processed image is in the 'thumbs' folder.
//for accuracy if the file is already in the thumbs folder, delete it first before running the test.(this can be done in code). 
describe('Tests the image processing', () => {
    it('creates an image of given name in the \'thumb\' folder', async(done) => {

        const directory = path.resolve('./')
        const imagepath = directory + '/assets/full/berkshire.jpg'
        const destpath = directory + '/assets/full/berkshire.jpg'
        await resizeUsingSharp(400, 600, imagepath, destpath)

        expect( await fileExists(destpath)).toBe(true);
        done();
    })
})