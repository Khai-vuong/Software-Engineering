const database = {
    "SPSO": [
      {
        "Aid": 1,
        "Phone": "1234567890",
        "Name": "Admin1",
        "Username": "admin",
        "Email": "admin1@example.com",
        "Password": "admin"
      }
    ],
    "User": [
      {
        "Uid": 1,
        "Username": "aaa",
        "Email": "user1@example.com",
        "Password": "aaa",
        "LastUse": "2024-11-01T10:00:00Z",
        "Balance": 100,
        "Type": "Regular"
      }
    ],
    "Printer": [
      {
        "Pid": 1,
        "Location": "CS2-H6-106",
        "PName": "Printer A",
        "Brand": "BrandX",
        "Model": "X123",
        "Status": "Available"
      },
      {
        "Pid": 2,
        "Location": "CS1-B1-201",
        "PName": "Printer B",
        "Brand": "BrandX",
        "Model": "X123",
        "Status": "Available"
      },
    ],
    "Document": [
      {
        "Did": 1,
        "DName": "Document1",
        "Extension": "pdf",
        "NumberOfPage": 10,
        "Belong_to": 1      // Ref to UID
      }
    ],
    "PageOrder": [
      {
        "Poid": 1,
        "Price": 10.0,
        "BuyTime": "2024-11-01T12:00:00Z",
        "NumberOfPage": 10,
        "Status": "Paid",
        "User": 'aaa'   // Ref to Uid
      }
    ],
    "PrintOrder": [
      {
        "Oid": 1,
        "StartTime": "2024-11-01T13:00:00Z",
        "EndTime": "2024-11-01T13:30:00Z",
        "Status": "Completed",

        "NumberOfPage": 10,
        "NumberOfCopy": 5,
        "Ratio" : "1:1",
        "PaperSize": "A4",
        "NumbeofSide": "Single",

        "Uname": 'aaa',   // Ref to Uid
        "Pname": "Printer A",   //Ref to Pid

      }
    ],
    "Response": [
      {
        "Rid": 1,
        "Title": "Printer Issue",
        "Content": "Printer is out of paper",
        "Rating": 4,
        "Responder": 1,     // Ref to Aids
        "Receive": 1
      }
    ]
  }
  