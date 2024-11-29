const express = require('express');
const router = express.Router();
const printerSettingController = require('../controllers/printerSettingController');

router.get('/', printerSettingController.getPrintSettings);
router.post('/', printerSettingController.updatePrintSettings);

module.exports = router;