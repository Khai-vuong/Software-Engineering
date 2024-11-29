const { readPrintersData, writePrintersData } = require('../models/printerModel');

exports.getPrinters = (req, res) => {
  try {
    const printers = readPrintersData();
    res.status(200).json(printers);  // Trả về danh sách máy in
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch printers data' });
  }
};

exports.updatePrinterStatus = (req, res) => {
  const { printerName } = req.params;
  const { name, enabled } = req.body;

  const printers = readPrintersData();
  const printerIndex = printers.findIndex(printer => printer.name === printerName);

  if (printerIndex === -1) {
    return res.status(404).json({ message: 'Printer not found' });
  }

  if (name) printers[printerIndex].name = name;
  if (enabled !== undefined) printers[printerIndex].enabled = enabled;

  writePrintersData(printers);
  res.status(200).json(printers[printerIndex]);
};


exports.addPrinter = (req, res) => {
    const { name, enabled } = req.body;
  
    if (!name) {
      return res.status(400).json({ message: 'Printer name is required' });
    }
  
    const printers = readPrintersData();
  
    const existingPrinter = printers.find(printer => printer.name === name);
    if (existingPrinter) {
      return res.status(400).json({ message: 'Printer already exists' });
    }
  
    const newPrinter = {
      name,
      enabled: enabled !== undefined ? enabled : true,
    };
  
    printers.push(newPrinter);
    writePrintersData(printers);
    res.status(201).json(newPrinter); 
};

exports.deletePrinter = (req, res) => {
  const { printerName } = req.params;
  
  const printers = readPrintersData();
  const updatedPrinters = printers.filter(printer => printer.name !== printerName);

  if (printers.length === updatedPrinters.length) {
    return res.status(404).json({ message: 'Printer not found' });
  }

  writePrintersData(updatedPrinters);
  res.status(200).json({ message: 'Printer deleted successfully' });
};