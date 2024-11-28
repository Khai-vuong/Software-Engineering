const fs = require('fs');
const userDataFile = './storage/users.json';

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

const registerUser = (req, res) => {
  const { username, password, name, email, phone_num } = req.body;
  if (!username || !password || !name || !email || !phone_num) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const users = readUserData();
  const existingUser = users.find(user => user.username === username);
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }

  users.push({ username, password, info: { name, email, phone_num }, print_history: [] });
  writeUserData(users);
  res.status(201).json({ message: 'User registered successfully' });
};

const loginUser = (req, res) => {
  const { username, password } = req.body;
  const users = readUserData();
  const user = users.find(user => user.username === username && user.password === password);
  
  if (user) {
    req.session.username = user.username;
    res.status(200).json({ message: 'Login successful', user: { username: user.username, info: user.info } });
  } else {
    res.status(401).json({ message: 'Invalid username or password' });
  }
};

module.exports = { registerUser, loginUser };
