
 const { 
     getAllLaunches,
     addNewLaunch,
 } = require('../../model/launch.model');

function httGetAllLaunches(req, res) {
    res.status(200).json(getAllLaunches());
}

function httpAddNewLaunch(req, res) {
    const launch = req.body;
    launch.launchDate = new Date(launch.launchDate);
    if (!launch.destination || !launch.mission || !launch.rocket || !launch.launchDate) {
        return res.status(400).json({error: 'Some field is missing'});
    }

    if (isNaN(launch.launchDate)) {
        return res.status(400).json({error: 'Invalid Date format'});
    }
    
    addNewLaunch(launch);
    return res.status(201).json(launch);
}

module.exports = {
    httGetAllLaunches,
    httpAddNewLaunch,
}