const express = require("express");
const bodyParser = require("body-parser");
var mongoose = require("mongoose");
var { ObjectId } = require("mongoose");
var mongoSecrets = require("./secrets/mongo-secrets.js");

const PORT = 9001;

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

console.log("ITS HERE ITS HERE:" + mongoSecrets.mongo_connection);
mongoose.connect(mongoSecrets.mongo_connection, { useNewUrlParser: true });
const db = mongoose.connection;

db.on("connected", () => {
  console.log("CONNECTED TO DA DB :SUNGLASSES:");
});

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
