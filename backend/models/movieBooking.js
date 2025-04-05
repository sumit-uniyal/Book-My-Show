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
   orderId:{
          type:String,
          required:true
   },
   paymentId:{
          type:String,
          required:true
   },
   paymentSignature:{
     type:String,
     required:true
   },
   BookingDate:{
     type:Date,
     required:true
   },
   price:{
     type:Number,
     required:true
   },
   created_on:{
        type:Date,
        default:Date.now
   }
})

const booking = model('booking',bookingSchema)
module.exports = booking