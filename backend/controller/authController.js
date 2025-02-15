const login = async (req,res)=>{
    try {
        res.send({msg:'hii from controller'})
    } catch (error) {
        console.log('Login Error '+ error)
    }
}

module.exports ={login}