// Load required packages
var mongoose = require("mongoose");

// Define our task schema
var TaskSchema = new mongoose.Schema({
  ownerID: String,
  date: Date,
  duration: Number,
  numberOfDogs: Number,
  sizeOfDogs: [Number],
  location: [String],
  pendingWalkers: {
    type: [String],
    default: [],
  },
  completed: {
    type: Boolean,
    default: false,
  },
  assignedWalker: {
    type: String,
    default: undefined,
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
});

// Export the Mongoose model
module.exports = mongoose.model("Task", TaskSchema);