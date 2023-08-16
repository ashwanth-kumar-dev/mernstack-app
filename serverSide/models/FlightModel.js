const mongoose = require("mongoose");

const flightSchema = mongoose.Schema({
  source: {
    type: String,
    required: true,
  },
  destination: {
    type: String,
    required: true,
  },
  flightList: [
    {
      flight: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "FlightDetail",
        required: true,
      },
      seatsBooked: [
        {
          type: String,
        },
      ],
    },
  ],
});

const flightModel = mongoose.model("Flight", flightSchema);
module.exports = flightModel;
