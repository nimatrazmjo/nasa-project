const launches = new Map();
const launch = {
    flightNumber: 100,
    mission: "Kepler Exploration X",
    rocket: "Explorer IS1",
    launchDate: new Date("December 27, 2025"),
    target: 'Kepler-442 b',
    customer: ['ZTM', 'NASA'],
    upcoming: true,
    success: true
}

let lastFlightNumber = 100;

launches.set(launch.flightNumber,launch);

function checkIfLaunchExists(launchId) {
    return launches.has(launchId);
}

function getAllLaunches() {
    return Array.from(launches.values())
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