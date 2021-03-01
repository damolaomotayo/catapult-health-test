const constants = require("../../constants");
let request = require('supertest');

require('dotenv').config();
request = request(process.env.BASE_URL);

describe("POST /creating a dictionary", () => {
    const req_body = {};

    it("Should fail if not authorization token is passed", () => {
        request
            .post('/dictionary')
            .send(req_body)
            .set('Accept', constants().CONTENT_HEADER)
            .expect(constants().STATUS_401)
            .then((response) => {
                expect(response.status).toEqual(constants().STATUS_401);
            });
    });

    it("It should create a dictionary successfully", () => {
        request
            .post('/dictionary')
            .send({})
            .set('Accept', constants().CONTENT_HEADER)
            .set('Authorization', `Basic ${process.env.API_KEY}`)
            .expect(constants().STATUS_201)
            .then((response) => {
                // validating response header
                expect(response.header).toHaveProperty(constants().STATUS);
                expect(response.header.status).toBe('201 Created');
                expect(response.header).toHaveProperty(constants().CONTENT_TYPE);
                expect(response.header['content-type']).toBe(constants().CONTENT_HEADER);

                // validating response status
                expect(response.status).toEqual(constants().STATUS_201);

                // validating response body
                expect(JSON.parse(response.text)).toHaveProperty('id');
            });
    });
});

describe("POST /create or modifies a key/value pair given an existing dictionary id", () => {
    const dictionary_id = 'c7ad0e42-6c1c-45d0-afb8-102748db0487';

    it("Should fail if not authorization token is passed", () => {
        const req_body = {
            "name": "oxford"
        };

        request
            .post(`/dictionary/${dictionary_id}/keys/key?id=${dictionary_id}`)
            .send(req_body)
            .set('Accept', 'application/json')
            .expect(constants().STATUS_401)
            .then((response) => {
                expect(response.status).toEqual(constants().STATUS_401);
            });
    });

    it("Should successfully create or modify a dictionary key/value", () => {
        const req_body = {
            "name": "oxford"
        };
        
        request
            .post(`/dictionary/${dictionary_id}/keys/key?id=${dictionary_id}`)
            .send(req_body)
            .set('Accept', 'application/json')
            .set('Authorization', `Basic ${process.env.API_KEY}`)
            .expect(constants().STATUS_200)
            .then((response) => {
                // validating response header
                expect(response.header).toHaveProperty(constants().STATUS);
                expect(response.header.status).toBe('200 OK');
                expect(response.header).toHaveProperty(constants().CONTENT_TYPE);
                expect(response.header['content-type']).toBe(constants().CONTENT_HEADER);

                // validating response status
                expect(response.status).toEqual(constants().STATUS_200);
            });
    });

    /**
     * OBSERVATION:
     * 1. This shouldn't return a 200 status response
     *    when no request payload is sent to the endpoint
     */
    it("Should return an error", () => {
        // passing null returns error and 200
        // passing {} returns 200
        const req_body = null;

        request
            .post(`/dictionary/${dictionary_id}/keys/key?id=${dictionary_id}`)
            .send(req_body)
            .set('Accept', 'application/json')
            .set('Authorization', `Basic ${process.env.API_KEY}`)
            .expect(constants().STATUS_200)
            .then((response) => {
                // validating response header
                expect(response.header).toHaveProperty(constants().STATUS);
                expect(response.header.status).toBe('200 OK');
                expect(response.header).toHaveProperty(constants().CONTENT_TYPE);
                expect(response.header['content-type']).toBe(constants().CONTENT_HEADER);

                // validating response body
                expect(JSON.parse(response.text)).toHaveProperty('error')

                // validating response status
                expect(response.status).toEqual(constants().STATUS_200);
            });
    })
})