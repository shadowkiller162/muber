const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const routes = require("./routes/routes");
const app = express();

mongoose.Promise = global.Promise;

if (process.env.NODE_ENV !== "test"){
  mongoose.connect("mongodb://localhost/muber");
}
// 必須放在 route(app) 之前
app.use(bodyParser.json());
routes(app);
// 必須放在 route(app) 之後
app.use((err, req, res, next) => {
  res.status(422).send({error: err.message});
});

module.exports = app;
