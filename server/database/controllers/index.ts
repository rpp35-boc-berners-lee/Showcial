const models = require('../models/index.ts');

type NewUserData = {
  userName: string;
  email: string;
  hashedPassword: string;
  followingList: number[];
  watchedVideos: number[];
  recommendedVideos: number[];
  ownedServices: string[];
};

//==============================================//
//================ USER TABLE ==================//
//==============================================//

const addUser = async (userData: NewUserData) => {
  const newUser = new models.UserTable({
    userName: userData.userName,
    email: userData.email,
    hashedPassword: userData.hashedPassword,
    followingList: [], // userData.followingList || [] ???
    watchedVideos: [],
    recommendedVideos: [],
    ownedServices: userData.ownedServices || [],
  })
  await newUser.save()
  console.log('new user created in db', newUser)
};

//? delete existing user
//TODO: add userID to following list
//TODO: remove userID from following list
//TODO: add videoID to watched list
//TODO: remove videoID from watched list
//TODO: add videoID to recommended list
//TODO: remove videoID from recommended list
//TODO: add service to owned list
//TODO: remove service from owned list

//==============================================//
//================ VIDEO TABLE =================//
//==============================================//
//TODO: add new video
//TODO: remove existing video??

//==============================================//
//=============== RATINGS TABLE ================//
//==============================================//
//TODO: create rating
//? delete rating
//? update rating
//? update comment

// export controllers
module.exports.addUser = addUser;