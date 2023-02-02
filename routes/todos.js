const express = require("express");
const router = express.Router();
const {
  createTodo,
  getallTodos,
  getTodo,
  deleteTodo,
  updateTodo,
} = require("../controllers/todocontrollers");
const requireAuth = require("../middleware/requireAuth");

// get middleware
router.use(requireAuth);

// get all todos
router.get("/", getallTodos);

// get single todo
router.get("/:id", getTodo);

// post a new todo
router.post("/", createTodo);

// delete a todo
router.delete("/:id", deleteTodo);

// updata a  todo
router.patch("/:id", updateTodo);

module.exports = router;
