import mongoose from 'mongoose';
const config = require('../../config/config.js');

// const mongoDB = config.mongoDB_TOKEN;
const mongoDB = 'mongodb://127.0.0.1/blueOceanCapstoneDB';

mongoose.connect(mongoDB);

//Get the default connection
const db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

export default db;
