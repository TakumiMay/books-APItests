const expect = require('chai').expect;
const axios = require('axios');
const faker = require('faker').random;
const { BASE_URL } = require('../utils/constants')

let createdBook;
let updatedBook;
let response;

describe('Given a created book', () => {

    before(async () => {
        const new_book = {
            name: faker.words(2),
            author: "Mayumi Tamura"
        };
        createdBook = (await axios.post(BASE_URL, new_book)).data;
    });

    describe('When the user updates the book', () => {

        before(async () => {
            updatedBook = {
                name: faker.words(2),
                author: createdBook.author
            };
            response = await axios.put(`${BASE_URL}/${createdBook.id}`, updatedBook);
        });

        it('Then should have an OK status code', () => {
            expect(response.status).eql(200);
        });

        it('Then should return a book but the author should not change', async () => {
            expect(response.data.author).eql(createdBook.author);
        });

        it('Then should return a book with the name updated', async () => {
            const book = response.data;
            expect(book.name).eql(updatedBook.name);
        });
    });
});