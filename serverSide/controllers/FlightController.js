const { trusted } = require("mongoose");
const FlightDetailModel = require("../models/FlightDetailModel");
const FlightModel = require("../models/FlightModel");

const getFlightDetails = async (req, res) => {
  try {
    const { limit = 10, page = 1 } = req?.body;
    const skip = (page - 1) * limit;
    const { source = "", destination = "" } = req?.body;

    const flightData = await FlightModel.find({ source, destination })
      .populate({
        path: "flightList",
        populate: {
          path: "flight",
          match: {
            stops: req?.body?.stops ? req?.body?.stops : { $exists: true },
            fare: req?.body?.fare
              ? { $gte: req?.body?.fare }
              : { $exists: true },
          },
        },
      })
      .skip(skip)
      .limit(limit);
    exec();
    if (flightData?.[0]?.flightList?.length > 0) {
      res.status(200).json(flightData?.[0]);
    } else {
      res.status(404).json({
        message: "No flights available for your preferred destination",
      });
    }
  } catch (error) {
    res.status(504).json(error?.message || error?._message);
  }
};

const createFlightDetails = async (req, res) => {
  try {
    const {
      airlinesName,
      flightStatus,
      departureTime,
      arrivalTime,
      seatsAvailable,
      stops,
      fare,
      bookings = [],
    } = req?.body;
    const flightId = `${airlinesName?.substring(0, 5)}-${Math.round(
      Math.random() * 1000
    )}`;
    const payload = {
      airlinesName,
      flightStatus,
      flightId,
      departureTime: new Date(departureTime),
      arrivalTime: new Date(arrivalTime),
      seatsAvailable,
      fare,
      stops,
      bookings,
    };
    const flightDetailData = await FlightDetailModel.create(payload);
    if (flightDetailData) {
      res.status(200).json({
        flightDetailData,
        message: "flight details created successfully",
      });
    }
  } catch (error) {
    res.status(504).json(error?.message || error?._message);
  }
};

const addFlightsJourney = async (req, res) => {
  try {
    const { source, destination, flights } = req?.body;
    const payload = {
      source,
      destination,
      flightList: [
        {
          flight: flights?.[0],
          seatsBooked: [],
        },
      ],
    };

    const flightData = await FlightModel.create(payload);
    if (flightData)
      res.status(200).json({
        flightData,
        message: "Flights addedd successfully ",
      });
    else res.status(404).json({ message: "Please send valid request paylod" });
  } catch (error) {
    res.status(500).json(error?.message || "Something went wrong");
  }
};

const editFlightsJourney = async (req, res) => {
  try {
    const { id } = req?.params;
    const updatedFlightData = await FlightModel.findOneAndUpdate(
      { _id: id },
      {
        $push: {
          flightList: { flight: req?.body?.flights, seatsBooked: [] },
        },
      },
      { new: true }
    );
    if (updatedFlightData)
      res.status(200).json({
        updatedFlightData,
        message: "Please send valid id or payload",
      });
  } catch (error) {
    res.status(502).json(error?.message || "Something went wrong");
  }
};

const getAllFlights = async (req, res) => {
  try {
    const data = await FlightModel.find({});

    if (data) res.status(200).json(data);
  } catch (error) {
    res.status(502).json(error?.message || "Something went wrong");
  }
};

const getStopFlights = async (req, res) => {
  try {
    const data = await FlightDetailModel.find({ stops: req?.body?.stops });

    if (data) res.status(200).json(data);
  } catch (error) {
    res.status(504).json(error?.message || "Something went wrong");
  }
};

const getAllFlightsDetails = async (req, res) => {
  try {
    const data = await FlightDetailModel.find({});

    if (data) res.status(200).json(data);
  } catch (error) {
    res.status(504).json(error?.message || "Something went wrong");
  }
};

module.exports = {
  getFlightDetails,
  createFlightDetails,
  addFlightsJourney,
  editFlightsJourney,
  getStopFlights,
  getAllFlights,
  getAllFlightsDetails,
};
