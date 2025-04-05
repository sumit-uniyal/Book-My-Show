require('dotenv').config()

const express = require('express')
const authRouter  = require('./router/AuthRouter') 
const movieRouter = require('./router/MovieRouter')
const timingRouter = require('./router/TimingsRouter')
const connectDB = require('./utils/db-connection')
const path = require('path')
const cors = require('cors')
const app = express();

const corsOptions = {
    origin: ['http://localhost:5173', 'https://book-my-show-virid-theta.vercel.app'],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
};

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true })); 
app.use(express.json())

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/auth/user/',authRouter);
app.use('/show/',movieRouter)
app.use('/movie/',timingRouter)

PORT = 9000;

connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log('Server working Successfully')
    });
})
