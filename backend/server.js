const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const path = require("path");

const port = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/gecko", require("./routes/geckoRoute"));
app.use("/api/twitter", require("./routes/twitterRoute"));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
