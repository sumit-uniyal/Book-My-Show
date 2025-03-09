// const booking = require("../models/movieBooking")
const Razorpay = require('razorpay')

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
            res.status(201).json({'msg':'Payment Successfully'})
        }else{
            res.status(400).json({'msg':'Payment Fail'})
        }
       
    } catch (error) {
        console.log('Backend error in payment verification '+error)
    }
}

module.exports = {createBooking,PaymentVerification}