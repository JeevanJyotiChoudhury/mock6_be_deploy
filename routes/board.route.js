const express = require("express");
const boardRouter = express.Router();
const {BoardModel} = require("../models/boards.model");

// Get all boards
boardRouter.get('/', async (req, res) => {
  try {
    const boards = await BoardModel.find().populate({
      path: "tasks",
      populate: { path: "subtask" },
    });
    res.json(boards);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
});

// Create a new board
boardRouter.post('/', async (req, res) => {
  try {
      const { name } = req.body;
      console.log(name, "name");
        const newBoard = new BoardModel({ name });
        await newBoard.save();
        res.status(200).json({ message: "New board created" });
  } catch (error) {
    res.status(400).json({ error: 'An error occurred' });
  }
});

// Delete a board
boardRouter.delete('/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await BoardModel.findByIdAndDelete(id);
    res.sendStatus(200);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
});

// Update a board
boardRouter.patch("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const updatedBoard = await BoardModel.findByIdAndUpdate(
      id,
      { name }
    );

    res.json(updatedBoard);
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
});

module.exports = {boardRouter};