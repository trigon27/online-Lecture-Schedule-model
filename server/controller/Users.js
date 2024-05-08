const express = require("express");
const mongoose = require("mongoose");
const User = require("../models/User"); // Assuming your user model is in a separate file
const Users = express.Router();

// Endpoint to get all users
Users.get("/Busers", async (req, res) => {
  try {
    const users = await User.find({ isAdmin: false });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});
module.exports = Users;
