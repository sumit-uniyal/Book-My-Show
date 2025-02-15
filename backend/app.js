require('dotenv').config()

const express = require('express')
const authRouter  = require('./router/AuthRouter') 
const connectDB = require('./utils/db-connection')

const app = express();

app.use(express.json())

app.use('/auth/user/',authRouter);

PORT = 9000;

connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log('Server working Successfully')
    });
})