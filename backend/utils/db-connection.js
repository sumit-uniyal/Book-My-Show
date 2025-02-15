const mongoose = require('mongoose');

const connectDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URL)
    } catch (error) {
        console.log('DataBase Error '+error)
    }
}

module.exports = connectDB