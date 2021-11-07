const launches = require('./launches.mongo');
const planets = require('./planets.mongo');
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

let lastFlightNumber = 100;

saveLaunch(launch);

async function checkIfLaunchExists(launchId) {
    const launch = await launches.findById(launchId);

}

async function getAllLaunches() {
    return await launches.find({});
}

async function saveLaunch(launch) {
    if (!await checkPlanetExists(launch.target)) {
        throw new Error('Kepler not found');
    }
    await launches.updateOne({
        flightNumber: launch.flightNumber,  
    },launch,{upsert: true});
}

async function checkPlanetExists(kelperName) {
    return await planets.findOne({keplerName: kelperName})
}

function addNewLaunch(launch) {
    lastFlightNumber++;
    launches.set(lastFlightNumber,
        Object.assign(launch,{
            flightNumber: lastFlightNumber,
            customer: ['Zero to Mastery', 'NASA'],
            upcoming: true,
            success: true
        }));
}

function aboardLaunchById(launchId) {
    const aborded = launches.get(launchId);
    aborded.upcoming =  false;
    aborded.success = false;
    return aborded;
}
module.exports = {
    checkIfLaunchExists,
    getAllLaunches,
    addNewLaunch,
    aboardLaunchById,
}