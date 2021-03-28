const expect = require('chai').expect;
const axios = require('axios');
const faker = require('faker').random;
const { BASE_URL } = require('../utils/constants')

let createdBook;
let response;

describe('Given a created book', () => {
    before(async () => {
        const new_book = {
            name: faker.words(2),
            author: "Mayumi Tamura"
        };
        createdBook = (await axios.post(`${BASE_URL}/`, new_book)).data;
    });

    describe('When the user deletes the book', () => {
        before(async () => {
            response = await axios.delete(`${BASE_URL}/${createdBook.id}`)
        });

        it('Then should have an OK status code', () => {
            expect(response.status).eql(200);
        });

        // it('Then should return a successful message', async () => {
        //     expect(response.data.message).eql("Book deleted successfully");
        // });
    });
});