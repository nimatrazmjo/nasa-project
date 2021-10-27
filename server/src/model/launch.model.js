const launches = new Map();
const launch = {
    flightNumber: 100,
    mission: "Kepler Exploration X",
    rocket: "Explorer IS1",
    launchDate: new Date("December 27, 2025"),
    destination: 'Kepler-442 b',
    customer: ['ZTM', 'NASA'],
    upcomming: true,
    success: true
}

let lastFlightNumber = 100;

launches.set(launch.flightNumber,launch);

function getAllLaunches() {
    return Array.from(launches.values())
}

function addNewLaunch(launch) {
    lastFlightNumber++;
    launches.set(lastFlightNumber,
        Object.assign(launch,{
            flightNumber: lastFlightNumber,
            customer: ['Zero to Mastery', 'NASA'],
            upcomming: true,
            success: true
        }));
}
module.exports = {
    getAllLaunches,
    addNewLaunch
}