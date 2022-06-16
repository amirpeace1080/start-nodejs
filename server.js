const express = require("express");
const cors = require("cors");
const Joi = require("joi");
const config = require("config");
const morgan = require('morgan');
const debugConfiguration = require("debug")("app:configuration")
const debugDB = require("debug")("app:Db");
const CustomerRoutes = require("./routes/CustomerRoutes")
const HomeRoutes = require("./routes/HomeRoutes");
const Logger = require("./middleware/Logger");
const SaeedForbiddenAuth = require("./middleware/SaeedForbiddenAuth");
const app = express();

// built-in middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));

if (app.get("env") === "production")
  app.use(morgan('tiny'));

debugConfiguration("some configuration");

// db ...
debugDB("db initialized");

// third-party middleware
app.use(cors());


// my middleware
app.use(Logger);
app.use(SaeedForbiddenAuth);

//routes
app.use(CustomerRoutes);
app.use(HomeRoutes);

// configuration
console.log(config.get("databaseAddress"));

app.set("view engine", "pug");
app.set("views", "./views"); // default


const port = process.env.myPort || 3000;
app.listen(port, (err) => {
  if (err) console.log(err)
  else console.log(`app listen to port ${port}`);
})