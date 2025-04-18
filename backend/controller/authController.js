const User = require('../models/userSchema')

const register = async (req,res)=>{
    try {
        const emailExist = await User.exists({email: req.body.email})
        
        if(emailExist){
            return res.status(400).json({'msg': 'Email Already Exist'})
        }
        
        const userData = await User.create({
            name: req.body.name,
            email:req.body.email,
            password: req.body.password,
            phone:req.body.phone,
        })

        res.status(200).json({msg:'Login Successfully', token: await userData.gettoken(),user:{email:userData.email, isAdmin:userData.isAdmin, user_id:userData._id}})
    } catch (error) {
        res.status(400).json({msg:'error in register '+error})
    }
}
const login = async(req,res)=>{
    try {
        const userData = await User.findOne({email: req.body.email})
        if(!userData){
            return res.status(404).json({msg: 'Email Not Found'})
        }
        
        const is_password = await userData.comparePassword(req.body.password)
        if(!is_password){
            res.status(404).json({msg:'Invalid Login Credentials'})
        }

        res.status(200).json({msg:'Login Successfully', token: await userData.gettoken(),user:{email:userData.email, isAdmin:userData.isAdmin, user_id:userData._id}})

    } catch (error) {
      console.log('Error in Login '+ error)  
    }
}

module.exports ={register, login}