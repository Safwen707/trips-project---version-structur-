
const sequelize = require('../sync');

const service=require('../service/user.service')

// Fonction pour ajouter un nouvel utilisateur
exports.addUser = async (req,res) => {
  try{
    const Data=req.body
    const userData = Object.assign({}, Data);
    const user= await service.addUser(req,res)
    res.json(user)

  }catch(err){
    res.json(err)
  }
    
    
};

    