const {Schema, model, default: mongoose} = require('mongoose')

const timingSchema = new Schema ({
    movieId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Movie',
        required:true
    },
    time:{
        type:[String],
        required:true
    },
    seats:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    }
})

const Timings = model('timings', timingSchema)

module.exports = Timings