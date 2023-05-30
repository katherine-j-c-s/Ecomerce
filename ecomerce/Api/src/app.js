const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mainRouter = require("./routes");

const app = express();

app.use(morgan("dev"));

app.use(bodyParser.json({ limit: "50mb" }));

app.use((req, res, next) => {
  res.append("Access-Control-Allow-Origin", ["*"]);
  res.append("Access-Control-Allow-Methods", "GET, DELETE, PATCH, POST");
  res.append("Access-Control-Allow-Headers", "Content-type");
  next();
});

app.use("/", mainRouter);

module.exports = app;
