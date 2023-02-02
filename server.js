const express = require("express");
require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");
const todoRoutes = require("./routes/todos");
const userRoutes = require("./routes/user");

// express app
const app = express();
// middle ware
app.use(cors({ origin: "*" }));
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/api/todos", todoRoutes);
app.use("/api/user", userRoutes);

// connect to db
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listen for request
    app.listen(process.env.PORT, () => {
      console.log("connected to db & app is live at port:", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });

  module.exports = app