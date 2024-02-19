const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://cbehotel:cbehotel2204@cluster0.tyfgrhi.mongodb.net/registerform").then(() => {
  console.log("Connected to the database");
}).catch((error) => {
  console.error("Error connecting to the database:", error);
});

// Other server setup code (listing on port 3088) can go here
