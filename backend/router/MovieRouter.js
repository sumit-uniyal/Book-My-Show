const express = require('express')
const movieController = require('../controller/movieController')
const bookingController = require('../controller/bookingController')
const router = express.Router()

router.route('/movie').post(movieController.createMovie)
router.route('/get/movies').get(movieController.getMovies)
router.route('/booking/create-booking').post(bookingController.createBooking)
router.route('/booking/payment-verification').post(bookingController.PaymentVerification)
module.exports = router