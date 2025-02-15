const User = require('../models/userSchema')

const register = async (req,res)=>{
    try {
        const emailExist = await User.exists({email: req.body.email})

        if(emailExist){
            return res.send({'msg': 'Email Already Exist'})
        }
        
        const userData = await User.create({
            name: req.body.name,
            email:req.body.email,
            password: req.body.password,
            phone:req.body.phone,
        })

        res.send({msg:'Register Successfully', token: await userData.gettoken()})
    } catch (error) {
        console.log('Register Error '+ error)
    }
}
const login = async(req,res)=>{
    try {
        const userData = await User.findOne({email: req.body.email})
        if(!userData){
            return res.send({msg: 'Email Not Found'})
        }
        
        const is_password = userData.comparePassword(req.body.password)
        if(!is_password){
            res.send({msg:'Invalid Login Credentials'})
        }

        res.send({msg:'Login Successfully', token: await userData.gettoken()})

    } catch (error) {
      console.log('Error in Login '+ error)  
    }
}

module.exports ={register, login}