const express = require("express");
const bodyParser = require("body-parser");
var mongoose = require("mongoose");
var { ObjectId } = require("mongoose");
var mongoSecrets = require("./secrets/mongo-secrets.js");
var User = require("./models/user.js");

const PORT = 9001;

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect(mongoSecrets.mongo_connection, { useNewUrlParser: true });
const db = mongoose.connection;

app.get("/api/users", async (req, res) => {
  try {
    var where = req.query.where ? JSON.parse(req.query.where) : {};
    var sort = req.query.sort;
    var select = req.query.select ? JSON.parse(req.query.select) : {};
    var skip = req.query.skip;
    var limit = req.query.limit;
    var count = req.query.count === "true";

    var options = {
      sort: sort ? JSON.parse(sort) : sort,
      skip: parseInt(skip),
      limit: parseInt(limit),
      // count: (count === 'true'),
    };

    const documents = await User.find(where, select, options);

    res
      .status(201)
      .send({ message: "OK", data: count ? documents.length : documents });
  } catch (err) {
    res
      .status(500)
      .send({ message: "Internal server error", data: err.message });
  }
});

app.get("/api/users/:id", async (req, res) => {
  try {
    var select = req.query.select ? JSON.parse(req.query.select) : {};
    var id = new ObjectId(req.params.id);

    var filter = {
      _id: id,
    };

    const user = await User.find(filter, select, {});
    if (user.length) {
      // GET
      res.status(200).send({ message: "OK", data: user });
    } else {
      res
        .status(404)
        .send({ message: "User not found", data: "User not found" });
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server error", data: err.message });
  }
});

app.post("/api/users", async (req, res) => {
  try {
    // console.log(req.body);
    var userData = req.body;

    if (!userData.hasOwnProperty("name") || !userData.hasOwnProperty("email")) {
      res.status(500).send({
        message: "User must have a name and an email",
        data: "User must have a name and an email",
      });
      return;
    }

    // console.log(`USER DATA: ${userData}`);
    const userEmail = userData.email;
    const existingUser = await User.findOne({ email: userEmail });

    if (existingUser) {
      res.status(500).send({
        message: "Internal server error",
        data: "User email already exists",
      });
      return;
    }

    const bob = new User(userData);
    bob.save();

    // console.log(bob);

    res.status(201).send({ message: "OK", data: bob });
  } catch (err) {
    res
      .status(500)
      .send({ message: "Internal server error", data: err.message });
  }
});

db.on("connected", () => {
  console.log("CONNECTED TO DA DB :SUNGLASSES:");
});

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
