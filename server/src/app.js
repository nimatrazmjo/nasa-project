const express = require("express");
const planetsRouter = require("./route/planets/planets.route");
const app = express();
app.use(express.json());
app.use(planetsRouter);
module.exports = app;