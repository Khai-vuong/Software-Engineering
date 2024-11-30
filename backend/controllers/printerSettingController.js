const { readPrintSettings, writePrintSettings } = require('../models/printerSettingModel');

exports.getPrintSettings = (req, res) => {
    const settings = readPrintSettings();
    res.status(200).json(settings);
};

exports.updatePrintSettings = (req, res) => {
    const { defaultPages, resetDate, permittedFileTypes, allFileTypes } = req.body;
  
    const newSettings = {
      allFileTypes,
      defaultPages,
      resetDate,
      permittedFileTypes
    };
    
    writePrintSettings(newSettings);
    res.status(200).json({ message: 'Print settings updated successfully!' });
};
  