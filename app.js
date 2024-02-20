const express = require("express");
const app = express();
const port = 3088;
require("./db/db");

const loginRouter = require("./routes/login");
const registerRouter = require("./routes/register");
const customerRouter = require("./routes/newcustomer");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/login", loginRouter);
app.use("/register", registerRouter);
app.use("/newcustomer", customerRouter);

app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
