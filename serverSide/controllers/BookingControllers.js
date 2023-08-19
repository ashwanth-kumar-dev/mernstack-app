const BookingModel = require('../models/BookingModel');
const UserModel = require('../models/UserModel');
const getFormatedDate = require('../commonUtils');
const FlightDetailModel = require('../models/FlightDetailModel');
const FlightModel = require('../models/FlightModel');

const getAllBookings = async (req, res) => {
    try {
        const data =  await BookingModel.find({});
        if (data) 
         res.status(200).json({ data });

    } catch (error) {
        res.status(400).json({ message: "Resource not found "});
    }
}


const getFilteredBooking = async (req, res) => {
    try {
        const data = await BookingModel.find({
            ticketStatus: req?.body?.ticketStatus,
            emailId: req?.body?.emailId,
        });
        if (data)
           res.status(200).json({data});
    } catch (error) {
        res.status(400).json({ message: "Resource not found "});
    }
};

const createBookingDocuments = async (req, res) => {
    try {
        const {
            emailId,
            bookingCost,
            departureDate,
            arrivalDate,
            passengerDetails,
            source,
            destination,
            flight,
            flightJourney,
            selectedSeats = [],
        } = req?.body

        const {month, day, year} = getFormatedDate();
        const bookingId = `B-${day}${month}${year}-${Math.round(
            Math.random() * 1000
        )}`;
        const noOfTickets = 
          passengerDetails?.length > 0 ? passengerDetails?.length : '';
        const payload = {
            emailId,
            bookingCost,
            departureDate: new Date(departureDate),
            arrivalDate: new Date(arrivalDate),
            passengerDetails,
            source,
            destination,
            flight,
            flightJourney,
            selectedSeats,
            bookingId,
            ticketStatus: "Confirmed"
        };
        const bookingDetail = await BookingModel.create(payload);
        if (bookingDetail) {
            await UserModel.findOneAndUpdate(
                { emailId},
                { $push: {bookings: bookingDetail?._id} },
                { new: true }
            );
            await FlightDetailModel.findOneAndUpdate(
                { _id: flight},
                { $push: { bookings: bookingDetail?._id } },
                { new: true }
            );
            await FlightModel.findOneAndUpdate(
                {
                   _id: flightJourney,
                   flightList: {
                    $elemMatch: {
                        flight: flight,
                    },
                   },
                },
                {
                    $push: { "flightList.$.seatsBooked": { $each: selectedSeats } },
                }
            );
            res.status(200).json({
                bookingId,
                message: "Booking is successful"
            });
        } else {
            res.status(500).json({ message: "Unable to book the tickets "});
        }
    } catch (error) {
        res.status(502).json(error?.message || error?._message || 'Something went wrong')
    }
};

const singleUserBookingDetails = async (req, res) => {
    try {
        const { emailId } = req?.body;
        let data = await BookingModel.find({ emailId });
        if (data) {
            res.status(200).json(data);
        }
    } catch (error) {
        res.status(504).json({ message: error?.message || error?._message });
    }
};

const deleteSignleUserBooking = async ( req, res) => {
    try {
        let data = await BookingModel.find( { emailId : req?.body?.emailId });
        if (data) res.status(200).json(data);
    } catch (error) {
        res.status(504).json({ message: error?.message || error?._message });
    }
};

const cancelBookingStatus = async (req, res) => {
    try {
        const { id } = req?.params;
        let data = await BookingModel.findOneAndUpdate(
            { bookingId: id },
            { ticketStatus: "Cancelled" },
        );
        if (data) res.status(200).json(data)
    } catch (error) {
        res.status(504).json({ message: error?.message || error?._message });
    }
};

module.exports = {
    getAllBookings,
    getFilteredBooking,
    createBookingDocuments,
    singleUserBookingDetails,
    deleteSignleUserBooking,
    cancelBookingStatus,
}