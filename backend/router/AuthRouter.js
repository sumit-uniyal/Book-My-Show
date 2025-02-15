const express = require('express');
const router = express.Router();
const authController = require('../controller/authController')

router.route('/').get(authController.login)

module.exports = router