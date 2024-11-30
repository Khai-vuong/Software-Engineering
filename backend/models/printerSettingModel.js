const fs = require('fs');
const path = './storage/print-settings.json';

exports.readPrintSettings = () => {
  try {
    const data = fs.readFileSync(path, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading print settings:', err);
    return null;
  }
};

exports.writePrintSettings = (settings) => {
    try {
      fs.writeFileSync(path, JSON.stringify(settings, null, 2));
    } catch (err) {
      console.error('Error writing print settings:', err);
    }
};
  
