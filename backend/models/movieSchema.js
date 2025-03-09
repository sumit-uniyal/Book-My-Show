const {Schema, model }  = require('mongoose')

const movieSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    releaseDate:{
        type:Date,
        required:true
    },
    price:{
        type:Number,
        required:true
    }
})

const Movie = model('movie', movieSchema)

module.exports = Movie