const express = require('express');
const routers = express.Router();
const { checkUserRole, auth } = require('../middlewares/UserVerification');

const {
    getFlightDetails,
    createFlightDetails,
    addFlightsJourney,
    editFlightsJourney,
    getAllFlightsDetails,
    getAllFlights,
    getStopFlights,
} = require('../controllers/FlightController');

routers.post('/createFlightDetails', checkUserRole, createFlightDetails);
routers.post('/addFlightsJourney', checkUserRole, addFlightsJourney);
routers.patch('/editFlightsJourney/:id', checkUserRole, editFlightsJourney);
routers.get('/getStopFlights', getStopFlights);
routers.post('/flightDetails', getFlightDetails);
routers.get('/getallJourney', getAllFlights);
routers.get('/getallFlights', getAllFlightsDetails);

module.exports = routers;