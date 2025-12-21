const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const captainSchema = new mongoose.Schema({
  fullname: {
    firstname: {
      type: String,
      required: [true, 'First name is required'],
      minlength: [2, 'First name must be at least 2 characters long'],
    },
    lastname: {
      type: String,
      minlength: [2, 'Last name must be at least 2 characters long'],
    },
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please fill a valid email address',
    ],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  socketId: {
    type: String,
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'inactive',
  },
  vechical: {
    color: {
      type: String,
      required: [true, 'Vechical color is required'],
    },
    plate: {
      type: String,
      required: [true, 'Vechical plate number is required'],
    },
    capacity: {
      type: Number,
      required: [true, 'Vechical capacity is required'],
      min: [1, 'Capacity must be at least 1'],
    },
    vechicalType: {
      type: String,
      required: [true, 'Vechical type is required'],
      enum: ['car','motercycle','auto'],
    }
  },
  location: {
    lat: {
      type: Number,
    },
    lng: {
      type: Number,
    },
  }
});

captainSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '24h',
  });
  return token;
};

captainSchema.methods.comparePassword = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

captainSchema.statics.hashPassword = async function (password) {
  return bcrypt.hash(password, 10);
};

module.exports = mongoose.model('Captain', captainSchema);