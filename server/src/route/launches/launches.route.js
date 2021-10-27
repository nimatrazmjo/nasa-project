const express = require('express');
const { httGetAllLaunches, httpAddNewLaunch } = require('./launches.controller');

const launchesRouter = express.Router();

launchesRouter.get('/', httGetAllLaunches);
launchesRouter.post('/',httpAddNewLaunch)

module.exports = launchesRouter;