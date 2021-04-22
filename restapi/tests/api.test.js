const request = require('supertest');
const server = require('./server-for-tests')

/**
 * Connect to a new in-memory database before running any tests.
 */
beforeAll(async () => {
    await server.startdb()
    app = await server.startserver()
});

/**
 * Clear all test data after every test.
 */
afterEach(async () => await server.clearDatabase());

/**
 * Remove and close the db and server.
 */
afterAll(async () => {
    await server.closeServer() //finish the server
    await server.closeDB()
})

/**
 * Product test suite.
 */
describe('user ', () => {
    /**
     * Test that we can list users without any error.
     */
   /*  it('can be listed',async () => {
        
        const response = await request(app).get("/api/users/list");
        expect(response.statusCode).toBe(200);
        
    }); */

    /**
     * Tests that a user can be created through the productService without throwing any errors.
     */
    it('can be created correctly', async () => {
        username = 'Pablo'
        email = 'pablo@uniovi.es'
        const response = await request(app).post('/api/users/add').send({name: username,email: email}).set('Accept', 'application/json')
        expect(response.statusCode).toBe(200);
        expect(response.body.name).toBe(username);
        expect(response.body.email).toBe(email);
        
    });

    it("can be got by its webId correctly", async () => {
        webId = "Pablo";
        location = {
            "type": "Point",
            "coordinates": [0.0, 0.0]
        };
        authKey = "pablo@uniovi.es";
        await request(app).post("/api/users/add").send({webId: webId, location: location, authKey: authKey}).set("Accept", "application/json");
        
        const response = await request(app).post("/api/users/getById").send({webId: webId}).set("Accept", "application/json");
        expect(response.statusCode).toBe(200);
        expect(response.body.webId).toBe(webId);
    });
});