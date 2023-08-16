const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  emailId: {
    type: String,
    required: true,
    unique: [true, "Please enter valid email"],
  },
  password: {
    type: String,
  },
  userName: {
    type: String,
    required: true,
  },
  userType: {
    type: String,
    required: true,
  },
  walletAmount: {
    type: Number,
    required: true,
  },
  userRole: {
    type: String,
    required: true,
    enum: ["Admin", "User"],
  },
  bookings: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
    },
  ],
});

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;
