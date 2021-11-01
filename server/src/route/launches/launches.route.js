const express = require('express');
const { httGetAllLaunches, httpAddNewLaunch, httpAbortLaunch } = require('./launches.controller');

const launchesRouter = express.Router();

launchesRouter.get('/', httGetAllLaunches);
launchesRouter.post('/',httpAddNewLaunch)
launchesRouter.delete('/:id',httpAbortLaunch);

module.exports = launchesRouter;