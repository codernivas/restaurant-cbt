const express = require("express");
const router = express.Router();
const userCollection = require("../model/userModel");

router.post("/", async (req, res) => {
  try {
    const { displayName, password } = req.body;

    // Check if the displayName already exists
    const existingUser = await userCollection.findOne({ displayName });
    if (existingUser) {
      return res.status(400).json({ error: "displayName already exists" });
    }

    // Create a new user
    const newUser = new userCollection({ displayName, password });
    await newUser.save();
    res.status(200).send(newUser);
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
