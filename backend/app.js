const express = require('express');
const cors = require('cors');
const fs = require('fs');
const printerRoutes = require('./routes/printerRoutes');
const printerSettingRoutes = require('./routes/printerSettingRoutes');
const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

const userDataFile = './users.json';

// Register routes
app.use('/api/printers', printerRoutes);
app.use('/api/print-settings', printerSettingRoutes);

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
      phone_num
    },
    print_history: []
  });
  writeUserData(users);
  res.status(201).json({ message: 'User registered successfully' });
});

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const users = readUserData();

  const user = users.find(user => user.username === username && user.password === password);
  if (user) {
    res.status(200).json({ message: 'Login successful', user: { username: user.username, info: user.info } });
  } else {
    res.status(401).json({ message: 'Invalid username or password' });
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