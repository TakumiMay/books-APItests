import bodyParser from 'body-parser';
import cors from 'cors';
import 'dotenv/config';
import express from 'express';

const app = express();
const PORT = process.env.PORT || 8080;

const books = [{
    name: faker.words(2),
    author: "Mayumi Tamura"
}]

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.listen(PORT, () =>
    console.log(`Example app listening on ${PORT}!`),
);

app.get('/', (req, res) => {
    res.send('Books API!');
});

app.get('/books', (req, res) => {
    res.send(books);
})

app.post('/books', (req, res) => {
    const book = req.body;
    if (!books.some(e => e.name.toUpperCase() === book.name.toUpperCase())) {
        books.push(book);
        res.status(201).send(book);
    } else {
        res.status(409).json({ message: 'The book has already been created' });
    }
});

app.put('/books/:id', (req, res) => {
    const { id } = req.params;
    const { name, author } = req.body;
    const filteredBook = books.filter(book => book.name.toUpperCase() === name.toUpperCase());
    if (filteredBook.length > 0) {
        filteredBook[0].name = name
        filteredBook[0].author = author
        books.splice(books.findIndex(book => book.name.toUpperCase() === name.toUpperCase()), 1, filteredBook[0]);
        res.status(200).send(books.filter(book => book.name.toUpperCase() === name.toUpperCase())[0]);
    } else
        res.status(404).json({ message: `Book with the ID ${id} not found` });
});

app.delete('/books/:id', (req, res) => {
    const { id } = req.params;
    const filteredBook = books.filter(book => book.name.toUpperCase() === name.toUpperCase());
    if (filteredBook.length > 0) {
        books.splice(books.findIndex(book => book.name.toUpperCase() === name.toUpperCase()), 1);
        res.status(200).json({ message: `Book deleted successfully` });
    } else
        res.status(404).json({ message: `Book with the ID ${id} not found` });
});