const launches = require('./launches.mongo');
const planets = require('./planets.mongo');
const DEFAULT_FLIGHT_NUMBER = 100;
const launch = {
    flightNumber: 100,
    mission: "Kepler Exploration X",
    rocket: "Explorer IS1",
    launchDate: new Date("December 27, 2025"),
    target: 'Kepler-442 b',
    customers: ['ZTM', 'NASA'],
    upcoming: true,
    success: true
}

saveLaunch(launch);

async function checkIfLaunchExists(launchId) {
    return await launches.findOne({flightNumber: launchId});

}

async function getAllLaunches() {
    return await launches.find({});
}

async function getLatestFlightNumber() {
    const latestLaunch = await launches.findOne().sort('-flightNumber');
    if (!latestLaunch) {
        return DEFAULT_FLIGHT_NUMBER;
    }
    return latestLaunch.flightNumber;
}

async function saveLaunch(launch) {
    if (!await checkPlanetExists(launch.target)) {
        throw new Error('Kepler not found');
    }
    await launches.updateOne({
        flightNumber: launch.flightNumber,  
    },launch,{upsert: true});
    return launch;
}

async function checkPlanetExists(kelperName) {
    return await planets.findOne({keplerName: kelperName})
}

async function scheduleNewLaunch() {
    const newFlightNumber = await getLatestFlightNumber() +1;
    const newLaunch = Object.assign(launch,{
        flightNumber: newFlightNumber,
        customer: ['Zero to Mastery', 'NASA'],
        upcoming: true,
        success: true
    });
    return await saveLaunch(newLaunch)
}

async function aboardLaunchById(launchId) {
   const abortedLaunches =  await launches.updateOne({flightNumber:launchId},{
        upcoming : false,
        success : false,
    });
    return abortedLaunches.modifiedCount && abortedLaunches.matchedCount === 1
    
}
module.exports = {
    checkIfLaunchExists,
    getAllLaunches,
    aboardLaunchById,
    scheduleNewLaunch
}