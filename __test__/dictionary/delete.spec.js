const constants = require("../../constants");
let request = require('supertest');

require('dotenv').config();
request = request(process.env.BASE_URL);

describe("DELETE /deleting a dictionary", () => {
    const dictionary_id = 'c7ad0e42-6c1c-45d0-afb8-102748db0487';

    /**
     * OBSERVATIONS
     * 1. The endpoint is suppose to accept an ID as param '/id' 
     *    but it is actually accepting ID as params and also ID 
     *    as a query params '/?id='
     */
    it("Should delete a dictionary successfully", () => {
        request
            .delete(`/dictionary/${dictionary_id}?id=${dictionary_id}`)
            .set('Authorization', `Basic ${process.env.API_KEY}`)
            .expect(constants().STATUS_204)
            .then((response) => {
                expect(response.status).toEqual(constants().STATUS_204);
            });
    });

    it("Should return an unauthorized response", () => {
        request
            .delete(`/dictionary/${dictionary_id}?id=${dictionary_id}`)
            .expect(constants().STATUS_401)
            .then((response) => {
                expect(response.status).toEqual(constants().STATUS_401);
            });
    });

    it("Should return Not Found resonse", () => {
        request
            .delete(`/dictionary/id=`)
            .expect(constants().STATUS_404)
            .set('Authorization', `Basic ${process.env.API_KEY}`)
            .then((response) => {
                expect(response.status).toEqual(constants().STATUS_404);
            });
    });
});