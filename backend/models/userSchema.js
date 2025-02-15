const {Schema, model} =  require('mongoose')
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

const user_schema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    isAdmin:{
        type:Boolean,
        default:false
    }
})

user_schema.pre('save', async function(next){
    if(!this.isModified('password')){
        return next()
    }
    try {
        const saltRounds = 10;
        return this.password = await bcrypt.hash(this.password, saltRounds)

    } catch (error) {
        console.log('Error in Hashing password')
    }
})

user_schema.methods.gettoken = async function(){
   try {
        return token = await jwt.sign({ name: this.name, email: this.email }, process.env.JWT_KEY);
   } catch (error) {
        console.log('Token Error '+error)
   }
}

user_schema.methods.comparePassword = async function(ele){
    try {
        return await bcrypt.compare(ele, this.password)
    } catch (error) {
        console.log('Error in Comparing password '+error)
    }
}


const User = model('user', user_schema);

module.exports = User