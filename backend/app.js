const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const userDataFile = './users.json';

const readUserData = () => {
  const data = fs.readFileSync(userDataFile);
  return JSON.parse(data);
};

const writeUserData = (users) => {
  fs.writeFileSync(userDataFile, JSON.stringify(users, null, 2));
};

app.post('/api/register', (req, res) => {
  const { username, password } = req.body;
  const users = readUserData();
  const existingUser = users.find(user => user.username === username);
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }
  users.push({ username, password, email: '', name: '' });
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
    res.status(200).json({ message: 'Login successful', user: { username: user.username } });
  } else {
    res.status(401).json({ message: 'Invalid username or password' });
  }
});

app.put('/api/user', (req, res) => {
  const { username, email, name } = req.body;
  const users = readUserData();

  const userIndex = users.findIndex(user => user.username === username);
  if (userIndex !== -1) {
    users[userIndex].email = email;
    users[userIndex].name = name;
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
    res.status(200).json({ username: user.username, email: user.email, name: user.name });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});








