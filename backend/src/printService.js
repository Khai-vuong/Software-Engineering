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
        numberOfPage: int,
        numberOfCopy: int,
        ratio: string, 
        paperSize: string, 
        numberOfSide: string, 
        pname: string 
    }
    return { message: string }
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

router.get('/printerList', (req, res) => {
    const printers = database.Printer;
    const result = [];
    for (let i = 0; i < printers.length; i++) {
        result.push( printers[i].PName);
    }
});


module.exports = router;