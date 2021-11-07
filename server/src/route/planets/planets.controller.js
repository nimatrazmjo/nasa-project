const {getAllPlanets} = require('../../model/planets.model');
const planets = require('../../model/planets.mongo');

async function httpGetAllPlanets(req, res) {
    return res.status(200).json(await getAllPlanets());
}

module.exports = {
    httpGetAllPlanets,
};