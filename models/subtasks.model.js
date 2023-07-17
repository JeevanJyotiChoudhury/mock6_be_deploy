const mongoose = require("mongoose");

const subtaskSchema = mongoose.Schema(
  {
    title: String,
    isCompleted: Boolean,
  },
  {
    versionKey: false,
  }
);

const SubtasksModel = mongoose.model("Subtask", subtaskSchema);

module.exports = {
  SubtasksModel,
};
