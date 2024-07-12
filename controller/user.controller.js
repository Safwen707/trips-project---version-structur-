
const UserService=require('../service/user.service')

class UserController{
  addUser = async (req,res) => {
    try{
     
      const user= await UserService.addUser(req)
      if ("message" in user) {
        res.status(409).json(user);
      }
      else{
        res.status(201).json(user)
      }
      
    }catch(err){
      console.log("🚀 ~ UserController ~ addUser= ~ err:", err)
      res.json({message:err})
    }
         
  };
  getUser = async (req,res) => {
    try{
      const user= await UserService.getUser(req,res)
      console.log("🚀 ~ UserController ~ getUser= ~ user:", user)
      res.json(user)
    }catch(err){
      res.json(err)
    }
  };
  getUserBooking = async (req,res) => {
      try{
        const tab= await UserService.getUserBooking(req,res)
        res.json(tab)
      }catch(err){
        console.log("🚀 ~ UserController ~ getUserBooking= ~ err:", err)
        
        res.sendStatus(500)
      }
  };


}

module.exports = new UserController(); 