const express = require('express');
const userDataFile = './storage/users.json';
const router = express.Router();
const fs = require('fs');
/*
  Các routes dùng cho thanh toán Page (mua giấy trên BK pay)
  POST /payment/create: Tạo một thanh toán mới
    
  param: body: { pageNumber : int, paymentMethod: string }
  return: { message: string }

  GET /payment/history: Lấy lịch sử mua giấy của user
  return { data: [] }
*/

const readUserData = () => {
  try {
    const data = fs.readFileSync(userDataFile, 'utf8');
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error reading user data:', error);
    return [];
  }
};

// Define routes
router.get('/', (req, res) => {
  res.send('Welcome to BKpay~');
});

router.post('/create', (req, res) => {
  try {
    const user = req.session.username;
    if (!user) {
      console.log('Not logged in');  
      return res.status(401).json({ message: 'Not logged in' });
    }
    const { pageNumber, paymentMethod } = req.body;
    if (!pageNumber || !paymentMethod) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    if (pageNumber <= 0) {
      return res.status(400).json({ message: 'Page number must be greater than 0' });
    }
    const users = JSON.parse(fs.readFileSync(userDataFile, 'utf8'));
    const currentUser = users.find(u => u.username === user);
    if (!currentUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    if (!currentUser.pay_history) {
      currentUser.pay_history = [];
    }
    if (!currentUser.info.balance) {
      currentUser.info.balance = 0;
    }
    currentUser.info.balance += parseInt(pageNumber);
    currentUser.pay_history.push({
      pageNumber: parseInt(pageNumber),
      paymentMethod,
      timestamp: new Date().toISOString()
    });

    fs.writeFileSync(userDataFile, JSON.stringify(users, null, 2));
    return res.json({ 
      message: 'Payment created successfully',
      newBalance: currentUser.info.balance 
    });

  } catch (error) {
    console.error('Error creating payment:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/history', (req, res) => {
  if (req.session.username) {
    const pay_hiss = readUserData();
    const user = pay_hiss.find(user => user.username === req.session.username);

    if (user && user.pay_history && user.pay_history.length > 0) {
      const responseData = user.pay_history.map(history => ({
        pageNumber: history.pageNumber,
        paymentMethod: history.paymentMethod,
        timestamp: history.timestamp
      }));
      res.json(responseData);
    } else {
      res.status(404).json({ message: 'No printing history' });
    }
  } else {
    res.status(401).json({ message: 'Not logged in' });
  }
});

module.exports = router; // Export the router
