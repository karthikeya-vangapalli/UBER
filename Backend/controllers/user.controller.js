const userModel = require('../models/user.model');
const userService = require('../services/user.service');
const { validationResult } = require('express-validator');
const BlacklistTokenModel = require('../models/blacklistToken.model');

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict',
};

/* ================= REGISTER USER ================= */
module.exports.registerUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { fullname, email, password } = req.body;

    if (!fullname || !fullname.firstname || !email || !password) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: 'User with this email already exists' });
    }

    const user = await userService.createUser({
      firstname: fullname.firstname,
      lastname: fullname.lastname,
      email,
      password, // plain password (model hashes it)
    });

    const token = user.generateAuthToken();

    res.cookie('token', token, cookieOptions);

    res.status(201).json({
      token,
      user,
    });
  } catch (error) {
    console.error('REGISTER ERROR:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

/* ================= LOGIN USER ================= */
module.exports.loginUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    const user = await userModel.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = user.generateAuthToken();
    user.password = undefined;

    res.cookie('token', token, cookieOptions);

    res.status(200).json({
      token,
      user,
    });
  } catch (error) {
    console.error('LOGIN ERROR:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


module.exports.getUserProfile = async (req, res) => {
  res.status(200).json({
    user: req.user
  });
};

/* ================= LOGOUT USER ================= */
module.exports.logoutUser = async (req, res) => {
  try {
    const token =
      req.cookies?.token || req.headers.authorization?.split(' ')[1];

    if (token) {
      await BlacklistTokenModel.create({ token });
    }

    res.clearCookie('token');

    res.status(200).json({
      message: 'Logged out successfully',
    });
  } catch (error) {
    console.error('LOGOUT ERROR:', error);
    res.status(500).json({ message: 'Logout failed' });
  }
};