const fs = require("fs");
const path = require("path");
const parse = require("csv-parse");


const KapletData = [];

function isHabitable(planet) {
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
            .on('data',(data) =>{
                if (isHabitable(data)) {
                    KapletData.push(data)
                }
            }) 
            .on('error',(err)=>{
                console.error('Error',err)
                reject();
            })
            .on('end',() =>{
                resolve(); 
            });
    });
}

function getAllPlanets () {
    return KapletData;
}

module.exports = {
    loadData,
    getAllPlanets
}