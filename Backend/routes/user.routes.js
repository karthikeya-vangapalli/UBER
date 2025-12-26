const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.post('/logout', userController.logoutUser);
const { authUser } = require('../middlewares/auth.middlewares');

router.get('/profile', authUser, userController.getUserProfile);

module.exports = router;