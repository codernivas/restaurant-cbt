const express = require("express")
const app = express()
const port = 3088 // Declare port directly
require("./db/db")
const jwt = require("jsonwebtoken")

const userCollection = require("./model/userModel")
app.use(express.urlencoded({ extended: false }))
app.get("/", (req, res) => {
  res.send("hello world") // Corrected the response text
})

app.use(express.json())

// Register endpoint
app.post("/register", async (req, res) => {
  try {
    const { displayName, password } = req.body

    // Check if the displayName already exists
    const existingUser = await userCollection.findOne({ displayName })
    if (existingUser) {
      return res.status(400).json({ error: "displayName already exists" })
    }

    // Create a new user
    const newUser = new userCollection({ displayName, password })
    await newUser.save()
    res.status(200).send(newUser)
    // res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error("Error registering user:", error)
    res.status(500).json({ error: "Internal server error" })
  }
})
//login endpoint

app.post("/login", async (req, res) => {
  try {
    const { displayName, password } = req.body
    const user = await userCollection.findOne({ displayName })
    if (user) {
      if (password) {
        const token = jwt.sign({ displayName: displayName }, "superScretthing")
        res.status(200).json({ token: token })
      } else {
        res.json("Wrong pass")
      }
    } else {
      res.status(404).json("User not found")
    }
  } catch (e) {
    console.log(e)
    res.status(500).send("Something broke")
  }
})
app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
