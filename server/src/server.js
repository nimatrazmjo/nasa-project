const http = require('http');

const app = require('./app');
const { loadData } = require('./model/planets.model');
const  { loadLaunchData } = require('./model/launch.model');
const { mongoConnect } = require('./service/mongo');

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

async function startSert() {
    await mongoConnect();
    await loadData();
    await loadLaunchData();
    server.listen(PORT,() => {
        console.log(`App is running on port ${PORT}`);
    });
}

startSert();