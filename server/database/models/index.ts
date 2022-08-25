const mongoose = require('mongoose');

const userTableSchema: any = mongoose.Schema({
  userName: String,
  email: String,
  hashedPassword: String,
  followingList: Array, // array of "followed" userIDs
  watchedVideos: Array, // array of "watched" videoIDs
  recommendedVideos: Array, // array of "recommended" videoIDs
  ownedServices: Array, // array of serviceIDs OR names?
});
const UserTable = mongoose.model('userTable', userTableSchema);

const videoTableSchema = mongoose.Schema({
  videoName: String,
  overallRating: Number, // rating from video API
  userID: Number, // foreign key
  watchProvider: String, // or ID?
});
const VideoTable = mongoose.model('videoTable', videoTableSchema);

const ratingsTableSchema = mongoose.Schema({
  videoID: Number, // foreign key
  userName: String,
  rating: Number,
  comments: String // optional
});
const RatingsTable = mongoose.model('ratingsTable', ratingsTableSchema);

// Services Costs (top 5)
const services = {
  netflix: {
    cost: 12.99,
    image: 'www.exampleUrl.com'
  },
  primeVideo: {},
  hboGo: {},
  hulu: {},
  disneyPlus: {}
};

// auth table

module.exports.UserTable = UserTable;
module.exports.VideoTable = VideoTable;
module.exports.RatingsTable = RatingsTable;
module.exports.services = services;
