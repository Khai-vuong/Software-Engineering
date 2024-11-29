const express = require('express');
const session = require('express-session');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const sposRoutes = require('./routes/sposRoutes');
const paymentRoutes = require('./src/payment');
const printingRoutes = require('./src/printService');

const app = express();
const PORT = 4000;

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/spos', sposRoutes);
app.use('/payment', paymentRoutes);
app.use('/printing', printingRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});