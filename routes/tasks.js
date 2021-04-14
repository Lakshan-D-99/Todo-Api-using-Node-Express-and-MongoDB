const express = require("express");
const router = express.Router();

const Task = require("../models/Task");

// Get all the Task
router.get("/all", async (req, res) => {
  try {
    const tasks = await Task.find();

    if (tasks.length <= 0) {
      return res.status(200).json({ msg: "There are no Tasks to show" });
    }

    return res.json(tasks);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send("Server Error");
  }
});

// Get a single Task
router.get("/:id", async (req, res) => {
  try {
    const tasks = await Task.findById(req.params.id);

    if (!tasks) {
      return res.status(200).json({ msg: "This Task does not Exists!!!" });
    }

    return res.json(tasks);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send("Server Error");
  }
});

// Add a new Task
router.post("/", async (req, res) => {
  const { taskTitle, taskBody } = req.body;

  try {
    if (!taskTitle == "" && !taskBody == "") {
      let task = new Task({
        taskTitle,
        taskBody,
      });

      await task.save();

      res.send("A new Task Has been Added!!!");
    } else {
      return res.json({ msg: "Please enter Task Title and Task Body" });
    }
  } catch (error) {
    console.error(error.message);
    return res.status(500).send("Server Error");
  }
});

// Update an existing Task
router.put("/:id", async (req, res) => {
  const { taskTitle, taskBody } = req.body;

  const taskFields = {};
  if (taskTitle) taskFields.taskTitle = taskTitle;
  if (taskBody) taskFields.taskBody = taskBody;

  try {
    let task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ msg: "This Task does not exist!!!" });
    }

    task = await Task.findByIdAndUpdate(
      req.params.id,
      { $set: taskFields },
      { new: true }
    );

    res.json(task);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send("Server Error");
  }
});

// Delete an existing Task
router.delete("/:id", async (req, res) => {
  try {
    let task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ msg: "This Task does not exist!!!" });
    }

    await Task.findByIdAndRemove(req.params.id);

    res.status(200).json({ Msg: "This Task has been deleted" });
  } catch (error) {
    console.error(error.message);
    return res.status(500).send("Server Error");
  }
});

module.exports = router;
