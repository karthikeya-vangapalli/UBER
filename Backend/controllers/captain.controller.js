const captainModel = require("../models/captain.model");
const captainService = require("../services/captain.service");
const BlacklistTokenModel = require("../models/blacklistToken.model");
const { validationResult } = require("express-validator");

/* ================= REGISTER ================= */
module.exports.registerCaptain = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email } = req.body;
  const existing = await captainModel.findOne({ email });

  if (existing) {
    return res.status(400).json({ message: "Captain already exists" });
  }

  const captain = await captainService.createCaptain(req.body);

  res.status(201).json({
    message: "Captain registered successfully",
    captain,
  });
};

/* ================= LOGIN ================= */
module.exports.loginCaptain = async (req, res) => {
  const { email, password } = req.body;

  const captain = await captainModel.findOne({ email }).select("+password");
  if (!captain || !(await captain.comparePassword(password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = captain.generateAuthToken();
  captain.password = undefined;

  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
  });

  res.status(200).json({
    message: "Login successful",
    token,
    captain,
  });
};

/* ================= PROFILE (MISSING BEFORE ❌) ================= */
module.exports.getCaptainProfile = async (req, res) => {
  res.status(200).json({
    captain: req.captain,
  });
};

/* ================= LOGOUT ================= */
module.exports.logoutCaptain = async (req, res) => {
  const token =
    req.cookies?.token ||
    (req.headers.authorization?.startsWith("Bearer ")
      ? req.headers.authorization.split(" ")[1]
      : null);

  if (token) {
    await BlacklistTokenModel.create({ token });
  }

  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
  });

  res.status(200).json({
    message: "Logged out successfully",
  });
};