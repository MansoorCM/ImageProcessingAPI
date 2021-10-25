import supertest from "supertest";
import app from "../../../index";

const request = supertest(app)

//works if the file with name 'berkshire.jpg' is in the assets/full folder.
describe('Tests the image api endpoint', () => {
    it('gets response of 200', async(done) => {
        const response = await request.get('/api/images').query({
            filename:'berkshire', 
            width: 300,
            height: 300
        })

        expect(response.status).toBe(200);
        done();
    })
})