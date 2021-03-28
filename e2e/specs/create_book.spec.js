const expect = require('chai').expect;
const axios = require('axios');
const faker = require('faker').random;
const { BASE_URL } = require('../utils/constants')

const new_book = {
    name: faker.words(2),
    author: "Mayumi Tamura"
}

let response;

describe('When the user creates a new book', () => {

    before(async () => {
        response = await axios.post(BASE_URL, new_book);
    });

    it('Then should have an OK status code', () => {
        expect(response.status).eql(200);
    });

    it('Then should return the created book', () => {
        const createdBook = response.data;
        expect(createdBook.name).eql(new_book.name);
        expect(createdBook.author).eql(new_book.author);
    });

    it('Then should return a json as response', () => {
        const headers = response.headers;
        expect(headers["content-type"]).to.contain("application/json");
    });

});