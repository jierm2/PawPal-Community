// Load required packages
var mongoose = require("mongoose");

// Define our user schema
var TaskSchema = new mongoose.Schema({
  ownerID: String,
  pendingWalkers: {
    type: [String],
    default: [],
  },
  taskDate: Date,
  taskDuration: Number,
  numberOfDogs: Number,
  sizeOfDogs: [Number],
  dateCreated: {
    type: Date,
    default: Date.now,
  },
});

// Export the Mongoose model
module.exports = mongoose.model("User", UserSchema);