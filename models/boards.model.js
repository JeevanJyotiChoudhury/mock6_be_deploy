const mongoose = require("mongoose");

const boardSchema = mongoose.Schema(
  {
    name: String,
    tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],
  },
  {
    versionKey: false,
  }
);

const BoardModel = mongoose.model("Board", boardSchema);

module.exports = {
  BoardModel,
};
