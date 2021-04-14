const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");

const app = express();
const port = process.env.port || 1000;
app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
//const uri =
//("mongodb+srv://AYUSHI:AYUSHI@cluster0.lsd8d.mongodb.net/<dbname>?retryWrites=true&w=majority");
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Connected to MongoDB");
});
const exerciseRouter = require("./routes/exercises");
const userRouter = require("./routes/users");
app.use("/exercises", exerciseRouter);
app.use("/users", userRouter);
app.listen(port, () => {
  console.log("Server running");
});
