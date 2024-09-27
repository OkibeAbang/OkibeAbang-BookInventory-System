
# Okibe Abang Book Inventory Management System

This project is a Book Inventory Management System that allows users to manage a collection of books. Users can add new books, filter existing books based on various criteria, and export the book inventory in CSV format.



## Features

- Add new books to the inventory.
- Filter books by title, author, genre, and publication date.
- Export book data to CSV format.
- Intuitive and responsive user interface.

## Technologies Used

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, Express.js
- **Database**: MySQL (or any relational database)
- **Deployment**: Heroku

## Setup Instructions

To set up and run this project locally, follow these steps:

1. **Clone the Repository**
   ```bash
   git clone https://github.com/OkibeAbang/OkibeAbang-BookInventory-System.git
   cd book-inventory-system

2. **Install Node.js and npm**
Ensure you have Node.js installed on your machine. You can check if it's installed by running:
    ```bash
    node -v
    npm -v

3. **Install Dependencies**
Navigate to the backend directory and install the required Node.js packages:
    ```bash
    cd backend
    npm install

4. **Set Up the Database**
    Open your MySQL client and create a new database
    ```bash
    CREATE DATABASE book_inventory;

    Run the SQL script in db/schema.sql to create the necessary tables:

    ```bash
    mysql -u <username> -p book_inventory < db/schema.sql

5. **Update App.js**
    ```bash
    const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: `your_password`, //Replace this with your password
    database: 'book_inventory'
    });

    Update the password with your MYSQL password

6. **Running the application**
    Start the backend server from the backend directory, run:
    ```bash
    node app.js

7. **Running front end**
    Open the index.html file located in the front end directory in your web browser.
