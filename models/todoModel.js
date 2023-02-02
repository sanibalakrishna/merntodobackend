const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const todoSchema = new Schema(
  {
    taskname: {
      type: String,
      required: [true, "A task should have a taskname"],
    },
    priority: {
      type: String,
      required: [true, "A task must contain a priority"],
    },
    user_id: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Todo", todoSchema);
