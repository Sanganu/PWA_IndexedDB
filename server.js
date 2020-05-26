const express= require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const compression = require("compression");
require('dotenv').config();

const PORT = 3000;

const app = express();

app.use(logger("dev"));

app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/dictionary1", {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology:true
});

mongoose.connection.on("error",(error) => {
  console.log("Error in connecting to Database",error)
})

// routes
app.use(require("./routes/api.js"));

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});