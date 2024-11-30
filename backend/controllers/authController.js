const fs = require('fs');
const userDataFile = './storage/users.json';
const sposDataFile = './storage/spos.json';

const readUserData = () => {
  try {
    const data = fs.readFileSync(userDataFile, 'utf8');
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error reading user data:', error);
    return [];
  }
};

const readSposData = () => {
  try {
    const data = fs.readFileSync(sposDataFile, 'utf8');
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

  const sposs = readSposData(); // Corrected to readSposData() from readUserData()
  const spos = sposs.find(spos => spos.username === username && spos.password === password);
  
  if (!user && !spos) {
    res.status(401).json({ message: 'Invalid username or password' });
  } else if (user && spos) {
    res.status(401).json({ message: 'Invalid username or password' }); // Return error if both user and spos are found
  } else {
    req.session.username = user ? user.username : spos.username; // Set session username based on user or spos
    res.status(200).json({ message: 'Login successful', user: user ? { username: user.username, info: user.info, role: "user" } 
                                                                   : { username: spos.username, info: spos.info, role: "admin" } });
  }
};

module.exports = { registerUser, loginUser };
