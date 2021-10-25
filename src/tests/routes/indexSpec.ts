import supertest from "supertest";
import app from "../../index";

const request = supertest(app)

//tests the main api, this has no real functionality(just sends a 'main api endpoint called' response)
describe('Tests the main api endpoint', () => {
    it('gets response of 200', async(done) => {
        const response = await request.get('/api');
        expect(response.status).toBe(200);
        done();
    })
})