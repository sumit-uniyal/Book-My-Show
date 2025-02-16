const express = require('express');
const router = express.Router();
const authController = require('../controller/authController')
const {validate, loginValidator, registerValidator} = require('../validators/authValidator')

router.route('/register').post(registerValidator,validate,authController.register)
router.route('/login').post(loginValidator,validate, authController.login)

module.exports = router