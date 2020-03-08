/* eslint-disable quotes */
/* eslint-disable comma-dangle */
const express = require("express");

// Morgan used for logging requests
const morgan = require("morgan");
// Helmet adds and removes some fields from the header of the request
const helmet = require("helmet");
const cors = require("cors");
const mongoose = require("mongoose");
const logs = require("./api/logs");
require("dotenv").config();

const middleware = require("./middleware");

const app = express();

console.log(process.env.CORS_ORIGIN);
mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true
});

app.use(morgan("common"));
app.use(helmet());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN
  })
);
app.use(express.json());
app.get("/", (req, res) => {
  res.json({
    message: "Hello World!"
  });
});

app.use("/api/logs", logs);

app.use(middleware.notFound);

// error handler

app.use(middleware.errorHandler);

const port = process.env.PORT || 1000;

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
