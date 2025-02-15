const express = require('express')
const authRouter  = require('./router/AuthRouter') 
 
const app = express();
app.use('/auth/user/',authRouter);

PORT = 9000;

app.listen(PORT,()=>{
    console.log('working')
});