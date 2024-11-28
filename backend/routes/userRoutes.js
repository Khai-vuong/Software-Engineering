const express = require('express');
const { getUserInfo, getUserPrintHistory } = require('../controllers/userController');

const router = express.Router();

router.get('/', getUserInfo);
router.get('/printhistory', getUserPrintHistory);

module.exports = router;