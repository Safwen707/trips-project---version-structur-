const UserController=require('../controller/user.controller')

const express = require('express');
const router = express.Router();
const Booking = require('../models/booking');
const cloudinary = require('cloudinary').v2;
const upload = require('../config/multer-config');
 const cloud_config =require('../config/cloud-config');
cloud_config()
// cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET,
//   });
 






  
router.post('/register',upload.single('image'),UserController.addUser );
router.get('/getUser/:id',UserController.getUser)
router.get('/getUser',UserController.getUser)

router.get('/getUserBooking',UserController.getUserBooking)





module.exports= router;