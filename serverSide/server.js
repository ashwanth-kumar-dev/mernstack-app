const mongoose = require("mongoose");
const express = require("express");
const app = express();
const cors = require('cors')
const dotenv = require("dotenv").config();
const User = require("./routes/AccountRoutes");
const Passenger = require('./routes/PassengerRoutes');
const Flight = require('./routes/FlightRoutes');
const Booking = require('./routes/BookingRoutes');

app.use([express.json(), cors()]);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(process.env.PORT || 4000, ()=>{
      console.log(`server started in port ${process.env.PORT_NO}`);
    });
    console.log("connected to monogodb");
  })
  .catch((err) => {
    console.error(err);
  });

app.use('/user', User);
app.use('/passenger', Passenger);
app.use('/flight', Flight);
app.use('/booking', Booking);

app.get('*', function (req, res) {
  res.status(404).json("Invalid URL Request")
});
