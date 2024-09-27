// routes.js: Define the routes for CRUD operations and exporting data.
const express = require('express');
const router = express.Router();
const db = require('./app');  // Import the database connection
const json2csv = require('json2csv').parse;
const fs = require('fs');
const path = require('path');



// Add a new book (POST /books/add-book)
router.post('/add-book', (req, res) => {
    const { title, author, genre, publication_date, isbn } = req.body;

    // Your logic to add the book to the database
    const sql = 'INSERT INTO Inventory (Title, Author, Genre, publication_date, ISBN) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [title, author, genre, publication_date, isbn], (error, results) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ message: 'Failed to add book' });
        }
        res.status(201).json({ message: 'Book added successfully' });
    });
});





// Filter books (GET /books)
router.get('/filter-book', (req, res) => {
    const { title, author, genre, publication_date } = req.query;
    let query = 'SELECT * FROM Inventory WHERE 1=1';
    const params = [];

    if (title) {
        query += ' AND title LIKE ?';
        params.push(`%${title}%`);
    }
    if (author) {
        query += ' AND author LIKE ?';
        params.push(`%${author}%`);
    }
    if (genre) {
        query += ' AND genre LIKE ?';
        params.push(`%${genre}%`);
    }
    if (publication_date) {
        query += ' AND publication_date = ?';
        params.push(publication_date);
    }

    db.query(query, params, (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});

// Export book data in CSV or JSON format (GET /books/export)
router.get('/export', (req, res) => {
    db.query('SELECT * FROM Inventory', (err, results) => {
        if (err) return res.status(500).json(err);

        if (req.query.format === 'csv') {
            const csv = json2csv(results);
            const filePath = path.join(__dirname, 'books.csv');
            fs.writeFileSync(filePath, csv);
            res.download(filePath);
        } else {
            res.json(results);
        }
    });
});

module.exports = router;
