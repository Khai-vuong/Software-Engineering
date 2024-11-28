const fs = require('fs');
const userDataFile = './storage/users.json';
const sposDataFile = './storage/spos.json';
const print_historyDataFile = './storage/print_history.json';

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

const readPrintHistoryData = () => {
    try {
      const data = fs.readFileSync(print_historyDataFile, 'utf8');
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error reading user data:', error);
      return [];
    }
  };

const PrintingStas = () =>{}
const getAllUser = () =>{}
const getAllPrintHistory = () =>{}

module.exports = {};
