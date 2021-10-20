const http = require("http");
const app = require('./app');
const { loadData } = require("./model/planets.model");
const server = http.createServer(app);
const PORT = process.env.PORT || 8000;
async function startSert() {
    await loadData();
    server.listen(PORT,() => {
        console.log(`App is running on port ${PORT}`);
    });
}

startSert();