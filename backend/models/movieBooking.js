const {Schema, model,default: mongoose} = require('mongoose')

const bookingSchema = new Schema({
   movieId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Movie',
        required:true
   },
   user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
   },
   seat:{
        type:Number,
        required:true
   },
   time:{
        type:String,
        required:true
   },
   created_on:{
        type:Date,
        default:Date.now
   }
})

const booking = model('booking',bookingSchema)
module.exports = booking