const express = require("express");
const cors = require('cors');
const path = require("path");
const morgan = require("morgan");
const planetsRouter = require("./route/planets/planets.route");
const launchesRouter = require("./route/launches/launches.route");
const app = express();
app.use(cors({
    origin: 'http://localhost:3000'
}));
app.use(morgan('combined'));
app.use(express.json());
app.use('/planets',planetsRouter);
app.use('/launches',launchesRouter);
app.use(express.static(path.join(__dirname,'..','public')))
module.exports = app;