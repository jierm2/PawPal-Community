const express = require("express");
const bodyParser = require("body-parser");
var mongoose = require("mongoose");
var { ObjectId } = require("mongoose");
var mongoSecrets = require("./secrets/mongo-secrets.js");
var User = require("./models/user.js");
var Task = require("./models/task.js");
var cors = require("cors");

const PORT = 9001;

const app = express();

app.use(cors());
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
    var id = new mongoose.Types.ObjectId(req.params.id);

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
        .send({ message: "User not found", data: "User not found: " + req.params.id });
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
        message: "User email already exists",
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

app.delete("/api/users/:id", async (req, res) => {
  try {
    var id = new mongoose.Types.ObjectId(req.params.id);
    const user = await User.findById(id);
    if (user == null) {
      res
        .status(404)
        .send({ message: "User not found", data: "User not found: " + user.id});
      return
    }

    await Task.updateMany(
      {pendingWalkers: user._id}, 
      {$pull: {pendingWalkers: user._id}}
    );

    await Task.updateMany(
      {assignedWalker: user._id, completed: false},
      {assignedWalker: "unassigned"}
    );

    await Task.updateMany(
      {assignedWalker: user._id, completed: true},
      {assignedWalker: "deleted"}
    );

    await Task.deleteMany(
      {ownerID: user._id, completed: false}
    );

    await Task.updateMany(
      {ownerID: user._id, completed: true},
      {ownerID: "deleted"}
    );

    await User.deleteOne({ _id: id });
    res.status(200).send({ message: "OK", data: user });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server error", data: err.message });
  }
});

app.put("/api/users/:id", async (req, res) => {
  try {
    var userID = req.params.id;

    var updatedUserData = req.body;

    var user = await User.findOne({_id: userID});
    if (user == null) {
      res
        .status(404)
        .send({ message: "User not found", data: "User not found: " + userID});
      return
    }

    if (updatedUserData.email !== undefined) {
      res
        .status(500)
        .json({ message: "Cannot change user email", data: "Cannot change user email" });
      return;
    }

    if (updatedUserData.name !== undefined) {
      res
        .status(500)
        .json({ message: "Cannot change user name", data: "cannot change user name" });
      return;
    }

    var updatedUser = await User.findOneAndUpdate({_id: userID}, updatedUserData);
    res.status(200).send({ message: "OK", data: updatedUser });

  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server error", data: err.message });
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

app.get("/api/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findOne({_id: req.params.id});
    if (task === null) {
      res.status(404).send({
        message: "Task not found",
        data: "Task not found: " + req.params.id
      });
      return;
    }
    res.status(200).send({
      message: "OK",
      data: task 
    });
  } catch (err) {
    res
      .status(500)
      .send({ message: "Internal server error", data: err.message });
  }
});

app.post("/api/tasks", async (req, res) => {
  try {
    var taskData = req.body;

    if (
      !taskData.hasOwnProperty("ownerID") ||
      !taskData.hasOwnProperty("date") ||
      !taskData.hasOwnProperty("duration") ||
      !taskData.hasOwnProperty("numberOfDogs") ||
      !taskData.hasOwnProperty("sizeOfDogs") ||
      !taskData.hasOwnProperty("location")
    ) {
      res.status(500).send({
        message: "Tasks must have ownerID, date, duration, numberOfDogs, sizeOfDogs and location",
        data: "Tasks must have ownerID, date, duration, numberOfDogs, sizeOfDogs and location",
      });
      return;
    }

    const taskOwnerID = taskData.ownerID;
    const owner = await User.findOne({ _id: taskOwnerID });

    if (!owner) {
      res.status(404).send({
        message: "User not found",
        data: "User not found: " + taskOwnerID,
      });
      return;
    }

    if (taskData.numberOfDogs === 0) {
      res.status(500).send({
        message: "Number of dogs must be at least 1",
        data: "Number of dogs must be at least 1",
      });
      return;
    }

    if (taskData.numberOfDogs !== taskData.sizeOfDogs.length) {
      res.status(500).send({
        message: "Must provided sizes of all dogs",
        data: "Must provided sizes of all dogs",
      });
      return;
    }

    if (taskData.location.length !== 2) {
      res.status(500).send({
        message: "Invalid location",
        data: "Invalid location",
      });
      return;
    }

    const newTask = new Task(taskData);
    newTask.save();

    res.status(201).send({ message: "OK", data: newTask });
  } catch (err) {
    res
      .status(500)
      .send({ message: "Internal server error", data: err.message });
  }
});

app.delete("/api/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findOne({_id: req.params.id});
    if (task === null) {
      res.status(404).send({
        message: "Task not found",
        data: "Task not found: " + req.params.id
      });
      return;
    }
    let diff = new Date().getTime() - new Date(task.date).getTime();
    if (diff > 0) {
      res.status(500).send({
        message: "Cannot delete task in the past",
        data: "Cannot delete task in the past"
      });
      return;
    }

    await Task.deleteOne({_id: task._id});
    res.status(200).send({
      message: "OK",
      data: task,
    });
  } catch (err) {
    res
      .status(500)
      .send({ message: "Internal server error", data: err.message });
  }
});

app.put("/api/tasks/:id", async (req, res) => {
  try {
    const taskData = req.body;

    const task = await Task.findOne({_id: req.params.id});
    if (task === null) {
      res.status(404).send({
        message: "Task not found",
        data: "Task not found"
      });
      return;
    }

    if (task.completed === true) {
      res.status(500).send({
        message: "Cannot update a completed task",
        data: "Cannot update a completed task"
      });
      return;
    }


    if (taskData.dateCreated !== undefined && taskData.dateCreated !== task.dateCreated) {
      res.status(500).send({
        message: "Cannot change date created",
        data: "Cannot change date created"
      });
      return;
    }

    if (taskData.ownerID !== undefined && taskData.ownerID !== task.ownerID) {
      res.status(500).send({
        message: "Cannot change owner",
        data: "Cannot change owner"
      });
      return;
    }

    if (taskData.completed !== undefined) {
      if (taskData.completed === true) {
        if (task.assignedWalker === "deleted" || task.assignedWalker ===  "unassigned") {
          res.status(500).send({
            message: "Cannot complete unassigned task",
            data: "Cannot complete unassigned task"
          });
          return;
        }
        let diff = new Date().getTime() - task.date.getTime();
        if (diff < 0) {
          res.status(500).send({
            message: "Cannot complete task in the future",
            data: "Cannot complete task in the future"
          });
          return;
        }
        let assignedWalker = await User.findOne({_id: task.assignedWalker});
        if (assignedWalker === null) {
          res.status(404).send({
            message: "User not found",
            data: "User not found: " + task.assignedWalker
          });
          return;
        }
      }
    }

    if (taskData.assignedWalker !== undefined) {
      let assignedWalker = await User.findOne({_id: taskData.assignedWalker});
      if (assignedWalker === null) {
        res.status(404).send({
          message: "User not found",
          data: "User not found: " + taskData.assignedWalker
        });
        return;
      }
      if (taskData.pendingWalkers === undefined || taskData.pendingWalkers.length !== 0) {
        res.status(404).send({
          message: "Task assignments must remove all pendingWalkers",
          data: "Task assignments must remove all pendingWalkers" 
        });
        return;
      }
    }

    const updatedTask = await Task.findOneAndUpdate({_id: task._id}, taskData);

    res.status(200).send({
      message: "OK",
      data: updatedTask,
    });
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
