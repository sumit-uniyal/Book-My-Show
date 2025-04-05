// const booking = require("../models/movieBooking")
const Razorpay = require('razorpay')
const booking = require('../models/movieBooking')

var instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET_KEY,
});

const createBooking = async (req,res)=>{
    try {
        const {amount,currency,} = req.body
          
        var options = {
          amount: Number(amount),
          currency: currency
        };
        const order = await instance.orders.create(options);

        res.status(200).json({sucess:true,order})
    } catch (error) {
        res.status(401).json({msg:'Error in creating booking '+ error})
    }
}
const PaymentVerification = async(req,res)=>{
    try {
        const { validatePaymentVerification } = require('razorpay/dist/utils/razorpay-utils');
        
        const valid = validatePaymentVerification({
            "order_id": req.body.razorpay_order_id,
            "payment_id": req.body.razorpay_payment_id
        }, req.body.razorpay_signature, process.env.RAZORPAY_SECRET_KEY);
        
        if(valid){
            const { razorpay_order_id, razorpay_payment_id, razorpay_signature, date, movie_id, user_id, seat, amount} = req.body
            const createBooking = await booking.create({
              movieId:movie_id,
              user:user_id,
              seat:seat,
              orderId:razorpay_order_id,
              paymentId:razorpay_payment_id,
              paymentSignature:razorpay_signature,
              BookingDate:date,
              price:amount
            })
            
            res.status(201).json({'msg':'Payment Successfully'})
        }else{
            res.status(400).json({'msg':'Payment Fail'})
        }
       
    } catch (error) {
        console.log('Backend error in payment verification '+error)
    }
}

const bookingDetails = async (req,res)=>{
    try {
        const result = await booking.aggregate([
            {
              $lookup: {
                from: 'movies',
                localField: 'movieId',
                foreignField: '_id',
                as: 'movieDetails'
              }
            },
            {
              $lookup: {
                from: 'users',
                localField: 'user',
                foreignField: '_id',
                as: 'userDetails'
              }
            },
            {
              $unwind: "$movieDetails"
            },
            {
              $unwind: "$userDetails"
            },
            {
              $project: {
                seat: 1,
                time: 1,
                created_on: 1,
                "movieDetails.title": 1,
                "userDetails.name": 1,
                BookingDate:1,
                price:1
              }
            }
        ])
        
        res.status(200).json({'msg':'success', 'data':result})
    } catch (error) {
        res.status(400).json({msg:`somthing went wrong ${error}`})
    }
}

module.exports = {createBooking,PaymentVerification,bookingDetails}