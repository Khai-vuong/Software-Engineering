const express = require('express');
const database = require('../storage/database');
const router = express.Router();
/*
  Các routes dùng cho dịch vụ in (cấu hình giấy, in giấy, xem lịch sử in)
    GET /printerList: Lấy danh sách máy in
    params: none
    return { printers: [] } 

    POST /setup: Tạo một order in mới
    params: body: {
        printerName: string,
        numberOfPage: int,
        numberOfCopy: int,
        ratio: string, 
        paperSize: string, 
        numberOfSide: string, 
        pname: string 
    }
    return { message: string }

    GET /balance: Lấy số dư của user
    params: none
    return { balance: int }
*/

router.post('/setup', (req, res) => {
    const user = req.session.username;
    if (!user) {
        res.status(301).json({ message: 'Not logged in' });
        return;
    }

    const now = new Date().toISOString();
    const endTime = new Date(now.getTime() + req.body.NumberOfPage * 3 * 1000).toISOString();
    const newOId = database.PrintOrder.length + 1;

    const newPrintOrder =       {
        "Oid":          newOId,
        "StartTime":    now,
        "EndTime":      endTime,
        "Status":       "Completed",

        "NumberOfPage": req.body.numberOfPage,
        "NumberOfCopy": req.body.numberOfCopy,
        "Ratio" :       req.body.ratio,
        "PaperSize":    req.body.paperSize,
        "NumbeofSide":  req.body.numberOfSide,

        "Uname":        user,   
        "Pname":        req.body.pname, 
      };

    database.PrintOrder.push(newPrintOrder);

      //Đẩy lịch sử in


    res.status(201).json({ message: 'Print order created successfully' });
});

//Works
router.get('/printerList', (req, res) => {
    const printers = database.Printer;
    console.log(printers);

    const printerNames = printers.map(printer => printer.PName);

    console.log(printerNames);
    res.status(200).json({ printers: printerNames });
});

router.get('/balance', (req, res) => {
  const user = req.session.username;

  if (!user) {
      console.log('Not logged in');
      res.status(301).json({ message: 'Not logged in' });
      return;
  }

  const userBalance = database.Users.find(u => u.username === user)?.balance;

  console.log('returned: ' + userBalance);

  if (userBalance === undefined) {
    res.status(404).json({ message: 'User not found' });
    return;
  }

  res.status(200).json({ balance: userBalance });
});



module.exports = router;