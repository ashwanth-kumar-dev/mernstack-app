const mongoose = require("mongoose")

const flightDetailSchema = mongoose.Schema({

    airlinesName: {
        type: String,
        required: true,
    },
    flightStatus: {
        type: String,
        required: true,
        enum: ['Running', 'Canceled'],
    },
    flightId: {
        type: String,
        required: true,
    },
    departureDate: {
        type: Date,
        required: true,
      },
      arrivalDate: {
        type: Date,
        required: true,
      },
    seatsAvailable: {
        type: Number,
        required: true,
    },
    fare: {
        type: Number,
        required: true,
    },
    stops: {
        type: Number,
        required: true,
    },
    bookings: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Booking",
        }
    ],
});

const flightDetailModel = mongoose.model('FlightDetail', flightDetailSchema);
module.exports = flightDetailModel;