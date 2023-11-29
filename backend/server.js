const express = require("express");
const bodyParser = require("body-parser");

const PORT = 9001;

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
