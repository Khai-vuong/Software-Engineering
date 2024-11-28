const express = require('express');
const database = require('../storage/database');
const router = express.Router();

/*
  Các routes dùng cho thanh toán Page (mua giấy trên BK pay)
  POST /payment/create: Tạo một thanh toán mới
    
  param: body: { pageNumber : int}
  return: { message: string }
*/

// Define routes
router.get('/', (req, res) => {
  res.send('Welcome to BKpay~');
});

router.post('/create', (req, res) => {
  const user = req.session.username  // Get the user from the session
  if (!user) {
    res.status(301).json({ message: 'Not logged in' });
    return;
  }

  const paymentDetails = {
    Poid: database.PageOrder.length + 1,
    Price: req.body.pageNumber * 1000,
    BuyTime: new Date().toISOString(),
    NumberOfPage: req.body.pageNumber,
    Status: 'Paid',
    User: user.username
  }

  database.PageOrder.push(paymentDetails);

  res.json({ message: 'Payment created successfully' });
});

router.get('/:id', (req, res) => {
  const paymentId = req.params.id;
  res.send(`Payment details for ID: ${paymentId}`);
});

module.exports = router; // Export the router
