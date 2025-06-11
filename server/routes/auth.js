const express = require("express");
const router = express.Router();
const User = require("../Models/User"); // Assuming you have a User model

router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    console.log("📥 Received data:", req.body);

    const newUser = new User({ username, email, password });

    await newUser.save(); // Inserts into DB

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("❌ Error in register route:", error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
