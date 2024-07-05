const controller=require('../controller/user.controller')

const express = require('express');
const router = express.Router();
const Booking = require('../models/booking');
const cloudinary = require('cloudinary').v2;
const upload = require('../config/multer-config');
// Cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  }); 
 






  
router.post('/register',upload.single('image'),controller.addUser );









router.get('/getUsersBooking',async(req,res)=>{
    try{
        const query=`SELECT * 
        FROM users  ,bookings   
        WHERE id_user = user_id`
         
        const rows = await sequelize.query(query, {
                          
                          type: sequelize.QueryTypes.SELECT
        });
        console.log("🚀 ~ router.get ~ rows:", rows)
        res.json(rows)


    }catch(err){
        console.log("🚀 ~ router.get ~ err:", err)
        
    }
})





module.exports= router;