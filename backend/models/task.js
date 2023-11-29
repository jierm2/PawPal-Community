// Load required packages
var mongoose = require("mongoose");

// Define our task schema
var TaskSchema = new mongoose.Schema({
  ownerID: String,
  pendingWalkers: {
    type: [String],
    default: [],
  },
  date: Date,
  duration: Number,
  numberOfDogs: Number,
  sizeOfDogs: [Number],
  dateCreated: {
    type: Date,
    default: Date.now,
  },
  location: String,
  completed: Boolean,
  assignedWalker: String,
});

// Export the Mongoose model
module.exports = mongoose.model("Task", TaskSchema);