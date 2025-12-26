const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');
const BlacklistTokenModel = require('../models/blacklistToken.model');
const captainModel = require('../models/captain.model');

module.exports.authUser = async (req, res, next) => {
  try {
    let token;


    if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }

   
    if (!token && req.headers.authorization?.startsWith('Bearer ')) {
      token = req.headers.authorization.split(' ')[1];
    }

   
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

  
    const isBlacklisted = await BlacklistTokenModel.findOne({ token });
    if (isBlacklisted) {
      return res.status(401).json({ message: 'Token has been revoked' });
    }

   
    const decoded = jwt.verify(token, process.env.JWT_SECRET);


    const user = await userModel.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

   
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
}
module.exports.authCaptain = async (req, res, next) => {
  try {
    let token;

   
    if (req.cookies?.token) {
      token = req.cookies.token;
    } else if (req.headers.authorization?.startsWith("Bearer ")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

   
    const isBlacklisted = await BlacklistTokenModel.findOne({ token });
    if (isBlacklisted) {
      return res.status(401).json({ message: "Token has been revoked" });
    }

   
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

   
    const captain = await captainModel.findById(decoded.id);
    if (!captain) {
      return res.status(401).json({ message: "Captain not found" });
    }

    
    req.captain = captain;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};