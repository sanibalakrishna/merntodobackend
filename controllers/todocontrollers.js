const { default: mongoose } = require("mongoose");
const Todo = require("../models/todoModel");

// get all todos
const getallTodos = async (req, res) => {
  const user_id = req.user._id;
  const todos = await Todo.find({ user_id }).sort({ createdAt: -1 });
  res.status(200).json(todos);
};

// get a specific todo

const getTodo = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "no such todo found" });
  }
  const todo = await Todo.findById(id);
  if (!todo) {
    return res.status(404).json({ message: "no such todo found" });
  }
  res.status(200).json(todo);
};

// create a todo
const createTodo = async (req, res) => {
  const { taskname, priority } = req.body;
  // add
  const emptyfields = [];
  if (!taskname) {
    emptyfields.push("taskname");
  }
  if (!priority) {
    emptyfields.push("priority");
  }
  if (emptyfields.length > 0) {
    return res
      .status(404)
      .json({ message: "Please fill all the fields", fields: emptyfields });
  }
  try {
    const user_id = req.user._id;
    const todo = await Todo.create({ taskname, priority, user_id });
    res.status(200).json(todo);
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};
// delete a todo
const deleteTodo = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "no such todo found" });
  }
  const todo = await Todo.findOneAndDelete({ _id: id });
  if (!todo) {
    return res.status(404).json({ message: "no such todo found" });
  }
  res.status(200).json(todo);
};

// update a todo

const updateTodo = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "no such todo found" });
  }
  const todo = await Todo.findOneAndUpdate({ _id: id }, req.body);
  if (!todo) {
    return res.status(404).json({ message: "no such todo found" });
  }
  res.status(200).json(todo);
};

module.exports = { createTodo, getallTodos, getTodo, deleteTodo, updateTodo };
