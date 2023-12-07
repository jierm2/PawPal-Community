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

app.get("/api/task/:id", async (req, res) => {
  try {
    if (req.params.id === undefined) {
      res.status(500).send({
        message: "No id provided",
        data: "User must provide an id to a corresponding task"
      });
      return;
    }
    const document = await Task.findOne({_id: req.params.id});
    if (document === null) {
      res.status(404).send({
        message: "Task not found",
        data: "No task matching the provided id"
      });
      return;
    }
    res.status(200).send({
      message: "OK",
      data: document
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

    if (!taskData.hasOwnProperty("ownerID") 
        || !taskData.hasOwnProperty("date")
        || !taskData.hasOwnProperty("duration")
        || !taskData.hasOwnProperty("numberOfDogs")
        || !taskData.hasOwnProperty("sizeOfDogs")
        || !taskData.hasOwnProperty("location")
    ) {
      res.status(500).send({
        message: "Internal server error",
        data: "Tasks must have ownerID, date, duration, numberOfDogs, sizeOfDogs and location",
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

    if (taskData.location.length !== 2) {
      res.status(500).send({
        message: "Internal server error",
        data: "Invalid location",
      });
      return;
    }

    const newTask = new Task(taskData);
    newTask.save();

    owner.tasks.push(newTask._id);
    owner.save();
    // console.log(bob);

    res.status(201).send({ message: "OK", data: newTask });
  } catch (err) {
    res
      .status(500)
      .send({ message: "Internal server error", data: err.message });
  }
});

app.delete("/api/task/:id", async (req, res) => {
  try {
    if (req.params.id === undefined) {
      res.status(500).send({
        message: "No id provided",
        data: "User must provide an id to a corresponding task"
      });
      return;
    }

    const task = await Task.findOne({_id: req.params.id});
    if (task === null) {
      res.status(404).send({
        message: "Task not found",
        data: "No task matching the provided id"
      });
      return;
    }
    let diff = new Date().getTime() - new Date(task.date).getTime();
    if (diff > 0) {
      res.status(500).send({
        message: "Cannot delete task in the past",
        data: "Tasks in the past cannot be deleted"
      });
      return;
    }
    let owner = await User.findOne({_id: task.ownerID});
    console.log(owner);
    owner.tasks = owner.tasks.filter((element) => {return element !== req.params.id});
    await owner.save();

    let pendingWalkers = await User.find({_id: {$in: task.pendingWalkers}});
    for (pendingWalker of pendingWalkers) {
      pendingWalker.pendingTasks = pendingWalker.pendingTasks.filter((element) => {return element !== req.params.id});
      pendingWalker.assignedTasks = pendingWalker.assignedTasks.filter((element) => {return element !== req.params.id});
      await pendingWalker.save();
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

app.put("/api/task/:id", async (req, res) => {
  try {
    if (req.params.id === undefined) {
      res.status(500).send({
        message: "No id provided",
        data: "User must provide an id to a corresponding task"
      });
      return;
    }

    const taskData = req.body;

    const task = await Task.findOne({_id: req.params.id});
    if (task === null) {
      res.status(404).send({
        message: "Task not found",
        data: "No task matching the provided id"
      });
      return;
    }

    if (task.completed === true) {
      res.status(500).send({
        message: "Cannot update a completed task",
        data: "Tasks that have been completed cannot be updated"
      });
      return;
    }

    if (taskData.dateCreated !== undefined && taskData.dateCreated !== task.dateCreated) {
      res.status(500).send({
        message: "Cannot change date created",
        data: "Date of creation cannot be changed for a task"
      });
      return;
    }

    if (taskData.ownerID !== undefined && taskData.ownerID !== task.ownerID) {
      res.status(500).send({
        message: "Cannot change owner",
        data: "Tasks cannot be reassigned to a new owner"
      });
      return;
    }

    if (taskData.completed !== undefined) {
      if (taskData.completed === true) {
        let diff = new Date().getTime() - task.date.getTime();
        if (diff < 0) {
          res.status(500).send({
            message: "Cannot complete task in the future",
            data: "Tasks that have a date in the future cannot be assigned complete"
          });
          return;
        }
        let assignedWalker = await User.findOne({_id: taskData.assignedWalker});
        if (assignedWalker === null) {
          res.status(404).send({
            message: "User not found",
            data: "Assigned walker not found for task"
          });
          return;
        }
        assignedWalker.assignedTasks = assignedWalker.assignedTasks.filter((element) => {return element !== task._id});
        assignedWalker.completedTasks = assignedWalker.completedTasks + [task._id];
      }
    }

    if (taskData.assignedWalker !== undefined) {
      let assignedWalker = await User.findOne({_id: taskData.assignedWalker});
      if (assignedWalker === null) {
        res.status(404).send({
          message: "User not found",
          data: "No user matching the provided id: ${taskData.assignedWalker}"
        });
        return;
      }
      assignedWalker.assignedTasks = assignedWalker.assignedTasks + [task._id];
      await assignedWalker.save();
      let pendingWalkers = await User.find({_id: {$in: task.pendingWalkers}});
      for (pendingWalker of pendingWalkers) {
        pendingWalker.pendingTasks = pendingWalker.pendingTasks.filter((element) => {return element !== req.params.id});
        pendingWalker.assignedTasks = pendingWalker.assignedTasks.filter((element) => {return element !== req.params.id});
        await pendingWalker.save();
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
