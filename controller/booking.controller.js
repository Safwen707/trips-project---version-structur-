const BookingService= require("../service/booking.service")

class BookingController{
    addBooking = async(req,res)=>{
      try{
        const booking=await BookingService.addBooking(req)
        res.status(201).send(booking)
      }catch(err){
        res.status(500).send({message:err})
      }
    }
}
module.exports = new BookingController(); 