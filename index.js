const express = require("express");
const { connection } = require("./db");
require("dotenv").config();
const cors = require("cors");
const { boardRouter } = require("./routes/board.route");
const { taskRouter } = require("./routes/task.route");
const { subTaskRouter } = require("./routes/subtask.route");

const app = express();
app.use(express.json());
app.use(cors());
app.use("/boards", boardRouter);
app.use("/tasks", taskRouter);
app.use("/subtasks", subTaskRouter);

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("Server running at port 8080");
    console.log("Connected to DB");
  } catch (err) {
    console.log(err);
    console.log("Something went wrong");
  }
});