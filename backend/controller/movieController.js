const Movie = require("../models/movieSchema")
const multer  = require('multer')
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../uploads'));
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
})

  
const upload = multer({ storage: storage })

const createMovie = async(req,res)=>{
    try {

        await Movie.create({
            title:req.body.title,
            description:req.body.description,
            image:req.file.originalname,
            releaseDate:req.body.releaseDate,
        })

        res.send({msg:'Movie Added Successfully'})

    } catch (error) {
        console.log('Error in Creating Movie '+error)
    }
}

const getMovies = async (req,res)=>{
    try {
        let movie_data;
        if(req.query.id){
            movie_data = await Movie.findById(req.query.id)
            if (!movie_data) {
                return res.status(404).json({ msg: "Movie not found" });
            }
            movie_data = [movie_data]
        }else{
            movie_data = await Movie.find()
            if (!movie_data) {
                return res.status(404).json({ msg: "Movie not found" });
            }
        }

        const formatMovie = movie_data.map((ele)=>({
            ...ele._doc,
            image: `${req.protocol}://${req.get('host')}/uploads/${ele.image}`
        }
        ))
        res.send({msg:'Movie data get successfully', data: formatMovie})
    } catch (error) {
        console.log('Error in getting movies data '+error)
    }
}

module.exports = { createMovie: [upload.single('image'), createMovie], getMovies };