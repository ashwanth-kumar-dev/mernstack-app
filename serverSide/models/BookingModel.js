const mongoose = require("mongoose");
const validator = require("validator");

const bookingSchema = mongoose.Schema({
  emailId: {
    type: String,
    required: true,
    validate: [validator?.isEmail, "Please enter valid email"],
  },
  bookingId: {
    type: String,
    required: true,
  },
  bookingCost: {
    type: Number,
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
  source: {
    type: String,
    required: true,
  },
  destination: {
    type: String,
    required: true,
  },
  flight: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "FlightDetail",
    required: true,
  },
  noOfTickets: {
    type: Number,
    required: true,
  },
  passengerDetails: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Passenger",
      required: true,
    },
  ],
  ticketStatus: {
    type: String,
    required: true,
  },
});

const bookingModel = mongoose.model("Booking", bookingSchema);
module.exports = bookingModel;
