const { response } = require('express');
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
    it('can be listed', async () => {
        const response = await request(app).post("/api/user/getStandardUsers").set('Accept', 'application/json');
        expect(response.statusCode).toBe(200);
    });

    /**
     * Tests that a user can be created through the productService without throwing any errors.
     */
    it('add, get and delete user from db', async () => {

        //add admin user
        webIdAdmin = 'https://radarin6b.solidcommunity.net/profile/card#me';
        posicionAdmin = { latitud: 55.7, longitud: 37.6 };
        let response = await request(app).post('/api/user/save')
            .send({ solidId: webIdAdmin, latitud: posicionAdmin.latitud, longitud: posicionAdmin.longitud }).set('Accept', 'application/json');

        expect(response.statusCode).toBe(200);

        let responseAdmin = await request(app).post('/api/user/getById').send({ solidId: webIdAdmin }).set('Accept', 'application/json');

        expect(responseAdmin.statusCode).toBe(200);

        expect(responseAdmin.body.solidId).toBe(webIdAdmin);
        expect(responseAdmin.body.latitud).toBe(posicionAdmin.latitud);
        expect(responseAdmin.body.longitud).toBe(posicionAdmin.longitud);
        expect(responseAdmin.body.rol).toBe("Standard user");


        response = await request(app).post('/api/user/changeRol').send({ solidId: webIdAdmin, rol: "Admin user" }).set('Accept', 'application/json');
        expect(response.statusCode).toBe(200);

        response = await request(app).post('/api/user/changeRol').send({ solidId: "hola", rol: "Admin user" }).set('Accept', 'application/json');
        expect(response.body.error).toBe("User does not exist");

        responseAdmin = await request(app).post('/api/user/getById').send({ solidId: webIdAdmin }).set('Accept', 'application/json');

        expect(responseAdmin.statusCode).toBe(200);

        expect(responseAdmin.body.solidId).toBe(webIdAdmin);
        expect(responseAdmin.body.latitud).toBe(posicionAdmin.latitud);
        expect(responseAdmin.body.longitud).toBe(posicionAdmin.longitud);
        expect(responseAdmin.body.rol).toBe("Admin user");

        //add other user

        webId = 'https://standar.solidcommunity.net/profile/card#me';
        posicion = { latitud: 55.7, longitud: 37.6 };
        response = await request(app).post('/api/user/save')
            .send({ solidId: webId, latitud: posicion.latitud, longitud: posicion.longitud }).set('Accept', 'application/json');

        expect(response.statusCode).toBe(200);

        let responseStandar = await request(app).post('/api/user/getById').send({ solidId: webId }).set('Accept', 'application/json');

        expect(responseStandar.statusCode).toBe(200);

        expect(responseStandar.body.solidId).toBe(webId);
        expect(responseStandar.body.latitud).toBe(posicion.latitud);
        expect(responseStandar.body.longitud).toBe(posicion.longitud);
        expect(responseStandar.body.rol).toBe("Standard user");

        //add locate
        locate = { latitud: 43.7, longitud: -3.5, texto: "Locate 1" };
        response = await request(app).post('/api/user/locate/save').send({ solidId: webId, latitud: locate.latitud, longitud: locate.longitud, texto: locate.texto }).set('Accept', 'application/json');
        expect(response.statusCode).toBe(200);

        //delete with  admin
        response = await request(app).post('/api/user/delete').send({ id: responseAdmin.body.solidId, userId: responseStandar.body.solidId }).set('Accept', 'application/json');
        expect(responseStandar.statusCode).toBe(200);

        //delete with admin but no exist
        response = await request(app).post('/api/user/delete').send({ id: responseAdmin.body.solidId, userId: responseStandar.body.solidId }).set('Accept', 'application/json');
        expect(responseStandar.statusCode).toBe(200);

    });


    it('get user who no exist from db', async () => {
        webId = 'https://holaMudo.solidcommunity.net/profile/card#me';

        let response = await request(app).post('/api/user/getById').send({ solidId: webId }).set('Accept', 'application/json');

        expect(response.statusCode).toBe(200);

        expect(response.body.error).toBe("No user find");

    });

    it('save locate and get it and delete', async () => {
        //Add user
        webId = 'https://radarin6b.solidcommunity.net/profile/card#me';
        posicion = { latitud: 55.7, longitud: 37.6 };
        let response = await request(app).post('/api/user/save')
            .send({ solidId: webId, latitud: posicion.latitud, longitud: posicion.longitud }).set('Accept', 'application/json');

        expect(response.statusCode).toBe(200);

        response = await request(app).post('/api/user/getById').send({ solidId: webId }).set('Accept', 'application/json');

        expect(response.statusCode).toBe(200);

        expect(response.body.solidId).toBe(webId);
        expect(response.body.latitud).toBe(posicion.latitud);
        expect(response.body.longitud).toBe(posicion.longitud);

        //add locate
        locate = { latitud: 43.7, longitud: -3.5, texto: "Locate 1" };
        response = await request(app).post('/api/user/locate/save').send({ solidId: webId, latitud: locate.latitud, longitud: locate.longitud, texto: locate.texto }).set('Accept', 'application/json');
        expect(response.statusCode).toBe(200);

        // get locate
        let responseGet = await request(app).post('/api/user/getLocates').send({}).set('Accept', 'application/json');
        expect(responseGet.statusCode).toBe(200);

        expect(responseGet.body[0].solidId).toBe(webId);
        expect(responseGet.body[0].latitud).toBe(locate.latitud);
        expect(responseGet.body[0].longitud).toBe(locate.longitud);
        expect(responseGet.body[0].texto).toBe(locate.texto);


        //update locate

        response = await request(app).post('/api/user/locate/update').send({ id: responseGet.body[0]._id, texto: "Locate 1 update" }).set('Accept', 'application/json');
        expect(response.statusCode).toBe(200);

        //delete locate
        response = await request(app).post('/api/user/locate/delete').send({ id: responseGet.body[0]._id }).set('Accept', 'application/json');
        expect(response.statusCode).toBe(200);

        //update of a no exist locate
        response = await request(app).post('/api/user/locate/update').send({ id: responseGet.body[0]._id, texto: "Locate 1 update 2" }).set('Accept', 'application/json');
        expect(response.body.error).toBe("Locate does not exist");

        // delete no exist locate
        response = await request(app).post('/api/user/locate/delete').send({ id: responseGet.body[0]._id }).set('Accept', 'application/json');
        expect(response.body.error).toBe("Locate does not exist");

    });

    it('get friends of new user', async () => {
        //Add user
        webId = 'https://radarin6b.solidcommunity.net/profile/card#me';
        posicion = { latitud: 55.7, longitud: 37.6 };
        let response = await request(app).post('/api/user/save')
            .send({ solidId: webId, latitud: posicion.latitud, longitud: posicion.longitud }).set('Accept', 'application/json');

        expect(response.statusCode).toBe(200);

        response = await request(app).post('/api/user/getById').send({ solidId: webId }).set('Accept', 'application/json');

        expect(response.statusCode).toBe(200);

        expect(response.body.solidId).toBe(webId);
        expect(response.body.latitud).toBe(posicion.latitud);
        expect(response.body.longitud).toBe(posicion.longitud);

        //getFriends

        response = await request(app).post('/api/user/getUsers').send({ solidId: webId }).set('Accept', 'application/json');
        expect(response.statusCode).toBe(200);

        expect(response.body.error).toBe("No friends");
    });

    it('get friends of new user', async () => {
        //Add user
        webId = 'https://radarin6b.solidcommunity.net/profile/card#me';
        posicion = { latitud: 55.7, longitud: 37.6 };
        let response = await request(app).post('/api/user/save')
            .send({ solidId: webId, latitud: posicion.latitud, longitud: posicion.longitud }).set('Accept', 'application/json');

        expect(response.statusCode).toBe(200);

        response = await request(app).post('/api/user/getById').send({ solidId: webId }).set('Accept', 'application/json');

        expect(response.statusCode).toBe(200);

        expect(response.body.solidId).toBe(webId);
        expect(response.body.latitud).toBe(posicion.latitud);
        expect(response.body.longitud).toBe(posicion.longitud);

        //getFriends

        response = await request(app).post('/api/user/getUsers').send({ solidId: webId }).set('Accept', 'application/json');
        expect(response.statusCode).toBe(200);

        expect(response.body.error).toBe("No friends");
    });

    it('get standar user', async () => {

        //add admin user
        webIdAdmin = 'https://radarin6b.solidcommunity.net/profile/card#me';
        posicionAdmin = { latitud: 55.7, longitud: 37.6 };
        let response = await request(app).post('/api/user/save')
            .send({ solidId: webIdAdmin, latitud: posicionAdmin.latitud, longitud: posicionAdmin.longitud }).set('Accept', 'application/json');

        expect(response.statusCode).toBe(200);

        let responseAdmin = await request(app).post('/api/user/getById').send({ solidId: webIdAdmin }).set('Accept', 'application/json');

        expect(responseAdmin.statusCode).toBe(200);

        expect(responseAdmin.body.solidId).toBe(webIdAdmin);
        expect(responseAdmin.body.latitud).toBe(posicionAdmin.latitud);
        expect(responseAdmin.body.longitud).toBe(posicionAdmin.longitud);
        expect(responseAdmin.body.rol).toBe("Standard user");

        //add other user

        webId = 'https://standar.solidcommunity.net/profile/card#me';
        posicion = { latitud: 55.7, longitud: 37.6 };
        response = await request(app).post('/api/user/save')
            .send({ solidId: webId, latitud: posicion.latitud, longitud: posicion.longitud }).set('Accept', 'application/json');

        expect(response.statusCode).toBe(200);

        let responseStandar = await request(app).post('/api/user/getById').send({ solidId: webId }).set('Accept', 'application/json');

        expect(responseStandar.statusCode).toBe(200);

        expect(responseStandar.body.solidId).toBe(webId);
        expect(responseStandar.body.latitud).toBe(posicion.latitud);
        expect(responseStandar.body.longitud).toBe(posicion.longitud);
        expect(responseStandar.body.rol).toBe("Standard user");

        responseStandar = await request(app).post('/api/user/getUsers').send({ solidId: webId }).set('Accept', 'application/json');
        expect(responseStandar.statusCode).toBe(200);

    });

    it('add and chage covid', async () => {

        //add admin user
        webIdAdmin = 'https://radarin6b.solidcommunity.net/profile/card#me';
        posicionAdmin = { latitud: 55.7, longitud: 37.6 };
        let response = await request(app).post('/api/user/save')
            .send({ solidId: webIdAdmin, latitud: posicionAdmin.latitud, longitud: posicionAdmin.longitud }).set('Accept', 'application/json');

        expect(response.statusCode).toBe(200);

        let responseAdmin = await request(app).post('/api/user/getById').send({ solidId: webIdAdmin }).set('Accept', 'application/json');

        expect(responseAdmin.statusCode).toBe(200);

        expect(responseAdmin.body.solidId).toBe(webIdAdmin);
        expect(responseAdmin.body.latitud).toBe(posicionAdmin.latitud);
        expect(responseAdmin.body.longitud).toBe(posicionAdmin.longitud);
        expect(responseAdmin.body.rol).toBe("Standard user");
        expect(responseAdmin.body.covid).toBe(false);


        response = await request(app).post('/api/user/changeCovid').send({ solidId: webIdAdmin, covid: true }).set('Accept', 'application/json');
        expect(response.statusCode).toBe(200);

        responseAdmin = await request(app).post('/api/user/getById').send({ solidId: webIdAdmin }).set('Accept', 'application/json');

        expect(responseAdmin.statusCode).toBe(200);

        expect(responseAdmin.body.solidId).toBe(webIdAdmin);
        expect(responseAdmin.body.latitud).toBe(posicionAdmin.latitud);
        expect(responseAdmin.body.longitud).toBe(posicionAdmin.longitud);
        expect(responseAdmin.body.rol).toBe("Standard user");
        expect(responseAdmin.body.covid).toBe(true);


        response = await request(app).post('/api/user/changeCovid').send({ solidId: "hola", covid: "Admin user" }).set('Accept', 'application/json');
        expect(response.body.error).toBe("User does not exist");
    });

});