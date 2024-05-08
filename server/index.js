const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const port = 4000;
const Bregistration = require("./auth/Bregistration");
const Blogin = require("./auth/Blogin");

app.use(express.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

// MongoDb connection
mongoose
  .connect(
    "mongodb+srv://shaikhpc:pokemon@cluster0.s678p38.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

app.get("/", (req, res) => {
  res.send("Hello, World!");
});
app.use("/", Bregistration);
app.use("/", Blogin);
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
