// Import necessary modules
const express = require("express");
const router = express.Router();

const bcrypt = require("bcryptjs");
const User = require("../models/User"); // Import User model

// Define registration route
router.post("/Bregister", async (req, res) => {
  try {
    // Destructure registration data from request body
    const { userName, email, password } = req.body;

    // Check if user with the given email already exists
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // If user doesn't exist, hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user object with hashed password
    user = new User({
      userName,
      email,
      password: hashedPassword,
    });

    // Save user to the database
    await user.save();

    // Send success response
    res.status(200).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Registration error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
