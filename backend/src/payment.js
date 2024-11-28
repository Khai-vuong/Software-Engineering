const express = require('express');
const router = express.Router();

// Define routes
router.get('/', (req, res) => {
  res.send('Welcome to BKpay~');
});

router.post('/create', (req, res) => {
  const paymentDetails = req.body;
  res.send(`Payment created with details: ${JSON.stringify(paymentDetails)}`);
});

router.get('/:id', (req, res) => {
  const paymentId = req.params.id;
  res.send(`Payment details for ID: ${paymentId}`);
});

module.exports = router; // Export the router
