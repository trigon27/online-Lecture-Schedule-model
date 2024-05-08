const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User");

// Login route
router.post("/Blogin", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Determine if the user is an admin
    const isAdmin = user.isAdmin; // You need to adjust this based on your schema

    // Respond with a token or session cookie for authentication
    // Here you can use JWT or any other authentication mechanism
    // For simplicity, let's assume you're sending a session cookie

    // Set session cookie
    res.cookie("isLoggedIn", true);

    // Redirect based on user role
    if (isAdmin) {
      // Redirect to admin dashboard
      res.json({ isAdmin: true });
    } else {
      // Redirect to normal user dashboard
      res.json({ isAdmin: false });
    }
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
