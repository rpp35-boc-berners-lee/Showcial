require('dotenv').config();
const mongoose = require('mongoose');

const mongoDB = process.env.mongoDB_TOKEN;
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

const userTableSchema = mongoose.Schema({
  userName: String, //! make a unique value
  email: String,
  hashedPassword: String, // removed from response
  followingList: Array, // array of "followed" userIDs
  watchedVideos: Array, // array of "watched" videoIDs
  recommendedVideos: Array, // array of "recommended" videoIDs
  ownedServices: Array, // array of serviceIDs OR names?
});
const UserTable = mongoose.model('userTable', userTableSchema);

const videoTableSchema = mongoose.Schema({
  videoName: String,
  overallRating: Number, // rating from video API
  userName: String, //! foreign key
  // userID: Number, // foreign key
  watchProviders: Array, // array of service providers
});
const VideoTable = mongoose.model('videoTable', videoTableSchema);

const ratingsTableSchema = mongoose.Schema({
  // videoID: Number, // foreign key
  videoName: String, //! foreign key
  userName: String,
  userRating: Number,
  comments: String // optional
});
const RatingsTable = mongoose.model('ratingsTable', ratingsTableSchema);

const services = {
  netflix: {
    cost: 15.49,
  },
  primeVideo: {
    cost: 8.99
  },
  hboMax: {
    cost: 14.99
  },
  hulu: {
    cost: 12.99
  },
  disneyPlus: {
    cost: 7.99
  }
};

module.exports.UserTable = UserTable;
module.exports.VideoTable = VideoTable;
module.exports.RatingsTable = RatingsTable;
module.exports.services = services;
