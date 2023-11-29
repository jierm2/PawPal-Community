const express = require("express");
const bodyParser = require("body-parser");
var mongoose = require("mongoose");
var { ObjectId } = require("mongoose");
var mongoSecrets = require("./secrets/mongo-secrets.js");
var User = require("./models/user.js");
var Task = require("./models/task.js");

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

app.get("/api/tasks", async (req, res) => {
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

    const documents = await Task.find(where, select, options);

    res
      .status(201)
      .send({ message: "OK", data: count ? documents.length : documents });
  } catch (err) {
    res
      .status(500)
      .send({ message: "Internal server error", data: err.message });
  }
});

app.post("/api/tasks", async (req, res) => {
  try {
    var taskData = req.body;

    if (!taskData.hasOwnProperty("ownerID") 
        || !taskData.hasOwnProperty("date")
        || !taskData.hasOwnProperty("duration")
        || !taskData.hasOwnProperty("numberOfDogs")
        || !taskData.hasOwnProperty("sizeOfDogs")
    ) {
      res.status(500).send({
        message: "Internal server error",
        data: "Tasks must have ownerID, email, date, duration, numberOfDogs and sizeOfDogs",
      });
      return;
    }

    const taskOwnerID = taskData.ownerID;
    const owner = await User.findOne({_id: taskOwnerID});

    if (!owner) {
      res.status(500).send({
        message: "Internal server error",
        data: "User does not exist",
      });
      return;
    }

    if (taskData.numberOfDogs === 0) {
      res.status(500).send({
        message: "Internal server error",
        data: "Number of dogs must be at least 1",
      });
      return;
    }

    if (taskData.numberOfDogs !== taskData.sizeOfDogs.length) {
      res.status(500).send({
        message: "Internal server error",
        data: "Must provided sizes of all dogs",
      });
      return;
    }

    const newTask = new Task(taskData);
    newTask.save();

    owner.pendingTasks.push(newTask._id);
    owner.save();
    // console.log(bob);

    res.status(201).send({ message: "OK", data: newTask });
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
