const fs = require("fs");
const path = require("path");
const parse = require("csv-parse");

const planets = require('./planets.mongo');

function isHabitable (planet) {
    return planet['koi_disposition'] === 'CONFIRMED' 
        && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11
        && planet['koi_prad'] < 1.6;
}

function loadData () {
    return new Promise((resolve, reject)=>{
        fs.createReadStream( path.join(__dirname,'..','..','data','kapler-data.csv'))
            .pipe(parse({
                comment: "#",
                columns: true
                }))
            .on('data',async (data) =>{
                if (isHabitable(data)) {
                    await planets.updateOne({
                        keplerName: data.kepler_name,
                    },{
                        $set: {
                            keplerName: data.kepler_name
                        }
                    },{
                        upsert: true
                    });
                }
            }) 
            .on('error',(err)=>{
                console.error('Error',err)
                reject();
            })
            .on('end',async () =>{
                const totalPlanets = (await getAllPlanets()).length;
                console.info('Total planets found', totalPlanets);
                resolve(); 
            });
    });
}

async function getAllPlanets () {
    return await planets.find ({});
}

async function savePlanet(planet) {
    try {
        await planets.updateOne({
            keplerName: data.kepler_name,
        },{
            $set: {
                keplerName: data.kepler_name
            }
        },{
            upsert: true
        });
    } catch (error) {
        console.error('Could not solve the planet', error)
    }
   
}

module.exports = {
    loadData,
    getAllPlanets
}