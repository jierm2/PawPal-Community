const express = require("express");
const bodyParser = require("body-parser");
var mongoose = require("mongoose");
var { ObjectId } = require("mongoose");
var mongoSecrets = require("mongoSecrets");

const PORT = 9001;

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
