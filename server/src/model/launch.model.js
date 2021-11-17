const axios = require('axios');

const launches = require('./launches.mongo');
const planets = require('./planets.mongo');
const DEFAULT_FLIGHT_NUMBER = 100;
const SPACEX_API = 'https://api.spacexdata.com/v4/launches/query';

async function loadLaunchs () {
  try {
    const launchDocs = await axios.post(SPACEX_API,{
        query: {},
        options: {
            pagination: false,
            populate: [
                {
                    path: 'rocket',
                    select: {
                        name:1
                    }
                },
                {
                    path: 'payloads',
                    select: {
                        customers:1
                    }
                }
            ]
        }
    });
    for (const launchDoc of launchDocs.data.docs) {
        const payloads = launchDoc['payloads'];
        const customers = payloads.flatMap(payload => payload['customers']);
        const launch = {
            flightNumber: launchDoc['flight_number'],
            mission: launchDoc['name'],
            rocket: launchDoc['rocket']['name'],
            launchDate: launchDoc['launch_date'],
            upcoming: launchDoc['upcoming'],
            success: launchDoc['success'],
            customers
        }
        console.log(launch.flightNumber,launch.mission);
        await saveLaunch(launch);
    }   
  } catch (error) {
      
  }
}

async function loadLaunchData() {
    try {
        const firstLaunch = await findLaunch({flightNumber:1, rocket: 'Falcon 1', mission: 'FalconSat'});
        if (firstLaunch) {
            console.log('Launch Data has already been loaded');
            return;
        }
        await loadLaunchs();
    } catch (error) {
        console.log(error,'Err')
    }
}

async function findLaunch(filter) {
    return await launches.findOne(filter)
}

async function checkIfLaunchExists(launchId) {
    return await findLaunch({flightNumber: launchId});

}

async function getAllLaunches(skip, limit) {
    return await launches.find({})
        .sort({flightNumber: 1})
        .skip(skip)
        .limit(limit);
}

async function getLatestFlightNumber() {
    const latestLaunch = await launches.findOne().sort('-flightNumber');
    if (!latestLaunch) {
        return DEFAULT_FLIGHT_NUMBER;
    }
    return latestLaunch.flightNumber;
}

async function saveLaunch(launch) {
   
    await launches.updateOne({
        flightNumber: launch.flightNumber,  
    },launch,{upsert: true});
    return launch;
}

async function checkPlanetExists(kelperName) {
    return await planets.findOne({keplerName: kelperName})
}

async function scheduleNewLaunch() {
    if (!await checkPlanetExists(launch.target)) {
        throw new Error('Kepler not found');
    } 
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
    loadLaunchData,
    checkIfLaunchExists,
    getAllLaunches,
    aboardLaunchById,
    scheduleNewLaunch
}