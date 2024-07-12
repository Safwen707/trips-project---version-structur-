const express = require('express');
const router = express.Router();

const BookingController =require ("../controller/booking.controller")


router.post('/add/:user_id/:trip_id',BookingController.addBooking)

module.exports= router;