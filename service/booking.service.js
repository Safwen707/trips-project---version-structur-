const sequelize = require('../config/db')
const Booking=require("../models/booking")
 class BookingService{
    async addBooking(req){
            try{
                const { user_id, trip_id } = req.params;
                const booking=await Booking.create({user_id:parseInt(user_id),trip_id:parseInt(trip_id)})
                return booking
            }catch(error){
            console.log("🚀 ~ router.post ~ error:", error)
        
            }
        
    }
 }
 module.exports = new BookingService();