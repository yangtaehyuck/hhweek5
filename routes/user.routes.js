const express = require('express');
const router = express.Router();

const UserController = require('../controllers/user.controller');
const userController = new UserController();

router.post('/login', userController.loginUser);
router.post('/signup', userController.signupUser);

module.exports = router;