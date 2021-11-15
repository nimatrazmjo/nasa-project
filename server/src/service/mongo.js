const mongoose = require('mongoose');

// const MONGO_URL = `mongodb+srv://nasa-api:nasa123@nimatlearning.hek3h.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
const MONGO_URL = `mongodb://localhost:27017/nasa-project`

mongoose.connection.once('open', () => {
  console.log('connected to mongodb');
});

mongoose.connection.on('error', ( error) => {
  console.error(error); 
});

async function mongoConnect() {
  await mongoose.connect(MONGO_URL);
}

async function mongoDisconnect() {
  await mongoose.disconnect();
}

module.exports = {
  mongoConnect,
  mongoDisconnect
}