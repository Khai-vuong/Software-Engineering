const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// const mysql = require('mysql2');

// // Create a connection to the database
// const connection = mysql.createConnection({
//   host: 'localhost', // Your database host
//   user: 'your_username', // Your database username
//   password: 'your_password', // Your database password
//   database: 'test_db' // Your database name
// });

// // Connect to the database
// connection.connect((err) => {
//   if (err) {
//     console.error('Error connecting to the database:', err);
//     return;
//   }
//   console.log('Connected to the MySQL database.');
// });


// Sample user data
const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '(123) 456-7890',
    balance: '10 (A4)',
    address: '123 Main St, Anytown, USA',
  };

app.get('/', (req, res) => {
    res.send('Hello, Express!');
});

app.get('/api/user', (req, res) => {
    // const name = req.query.name;
    // const query = `SELECT * FROM users WHERE name = '${name}'`;
    // connection.query(query, (err, results) => {
    //   if (err) {
    //     console.error('Error fetching user:', err);
    //     return;
    //   }
    //   // Parse the results
    //   if (results.length > 0) {
    //     const user = results[0];
    //     console.log(`Name: ${user.name}, Email: ${user.email}`);
    //   } else {
    //     console.log('User not found');
    //   }
    //   // Close the connection
    //   connection.end();
    // });
    res.json(user);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});








