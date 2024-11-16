const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Sample user data
const user = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  phone: '(123) 456-7890',
  address: '123 Main St, Anytown, USA',
};

app.get('/api/user', (req, res) => {
  res.json(user);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});