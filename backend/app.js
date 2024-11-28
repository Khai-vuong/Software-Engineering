const express = require('express');
const session = require('express-session');
const cors = require('cors');
const fs = require('fs');
const app = express();
const PORT = 4000;

const paymentRoutes = require('./src/payment'); // Import the payment router


// CORS configuration
const corsOptions = {
  origin: 'http://localhost:3000', // Allow requests from this origin
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
};

app.use(cors(corsOptions));
app.use(express.json());

const userDataFile = './users.json';

app.use(session({
  secret: 'your-secret-key', // Change this to a strong secret
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set to true if using HTTPS
}));

app.use(bodyParser.json()); // For parsing JSON request bodies

app.use('/payment', paymentRoutes);


const readUserData = () => {
  try {
    const data = fs.readFileSync(userDataFile, 'utf8');
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error reading user data:', error);
    return [];
  }
};

const writeUserData = (users) => {
  fs.writeFileSync(userDataFile, JSON.stringify(users, null, 2));
};

app.post('/api/register', (req, res) => {
  const { username, password, name, email, phone_num } = req.body;
  // Check for required fields
  if (!username || !password || !name || !email || !phone_num) {
    return res.status(400).json({ message: 'All fields are required: username, password, name, email, phone_num' });
  }

  const users = readUserData();
  const existingUser = users.find(user => user.username === username);
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }
  users.push({
    username,
    password,
    info: {
      name,
      email,
      phone_num,
      balance,
      address
    },
    print_history: []
  });
  writeUserData(users);
  res.status(201).json({ message: 'User registered successfully' });
});

// const userData = {
//     username,
//     password,
//     email,
//     name,
//   };

//   try {
//     const response = await fetch('http://localhost:3000/api/register', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(userData),
//     });

//     if (response.ok) {
//       const data = await response.json();
//       setMessage(data.message); // Display success message
//     } else {
//       const errorData = await response.json();
//       setMessage(errorData.message); // Display error message
//     }
//   } catch (error) {
//     console.error('Error:', error);
//     setMessage('An error occurred while registering.'); // Display error message
//   }
// };

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const users = readUserData();

  const user = users.find(user => user.username === username && user.password === password);
  if (user) {
    req.session.username = user.username; // Store username in session
    res.status(200).json({ message: 'Login successful', user: { username: user.username, info: user.info } });
  } else {
    res.status(401).json({ message: 'Invalid username or password' });
  }
});

app.get('/api/user', (req, res) => {
  if (req.session.username) {
    const users = readUserData();
    const user = users.find(user => user.username === req.session.username);

    if (user) {
      res.json({
        username: user.username,
        name: user.info.name,
        email: user.info.email,
        phone_num: user.info.phone_num
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } else {
    res.status(401).json({ message: 'Not logged in' });
  }
});

app.put('/api/user', (req, res) => {
  const { username, name, email, phone_num } = req.body;
  const users = readUserData();

  const userIndex = users.findIndex(user => user.username === username);
  if (userIndex !== -1) {
    users[userIndex].info.name = name;
    users[userIndex].info.email = email;
    users[userIndex].info.phone_num = phone_num;
    writeUserData(users);
    res.status(200).json({ message: 'User information updated successfully' });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

app.get('/api/user/:username', (req, res) => {
  const { username } = req.params;
  const users = readUserData();

  const user = users.find(user => user.username === username);
  if (user) {
    res.status(200).json({ username: user.username, info: user.info, print_history: user.print_history });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

app.post('/api/user/:username/print-history', (req, res) => {
  const { username } = req.params;
  const { timestamp, num_pages, cost, config } = req.body; // Expecting print history details
  const users = readUserData();

  const userIndex = users.findIndex(user => user.username === username);
  if (userIndex !== -1) {
    const newPrintHistory = {
      timestamp,
      num_pages,
      cost,
      config
    };
    users[userIndex].print_history.push(newPrintHistory);
    writeUserData(users);
    res.status(200).json({ message: 'Print history added successfully', print_history: users[userIndex].print_history });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


// example payload
// [
//   {
//     "username": "user1",
//     "password": "password1",
//     "info": {
//       "name": "John Doe",
//       "email": "john.doe@example.com",
//       "phone_num": "123-456-7890"
//     },
//     "print_history": [
//       {
//         "timestamp": "2023-01-01T12:00:00Z",
//         "num_pages": 10,
//         "cost": 5,
//         "config": {}
//       }
//     ]
//   },
//   {
//     "username": "user2",
//     "password": "password2",
//     "info": {
//       "name": "Jane Smith",
//       "email": "jane.smith@example.com",
//       "phone_num": "987-654-3210"
//     },
//     "print_history": []
//   }
// ]







