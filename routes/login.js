const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const userCollection = require("../model/userModel");
// const authMiddle=require("../helper/auth")

router.post("/", async (req, res) => {
  try {
    const { displayName, password } = req.body;
    const user = await userCollection.findOne({ displayName });
    if (user) {
      if (password) {
        const token = jwt.sign({ displayName: displayName }, "superScretthing");
        res.status(200).json({ token: token });
      } else {
        res.json("Wrong pass");
      }
    } else {
      res.status(404).json("User not found");
    }
  } catch (e) {
    console.log(e);
    res.status(500).send("Something broke");
  }
});

module.exports = router;
