const {userModel} = require('../models/user.model')

const validateUser = async (user) =>{
    try{
        const validate = await userModel.validate(user);
        console.log(validate)
        return true;
    }catch(error){
        console.log(error.message)
        throw error;
    }
}

module.exports = {validateUser}