// app.js: Frontend JavaScript to handle interactions with the server

document.getElementById('addBookForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const bookData = {
        title: document.getElementById('title').value,
        author: document.getElementById('author').value,
        genre: document.getElementById('genre').value,
        publication_date: document.getElementById('publication_date').value,
        isbn: document.getElementById('isbn').value
    };

    const res = await fetch('http://localhost:3000/add-book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookData)
    });

    if (res.ok) {
        alert('Book added successfully!');
        loadBooks(); // Load the updated list of books
    } else {
        alert('Failed to add book');
    }
});

document.getElementById('filterForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    // Collect filter criteria
    const query = new URLSearchParams({
        title: document.getElementById('filterTitle').value,
        author: document.getElementById('filterAuthor').value,
        genre: document.getElementById('filterGenre').value,
        publication_date: document.getElementById('filterDate').value
    });

    // Fetch filtered books
    try {
        const res = await fetch(`http://localhost:3000/filter-books?${query}`);
        if (!res.ok) throw new Error('Failed to fetch filtered books');
        
        const filteredBooks = await res.json();
        
        // Display filtered books
        displayFilteredBooks(filteredBooks);
    } catch (err) {
        console.error('Error fetching filtered books:', err);
    }
});

// Function to display only the filtered books
function displayFilteredBooks(books) {
    const tbody = document.querySelector('#filteredBookTable tbody');
    tbody.innerHTML = ''; // Clear existing rows

    books.forEach(book => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${book.title || 'N/A'}</td>
            <td>${book.author || 'N/A'}</td>
            <td>${book.genre || 'N/A'}</td>
            <td>${book.publication_date || 'N/A'}</td>
            <td>${book.isbn || 'N/A'}</td>
        `;
        tbody.appendChild(row);
    });
}



async function loadBooks() {
    const res = await fetch('http://localhost:3000/books'); // Use full URL
    const books = await res.json();
    displayBooks(books);
}

function displayBooks(books) {
    const tbody = document.querySelector('#bookTable tbody');
    tbody.innerHTML = ''; // Clear existing rows
    books.forEach(book => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${book.title || 'N/A'}</td>
            <td>${book.author || 'N/A'}</td>
            <td>${book.genre || 'N/A'}</td>
            <td>${book.publication_date || 'N/A'}</td>
            <td>${book.isbn || 'N/A'}</td>
        `;
        tbody.appendChild(row);
    });
}



document.getElementById('exportButton').addEventListener('click', async () => {
    window.location.href = 'http://localhost:3000/export-books'; // Change this line
});


// Load books when the page is loaded
window.onload = loadBooks;
