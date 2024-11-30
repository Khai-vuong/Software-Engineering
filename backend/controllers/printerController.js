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
  const { PName, enabled } = req.body; // Changed 'name' to 'PName' to match the data structure
  const printers = readPrintersData();
  const printerIndex = printers.findIndex(printer => printer.PName === printerName);

  if (printerIndex === -1) {
    return res.status(404).json({ message: 'Printer not found' });
  }

  if (PName) printers[printerIndex].PName = PName;
  if (enabled !== undefined) printers[printerIndex].enabled = enabled;

  writePrintersData(printers);
  res.status(200).json(printers[printerIndex]);
};


exports.addPrinter = (req, res) => {
    const { PName, enabled, Location, Brand, Model, Status } = req.body; // Added 'Brand', 'Model', and 'Status'
  
    if (!PName) {
      return res.status(400).json({ message: 'Printer name is required' });
    }
  
    const printers = readPrintersData();
  
    const existingPrinter = printers.find(printer => printer.PName === PName);
    if (existingPrinter) {
      return res.status(400).json({ message: 'Printer already exists' });
    }
  
    const newPrinter = {
      PName,
      enabled: enabled !== undefined ? enabled : true,
      Location,
      Brand: Brand || "BrandX", // Default value for Brand
      Model: Model || "X123", // Default value for Model
      Status: Status || "Available" // Default value for Status
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