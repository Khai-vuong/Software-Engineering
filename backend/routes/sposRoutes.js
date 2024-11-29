const express = require('express');
const { getAllUser, getAllPrintHistory } = require('../controllers/sposController');

const router = express.Router();

router.get('/getAllUser', getAllUser);
router.get('/getAllPrintHistory', getAllPrintHistory);
// router.put('/changeUser', putUsername);

module.exports = router;