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

const getUserInfo = (req, res) => {
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
};

const putUserInfo = (req, res) =>{}

const getUserPrintHistory = (req, res) =>{}

module.exports = { getUserInfo };