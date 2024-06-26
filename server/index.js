const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const port = process.env.PORT || 4000;

const Bregistration = require("./auth/Bregistration");
const Blogin = require("./auth/Blogin");
const users = require("./controller/Users");
const Course = require("./Routes/Course");
const Schedule = require("./Routes/Schedule");
require("dotenv").config();

app.use(express.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

// MongoDb connection
mongoose
  .connect(process.env.MONGODBSTRING)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

app.get("/", (req, res) => {
  res.send("Hello, World!");
});
app.use("/", Bregistration);
app.use("/", Blogin);
app.use("/", users);
app.use("/", Course);
app.use("/", Schedule);
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
