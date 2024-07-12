const repository = require('../repository/user.repository')
const sequelize = require('../config/db')
const bcrypt = require('bcrypt');
const User = require('../models/user')

class UserService {
    
    
   async  addUser(req){
        const userData=req.body
        const exist= await repository.checkIfExist(userData.email)
        if (!exist){
                   
                   const url =await repository.generateUrl(req)
                   const {name,email,password}= userData
                   const salt=bcrypt.genSaltSync(10);
                   const cryptedPass =  await bcrypt.hashSync(password,salt)  ;
                   const user = await User.create({ name, email,password:cryptedPass ,image:url});
                   repository.deleteDir()// to delete the directory created when the generation of url
            
                   return user
            }       
        else{
        return {message:'user exist'}
        }
        
    }
    async getUser(req,res){

        console.log("🚀 ~ UserService ~ getUser ~ req.params:", req.params)
        console.log("🚀 ~ UserService ~ getUser ~ Object.keys(req.params):", Object.keys(req.params))
        
        if (Object.keys(req.params).length !== 0){
            
            let Id
            //get user by id
            try{
                Id=req.params.id
                console.log("🚀 ~ UserService ~ getUser ~ Id:", Id)
                const user = await User.findOne({
                    where: { id_user: Id }
                });

                console.log("🚀 ~ UserService ~ getUser ~ user:", user)
                
                return user
            }catch(err){
                console.log("🚀 ~ UserService ~ getUser ~ err:", err)
                res.sendStatus(404)
            }
        }else{
            //get all users
            try{
                const tab=await User.findAll()
                console.log("🚀 ~ UserService ~ getUser ~ tab:", tab)
                return tab
            }catch(err){
                res.sendStatus(500)
            }
        }
    }

    async getUserBooking(){
        
            
        const query=`SELECT * 
        FROM users  ,bookings   
        WHERE id_user = user_id`
                 
        const tab = await sequelize.query(query, {                    
                     type: sequelize.QueryTypes.SELECT
                });
        return tab
    }
    
    
}

module.exports = new UserService();