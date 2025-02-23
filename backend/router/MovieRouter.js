const express = require('express')
const movieController = require('../controller/movieController')
const router = express.Router()

router.route('/movie').post(movieController.createMovie)
router.route('/get/movies').get(movieController.getMovies)
router.route('/get/movie/:id').get(movieController.getMovieById)
module.exports = router