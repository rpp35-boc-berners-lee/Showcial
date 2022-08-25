const mongoose = require('mongoose');
const config = require('../../../config/config.js');

const mongoDB = config.mongoDB_TOKEN;
// const mongoDB = 'mongodb://localhost/blueOceanCapstoneDB';

mongoose.connect(mongoDB)
  .then(() => {
    console.log("Database Connected");
  })
  .catch((error: any) => {
    console.log("Error Connecting To DataBase");
  });


mongoose.connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

//Bind connection to error event (to get notification of connection errors)
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));


// create schema definition for user table
const userTableSchema = mongoose.Schema({
  userName: String,
  email: String,
  hashedPassword: String,
  followingList: Array, // array of "followed" userIDs
  watchedVideos: Array, // array of "watched" videoIDs
  recommendedVideos: Array, // array of "recommended" videoIDs
  ownedServices: Array, // array of serviceIDs OR names?
});
// turn user table schema into model constructor
const UserTable = mongoose.model('userTable', userTableSchema);

const videoTableSchema = mongoose.Schema({
  videoName: String,
  overallRating: Number, // rating from video API
  userID: Number, //! foreign key
  watchProvider: String, // or ID?
});
const VideoTable = mongoose.model('videoTable', videoTableSchema);

const ratingsTableSchema = mongoose.Schema({
  videoID: Number, //! foreign key
  userName: String,
  rating: Number,
  comments: String // optional
});
const RatingsTable = mongoose.model('ratingsTable', ratingsTableSchema);

// Services Costs (top 5)
// const services = {
//   netflix: {
//     cost: 12.99,
//     image: 'www.exampleUrl.com'
//   },
//   primeVideo: {},
//   hboGo: {},
//   hulu: {},
//   disneyPlus: {}
// };

module.exports.UserTable = UserTable;
module.exports.VideoTable = VideoTable;
module.exports.RatingsTable = RatingsTable;
// module.exports.services = services;
