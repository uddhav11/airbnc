// const mongoose= require('mongoose')

// const BookingSchema= new mongoose.Schema({
//     place: {type: mongoose.Schema.Types.ObjectId, required:true},
//     checkIn: {type:Date, required:true},
//     checkOut: {type:Date, required:true},
//     name: {type:String, required:true},
//     phone: {type:String, required:true},
//     price: Number,
// })

// const BookingModel= mongoose.model('Booking', BookingSchema)

// module.exports= BookingModel


const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    place: { type: mongoose.Schema.Types.ObjectId, ref: 'Place', required: true },
    user: {type:mongoose.Schema.Types.ObjectId, required:true, ref: 'user'},
    checkIn: { type: Date, required: true },
    checkOut: { type: Date, required: true },
    numberOfGuests: { type: Number, required: true }, // Add this if you're tracking the number of guests
    name: { type: String, required: true },
    email: { type: String, required: true }, // Add email if it's being used
    phone: { type: String },
    price: { type: Number, required: true },
});

const BookingModel = mongoose.model('Booking', BookingSchema);

module.exports = BookingModel;
