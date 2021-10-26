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

launches.set(launch.flightNumber,launch);

module.exports = {
    launches,
}