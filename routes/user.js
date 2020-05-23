'use strict'

const express = require('express');
const UserController = require('../controller/user.js');

const router = express.Router();

router.post('/login', UserController.loginUser); //login
router.post('/register', UserController.register); //create



module.exports = router;