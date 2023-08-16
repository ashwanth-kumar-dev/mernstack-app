const mongoose = require("mongoose")

const passengerSchema = mongoose.Schema({
    passengerName: {
        type: String,
        required: true,
    },
    passengerAge: {
        type: Number,
        required: true,
    },
    gender: {
        type: String,
        required: true,
        enum: ['Male', 'Female', 'Others'],
    },
    bookingStatus: {
        type: String,
        enum: ['Cancelled', 'Confirmed'],
        required: true,
    }
});

const PassengerModel = mongoose.model('Passenger', passengerSchema);
module.exports = PassengerModel;