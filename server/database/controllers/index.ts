const models = require('../models/index.ts');

type UserData = {
  userName: string;
  email: string;
  hashedPassword: string;
  followingList: string[];
  watchedVideos: string[];
  recommendedVideos: string[];
  ownedServices: string[];
};

type VideoData = {

}

//!==============================================//
//!================ USER TABLE ==================//
//!==============================================//

const addUser = (userData: UserData) => {
  const newUser = new models.UserTable({
    userName: userData.userName,
    email: userData.email,
    hashedPassword: userData.hashedPassword,
    followingList:  userData.followingList || [],
    watchedVideos: userData.watchedVideos || [],
    recommendedVideos: userData.recommendedVideos || [],
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
  return models.UserTable.findOne({'userName': userName})
    .then((results: any) => {
      return results;
    })
    .catch((error: any) => {
      console.log('Error finding user', error);
    });
};

const updateUser = (userName: string, prop: string, value: any) => {
  return findUser(userName)
    .then((foundUser: any) => {
      // add or remove value
      const foundIndex = foundUser[prop].indexOf(value);
      if (foundIndex !== -1) {
        foundUser[prop].splice(foundIndex, 1);
      } else {
        foundUser[prop] = foundUser[prop].concat([value])
      };
      // save updated document
      return foundUser.save()
        .then(() => {
          console.log('updateUser(): Success updating user');
        })
        .catch((error: any) => {
          console.log('updateUser(): Error updating user', error)
        })
    })
    .catch((error: any) => {
      console.log(`Error updating ${userName} with {${prop}: ${value}}`);
    });
};

//? delete existing user
  // reuse find user & delete OR use findOneAndDelete()

//!==============================================//
//!================ VIDEO TABLE =================//
//!==============================================//

const addVideo = (videoData: any) => {
  const newVideo = new models.VideoTable({
    videoName: videoData.videoName,
    overallRating: videoData.overallRating,
    userName: videoData.userName,
    watchProviders: videoData.watchProviders
  });
  return newVideo.save()
    .then(() => {
      console.log("success posting new video");
    })
    .catch((error: any) => {
      console.log('Error posting new video', error)
    });
};

//? get videos by reviewer/for movie?
//? remove existing video??

//!==============================================//
//!=============== RATINGS TABLE ================//
//!==============================================//

const addRating = (ratingData: any) => {
  const newRating = models.RatingsTable({
    videoName: ratingData.videoName,
    userName: ratingData.userName,
    userRating: ratingData.userRating,
    comments: ratingData.comments
  });
  return newRating.save()
    .then(() => {
      console.log('success posting new rating')
    })
    .catch((error: any) => {
      console.log('error posting new rating', error);
    });
};

//? update rating
//? update comment
//? delete rating

export default {
  addUser,
  findUser,
  updateUser,
  addVideo,
  addRating
}