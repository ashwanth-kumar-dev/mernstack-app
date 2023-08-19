const express = require('express');
const routers = express.Router();
const {
    addPassenger,
    deletePassengerById,
} = require('../controllers/PassengerController');
const { auth } = require('../middlewares/UserVerification');

routers.post('/addPassenger', auth, addPassenger);
routers.delete('/deletePassenger/:id', auth, deletePassengerById);

module.exports = routers;