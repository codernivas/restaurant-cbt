const { default: mongoose } = require("mongoose")
const mongooe = require("mongoose")

const userSchema = new mongooe.Schema({
  displayName: { type: String, required: true },
  password: { type: String, required: true },
},{timestamps:true})
const userCollection = new mongoose.model("userCollection", userSchema)
module.exports=userCollection
