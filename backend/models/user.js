// Load required packages
var mongoose = require("mongoose");

// Define our user schema
var UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  // tasks: {
  //   type: [String],
  //   default: [],
  // },
  // pendingTasks: {
  //   type: [String],
  //   default: [],
  // },
  // assignedTasks: {
  //   type: [String],
  //   default: [],
  // },
  // completedTasks: {
  //   type: [String],
  //   default: [],
  // },
  location: [Number],
  dateCreated: {
    type: Date,
    default: Date.now,
  },
});

// Export the Mongoose model
module.exports = mongoose.model("User", UserSchema);
