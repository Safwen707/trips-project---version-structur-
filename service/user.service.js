const repository = require('../repository/user.repository')


const User = require('../models/user');
const sequelize = require('../sync');
const bcrypt = require('bcrypt');


async function addUser(req,res){
    userData=req.body
    exist= await repository.checkIfExist(userData.email)
    if (!exist){
        try{
               
               const url =await repository.generateUrl(req)

               const {name,email,password}= userData
               salt=bcrypt.genSaltSync(10);
               cryptedPass = await bcrypt.hashSync(password,salt)  ;
               const user = await User.create({ name, email,password:cryptedPass ,image:url});
               
               repository.deleteDir()// to delete the directory created when the generation of url
        
               return user
               
    
    
        }catch(err){
         console.log("🚀 ~ addUser ~ err:", err)
         
        }
               
    }else{
        
        res.json({message:'user exist'})
    }
    
}
module.exports = {addUser};