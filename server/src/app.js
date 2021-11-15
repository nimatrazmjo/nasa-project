const express = require("express");
const cors = require('cors');
const path = require("path");
const morgan = require("morgan");

const api = require('./route/api');

const app = express();
app.use(cors({
    origin: 'http://localhost:3000'
}));
app.use(morgan('combined'));
app.use(express.json());
app.use('/v1', api);
app.use(express.static(path.join(__dirname,'..','public')))
module.exports = app;