const models = require('../models/index.ts');

type UserData = {
  userName: string;
  email: string;
  hashedPassword: string;
  followingList: number[];
  watchedVideos: number[];
  recommendedVideos: number[];
  ownedServices: string[];
};

//!==============================================//
//!================ USER TABLE ==================//
//!==============================================//

const addUser = (userData: UserData) => {
  const newUser = new models.UserTable({
    userName: userData.userName,
    email: userData.email,
    hashedPassword: userData.hashedPassword,
    followingList: [], // userData.followingList || [] ???
    watchedVideos: [],
    recommendedVideos: [],
    ownedServices: userData.ownedServices || [],
  })
  return newUser.save()
    .then(() => {
      console.log('success posting new user');
    })
    .catch((error: any) => {
      console.log('Error posting new user', error);
    });
};

const findUser = (userName: any) => {
  console.log('findUser controller', userName);
  return models.UserTable.find({'userName': userName})
    .then((results: any) => {
      console.log('findUser results', results)
      return results;
    })
    .catch((error: any) => {
      console.log('Error finding user', error);
    });
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


//TODO: get watched list by userName/userID??
//TODO: get following list by userName/userID??
//TODO: get recommended list by userName/userID??
  //!--> get all user info by




//!==============================================//
//!================ VIDEO TABLE =================//
//!==============================================//
//TODO: add new video
//TODO: remove existing video??

//!==============================================//
//!=============== RATINGS TABLE ================//
//!==============================================//
//TODO: create rating
//? delete rating
//? update rating
//? update comment

// export controllers
export default {
  addUser,
  findUser
}