// routes/printerRoutes.js
const express = require('express');
const printerController = require('../controllers/printerController');
const router = express.Router();

router.get('/', printerController.getPrinters);
router.post('/', printerController.addPrinter);
router.put('/:printerName/status', printerController.updatePrinterStatus);
router.delete('/:printerName', printerController.deletePrinter);
router.get('/history', printerController.getPrinters);


module.exports = router;