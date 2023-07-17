const express = require("express");
const subTaskRouter = express.Router();
const { SubtasksModel } = require("../models/subtasks.model");
const { TaskModel } = require("../models/tasks.model");


// Get all tasks
subTaskRouter.get("/", async (req, res) => {
  try {
    const subtasks = await SubtasksModel.find()
    res.json(subtasks);
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
});

// Create a new subtask
subTaskRouter.post("/:taskId/subtask", async (req, res) => {
  try {
    const { taskId } = req.params;
    const { title, isCompleted } = req.body;

    const newSubtask = await SubtasksModel.create({
      title,
      isCompleted,
    });

    const task = await TaskModel.findById(taskId);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    task.subtask.push(newSubtask._id);
    await task.save();

    res.json(newSubtask);
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
});

// Update a subtask
subTaskRouter.patch("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, isCompleted } = req.body;

    const updatedSubtask = await SubtasksModel.findByIdAndUpdate(
      id,
      { title, isCompleted },
      { new: true }
    );

    res.json(updatedSubtask);
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
});

// Delete a subtask
subTaskRouter.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await SubtasksModel.findByIdAndRemove(id);

    res.sendStatus(200);
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
});

module.exports = {subTaskRouter};
