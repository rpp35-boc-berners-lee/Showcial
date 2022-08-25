import mongoose from 'mongoose';
const config = require('../../config/config.js');

// const mongoDB = config.mongoDB_TOKEN;
// const mongoDB = 'mongodb://127.0.0.1/blueOceanCapstoneDB';
// const mongoDB = 'mongodb://localhost:27017/blueOceanCapstoneDB';
const mongoDB = 'mongodb://localhost/blueOceanCapstoneDB';


mongoose.connect(mongoDB)
  .then(() => {
    console.log("Database Connected");
  })
  .catch((error) => {
    console.log("Error Connecting To DataBase");
  });

//Get the default connection
const db = mongoose.connection;

db.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

export default db;
