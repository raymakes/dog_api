const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// User login
router.post('/login', userController.loginUser);

// User registration
router.post('/register', userController.registerUser);

module.exports = router;