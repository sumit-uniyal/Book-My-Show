const Timings = require("../models/showTimingSchema")

const createTiming = async (req,res)=>{
    try {
        const {movieId, time, seats, price} = req.body

        await Timings.create({
            movieId,
            time,
            seats,
            price 
        })
        res.send({'msg':'Timings Saved successfully'})
    } catch (error) {
        console.log('Error in Creatinig timings '+error)
    }
}

module.exports = {createTiming}