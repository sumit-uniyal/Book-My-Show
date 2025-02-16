const express = require('express')
const { createTiming } = require('../controller/timingsController')
const router = express.Router()

router.route('/timing').post(createTiming)

module.exports = router