const PassengerModel = require("../models/PassengerModel");

const addPassenger = async (req, res) => {
  try {
    const {
      gender,
      passengerName,
      passengerAge,
      bookingStatus = "Confirmed",
    } = req?.body;
    const payload = {
      gender,
      passengerName,
      passengerAge,
      bookingStatus,
    };

    const passenger = await PassengerModel.create(payload);
    if (passenger) {
      res
        .status(200)
        .json({ passenger, message: "Passenger added successfully" });
    } else {
      res.status(404).json({ message: "Please send valid request" });
    }
  } catch (error) {
    res.status(504).json(error?.message || "Something went wrong");
  }
};

const deletePassengerById = async (req, res) => {
    try {
        const { id } = req?.params;
        const product = await PassengerModel.findByIdAndDelete(id)

        if (!product)
           res.status(400).json({ message: `Cannot find the passenger with this id ${id}`})
    } catch (error) {
        res.status(504).json(error?.message || "Something went wrong");
    }
};

module.exports = { addPassenger, deletePassengerById };
