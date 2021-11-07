
 const { 
     getAllLaunches,
     addNewLaunch,
     checkIfLaunchExists,
     aboardLaunchById,
 } = require('../../model/launch.model');

async function httGetAllLaunches(req, res) {
    res.status(200).json(await getAllLaunches());
}

function httpAddNewLaunch(req, res) {
    const launch = req.body;
    
    if (!launch.target || !launch.mission || !launch.rocket || !launch.launchDate) {
        
        return res.status(400).json({error: 'Some field is missing'});
    }

    launch.launchDate = new Date(launch.launchDate);
    if (isNaN(launch.launchDate)) {
        return res.status(400).json({error: 'Invalid Date format'});
    }
    
    addNewLaunch(launch);
    return res.status(201).json(launch);
}

function httpAbortLaunch (req, res) {
    const launchId = +req.params.id;
    if (!checkIfLaunchExists(launchId)) {
       return res.status(404).json({error: 'Launch not found'});
    }

    const aborded = aboardLaunchById(launchId)
    return res.status(200).json(aborded);
}

module.exports = {
    httGetAllLaunches,
    httpAddNewLaunch,
    httpAbortLaunch
}