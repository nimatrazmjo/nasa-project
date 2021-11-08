
 const { 
     getAllLaunches,
     checkIfLaunchExists,
     aboardLaunchById,
     scheduleNewLaunch,
 } = require('../../model/launch.model');

async function httGetAllLaunches(req, res) {
    res.status(200).json(await getAllLaunches());
}

async function httpAddNewLaunch(req, res) {
    const launch = req.body;
    
    if (!launch.target || !launch.mission || !launch.rocket || !launch.launchDate) {
        
        return res.status(400).json({error: 'Some field is missing'});
    } 
 1
    launch.launchDate = new Date(launch.launchDate);
    if (isNaN(launch.launchDate)) {
        return res.status(400).json({error: 'Invalid Date format'});
    }
    
    const result = await scheduleNewLaunch(launch);
    return res.status(201).json(result);
}

async function httpAbortLaunch (req, res) {
    const launchId = +req.params.id;
    const existsLaunch = await checkIfLaunchExists(launchId)
    if (!existsLaunch) {
       return res.status(404).json({error: 'Launch not found'});
    }

    const aborded = await aboardLaunchById(launchId)
    if (!aborded) {
        return res.status(400).json({error: 'Launches does not aborted'});
    }
    return res.status(200).json({ok: true});
}

module.exports = {
    httGetAllLaunches,
    httpAddNewLaunch,
    httpAbortLaunch
}