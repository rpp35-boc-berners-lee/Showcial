require('dotenv').config();
const mongoose = require('mongoose');

const mongoDB = process.env.mongoDB_TOKEN;

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
  userName: {
    type: String,
    index: {
      unique: true,
      dropDups: true
    }
  },
  email: String,
  hashedPassword: String, // removed from response
  followingList: Array, // array of "followed" userNames
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
    logo_path: "/9A1JSVmSxsyaBK4SUFsYVqbAYfW.jpg",
    provider_name: "Netflix",
    provider_id: 8
  },
  primeVideo: {
    cost: 8.99,
    display_priority: 1,
    logo_path: "/68MNrwlkpF7WnmNPXLah69CR5cb.jpg",
    provider_name: "Amazon Prime Video",
    provider_id: 9,
    provider_id_alt: 119
  },
  hboMax: {
    cost: 14.99,
    logo_path: "/aS2zvJWn9mwiCOeaaCkIh4wleZS.jpg",
    provider_name: "HBO Max",
    provider_id: 384
  },
  hulu: {
    cost: 12.99,
    logo_path: "/giwM8XX4V2AQb9vsoN7yti82tKK.jpg",
    provider_name: "Hulu",
    provider_id: 15
  },
  disneyPlus: {
    cost: 7.99,
    logo_path: "/dgPueyEdOwpQ10fjuhL2WYFQwQs.jpg",
    provider_name: "Disney Plus",
    provider_id: 337
  }
};

module.exports.UserTable = UserTable;
module.exports.VideoTable = VideoTable;
module.exports.RatingsTable = RatingsTable;
module.exports.services = services;
