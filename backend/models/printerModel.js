// models/printerModel.js
const fs = require('fs');
const printersFile = './storage/printer.json';

exports.readPrintersData = () => {
  try {
    const data = fs.readFileSync(printersFile, 'utf8');
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error reading printers data:', error);
    return [];
  }
};

exports.writePrintersData = (printers) => {
  fs.writeFileSync(printersFile, JSON.stringify(printers, null, 2));
};
