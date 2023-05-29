const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mainRouter = require("./routes");

const app = express();

app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "50mb" }));

app.use("/", mainRouter);

module.exports = app;
