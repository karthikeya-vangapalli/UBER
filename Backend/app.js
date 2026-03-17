const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const connectToDb = require('./db/db');
const userRoutes = require('./routes/user.routes');
const captainRoutes = require('./routes/captain.routes');
const ridesRoutes = require('./routes/rides.routes');

const app = express();

// Connect DB
connectToDb();

// ✅ CORS FIX (IMPORTANT for deployment)
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
}));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Test route
app.get('/', (req, res) => {
  res.send('API is running 🚀');
});

// Routes
app.use('/users', userRoutes);
app.use('/captains', captainRoutes);
app.use('/rides', ridesRoutes);

module.exports = app;