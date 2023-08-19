const express = require('express');
const routers = express.Router();
const { checkUserRole, auth } = require('../middlewares/UserVerification');
const {
    getAllBookings,
    getFilteredBooking,
    createBookingDocuments,
    deleteSignleUserBooking,
    singleUserBookingDetails,
    cancelBookingStatus,
} = require('../controllers/BookingControllers');

routers.get('/allbookings', checkUserRole, getAllBookings);
routers.post('/singleUserBooking', singleUserBookingDetails);
routers.delete('/deleteUserBookings', deleteSignleUserBooking);
routers.patch('/cancelTicket/:id', cancelBookingStatus);
routers.post('/filteredBookings', auth, getFilteredBooking);
routers.post('/createBooking', auth, createBookingDocuments);

module.exports = routers;