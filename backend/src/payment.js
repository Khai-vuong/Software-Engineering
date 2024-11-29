const express = require('express');
const database = require('../storage/database');
const router = express.Router();
const purchaseHistory = require('../storage/purchase_history');

/*
  Các routes dùng cho thanh toán Page (mua giấy trên BK pay)
  POST /payment/create: Tạo một thanh toán mới
    
  param: body: { pageNumber : int, paymentMethod: string }
  return: { message: string }

  GET /payment/history: Lấy lịch sử mua giấy của user
  return { data: [] }
*/

// Define routes
router.get('/', (req, res) => {
  res.send('Welcome to BKpay~');
});

router.post('/create', (req, res) => {
  const user = req.session.username  // Get the user from the session
  console.log(user);

  if (user === undefined) {
    console.log('Not logged in');  
    res.status(401).json({ message: 'Not logged in' });
    return;
  }

  const paymentDetails = {
    Poid: database.PageOrder.length + 1,
    Price: req.body.pageNumber * 1000,
    BuyTime: new Date().toISOString(),
    NumberOfPage: req.body.pageNumber,
    Status: 'Paid',
    User: user
  }

  database.PageOrder.push(paymentDetails);
  purchaseHistory.data.push({name: user, content: `Đã mua ${req.body.pageNumber} trang giấy qua ${req.body.paymentMethod}`});

  console.log(purchaseHistory);
  res.json({ message: 'Payment created successfully' });
});

router.get('/history', (req, res) => {
  const userName = req.session.username;
  const userHistory = purchaseHistory.data.filter(entry => entry.name === userName);
  console.log(`User ${userName} has purchased:`, userHistory);

  res.json(userHistory);
});

module.exports = router; // Export the router
