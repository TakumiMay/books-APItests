const expect = require('chai').expect;
const axios = require('axios');
const { BASE_URL } = require('../utils/constants')

let response;

describe('When the user lists books', () => {

    before(async () => {
        response = await axios.get(BASE_URL);
    });

    it('Then should have an OK status code', () => {
        expect(response.status).eql(200);
    });

    it("Should return books with name and author", () => {
        const book = response.data[0];
        expect(book).to.have.property("name");
        expect(book).to.have.property("author");
    });
});