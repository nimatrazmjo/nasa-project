const http = require("http");
const mongoose = require('mongoose');
const app = require('./app');
const { loadData } = require("./model/planets.model");
const MONGO_URL = `mongodb+srv://nasa-api:nasa123@nimatlearning.hek3h.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
const PORT = process.env.PORT || 8000;
const server = http.createServer(app);
mongoose.connection.once('open', () => {
    console.log('connected to mongodb');
});

mongoose.connection.on('error', ( error) => {
    console.error(error); 
});
async function startSert() {
    await mongoose.connect(MONGO_URL);
    await loadData();
    server.listen(PORT,() => {
        console.log(`App is running on port ${PORT}`);
    });
}

startSert();