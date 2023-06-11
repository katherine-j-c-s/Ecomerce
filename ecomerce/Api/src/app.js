const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
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

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://sportwear.vercel.app",
      "http://localhost:3001",
      "https://ecomerce-production-8f61.up.railway.app",
      "https://sportwear.vercel.app/cart",
    ],

    credentials: true,
    methods: "GET, POST, OPTIONS, PUT, DELETE",
    allowedHeaders: "Origin, X-Requested-With, Content-Type, Accept",
  })
);

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
