const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mainRouter = require("./routes");
const passport = require("passport");
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const { conn } = require("./db");
require("dotenv").config();
const app = express();

const sessionStore = new SequelizeStore({
  db: conn, // Utiliza tu instancia de Sequelize
});

app.use(morgan("dev"));

app.use(bodyParser.json({ limit: "50mb" }));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

require("./auth")(passport); // Importa y configura la autenticación

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: sessionStore, // Utiliza SequelizeStore como almacenamiento de sesión
  })
);

sessionStore.sync();

app.use(passport.initialize()); // Inicializa Passport.js

app.use(passport.session());

app.use("/", mainRouter);

module.exports = app;
