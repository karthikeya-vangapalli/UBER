const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

const captainController = require("../controllers/captain.controller");
const authMiddleware = require("../middlewares/auth.middlewares");

// REGISTER
router.post(
  "/register",
  [
    body("email").isEmail(),
    body("fullname.firstname").notEmpty(),
    body("password").isLength({ min: 6 }),
    body("vechical.color").notEmpty(),
    body("vechical.plate").notEmpty(),
    body("vechical.capacity").isInt({ min: 1 }),
    body("vechical.vechicalType").isIn(["car", "auto", "motercycle"]),
  ],
  captainController.registerCaptain
);

// LOGIN
router.post(
  "/login",
  [body("email").isEmail(), body("password").notEmpty()],
  captainController.loginCaptain
);

// PROFILE  ✅ MUST EXIST
router.get(
  "/profile",
  authMiddleware.authCaptain,
  captainController.getCaptainProfile
);

// LOGOUT  ✅ MUST EXIST
router.get(
  "/logout",
  authMiddleware.authCaptain,
  captainController.logoutCaptain
);

module.exports = router;