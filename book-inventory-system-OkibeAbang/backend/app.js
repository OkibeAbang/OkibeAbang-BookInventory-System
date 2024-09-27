const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2'); // Make sure to install mysql or any other database package you are using

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json()); // Parse JSON bodies

// Database connection setup (update with your own database credentials)
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Nkerebobo1+++',
    database: 'book_inventory'
});

// Connect to the database
db.connect(err => {
    if (err) {
        console.error('Database connection failed:', err);
        return;
    }
    console.log('Connected to database');
});

// Route to add a book
app.post('/add-book', (req, res) => {
    const { title, author, genre, publication_date, isbn } = req.body;
    const sql = 'INSERT INTO Inventory (Title, Author, Genre, publication_date, ISBN) VALUES (?, ?, ?, ?, ?)';

    db.query(sql, [title, author, genre, publication_date, isbn], (error, results) => {
        if (error) {
            console.error('Error adding book:', error);
            return res.status(500).json({ message: 'Failed to add book' });
        }
        res.status(201).json({ message: 'Book added successfully' });
    });
});

app.get('/books', (req, res) => {
    const sql = 'SELECT * FROM Inventory';

    db.query(sql, (error, results) => {
        if (error) {
            console.error('Error fetching books:', error);
            return res.status(500).json({ message: 'Failed to fetch books', error: error.message });
        }
        res.status(200).json(results); // Send results back to the front end
    });
});



// Route to filter books
app.get('/filter-books', (req, res) => {
    const { title, author, genre, publication_date } = req.query;

    let query = 'SELECT * FROM Inventory WHERE 1=1'; // 1=1 to simplify appending conditions
    const conditions = [];
    const values = [];

    if (title) {
        conditions.push('title LIKE ?');
        values.push(`%${title}%`);
    }
    if (author) {
        conditions.push('author LIKE ?');
        values.push(`%${author}%`);
    }
    if (genre) {
        conditions.push('genre LIKE ?');
        values.push(`%${genre}%`);
    }
    if (publication_date) {
        conditions.push('publication_date = ?');
        values.push(publication_date);
    }

    if (conditions.length > 0) {
        query += ' AND ' + conditions.join(' AND ');
    }

    db.query(query, values, (err, results) => {
        if (err) {
            console.error('Error fetching books:', err);
            return res.status(500).json({ error: 'Failed to fetch books' });
        }
        res.json(results);
    });
});




// Route to export books as JSON
app.get('/export-books', (req, res) => {
    db.query('SELECT * FROM Inventory', (error, results) => {
        if (error) {
            console.error('Error exporting books:', error);
            return res.status(500).json({ message: 'Failed to export books' });
        }

        // Convert results to CSV
        const csvRows = [];
        // Get headers
        const headers = Object.keys(results[0]);
        csvRows.push(headers.join(',')); // Join headers with commas

        // Get data rows
        for (const row of results) {
            const values = headers.map(header => {
                const escaped = ('' + row[header]).replace(/"/g, '\\"'); // Escape double quotes
                return `"${escaped}"`; // Wrap each value in quotes
            });
            csvRows.push(values.join(',')); // Join values with commas
        }

        const csvString = csvRows.join('\n'); // Join rows with new lines

        // Set headers for download
        res.setHeader('Content-disposition', 'attachment; filename=books.csv');
        res.set('Content-Type', 'text/csv');
        res.status(200).send(csvString); // Send CSV string
    });
});




// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
