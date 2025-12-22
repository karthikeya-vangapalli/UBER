const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  fullname: {
    firstname: {
      type: String,
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
    select: false,
  },
  socketId: {   
    type: String,
  },
});

userSchema.methods.generateAuthToken = function () {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined');
  }
 
  const expiresIn = process.env.JWT_EXPIRES_IN || '24h';
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn });
};

userSchema.methods.comparePassword = async function (enteredPassword) {
  
  if (!this.password) return false;
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.statics.hashPassword = async function (password) {
  const saltRounds = Number(process.env.BCRYPT_SALT_ROUNDS) || 10;
  return await bcrypt.hash(password, saltRounds);
};


userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    this.password = await this.constructor.hashPassword(this.password);
    return next();
  } catch (err) {
    return next(err);
  }
});


userSchema.set('toJSON', {
  transform: function (doc, ret) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    delete ret.password;
    return ret;
  },
});

const User = mongoose.model('User', userSchema);
module.exports = User;