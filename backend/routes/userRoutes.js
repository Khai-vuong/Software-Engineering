const express = require('express');
const { getUserInfo } = require('../controllers/userController');

const router = express.Router();

router.get('/', getUserInfo);

module.exports = router;