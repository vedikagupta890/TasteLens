const express = require('express');
const signupController = require('../controllers/signupController.js');
const loginController = require('../controllers/loginController.js');
const refreshController = require('../controllers/refreshController.js');
const logoutController = require("../controllers/logoutController.js");

const router = express.Router();

// Signup route
router.post('/signup', signupController.signup);

// Login route
router.post('/login', loginController.login);

//refresh token
router.post('/refresh', refreshController.refreshToken);

// Logout route
router.post("/logout", logoutController.logout);

module.exports = router;