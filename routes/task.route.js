const express = require("express");
const taskRouter = express.Router();
const { TaskModel } = require("../models/tasks.model");
const { BoardModel } = require("../models/boards.model");

// Get all tasks
taskRouter.get("/", async (req, res) => {
  try {
    const tasks = await TaskModel.find().populate("subtask");
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
});

// Create a new task
taskRouter.post("/:boardId/task", async (req, res) => {
  const { boardId } = req.params;
  const { title, description, status } = req.body;
  try {
    const newTask = new TaskModel({
      title,
      description,
      status,
    });
    await newTask.save();
    const board = await BoardModel.findById(boardId);
    console.log(board, "board");
    if (!board) {
      return res.status(404).json({ error: "Board not found" });
    }
    board.tasks.push(newTask._id);
    await board.save();

    res.json(newTask);
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
});

// Update a task
taskRouter.patch("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status } = req.body;
    const updatedTask = await TaskModel.findByIdAndUpdate(
      id,
      {
        title,
        description,
        status,
      },
      { new: true }
    );
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
});

// Delete a task
taskRouter.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await TaskModel.findByIdAndDelete(id);
    res.sendStatus(200);
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
});

module.exports = {
  taskRouter,
};
