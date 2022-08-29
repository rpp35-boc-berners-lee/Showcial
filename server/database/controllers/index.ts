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

//TODO: add userID to following list
//TODO: remove userID to following list

//TODO: add videoID to watched list
//TODO: remove videoID from watched list

//TODO: add videoID to recommended list
//TODO: remove videoID from recommended list

//TODO: add service to owned list
//TODO: remove service from owned list

// update user document w/ options
const updateUser = (userName: string, prop: string, value: any) => {
  // if findOneAndUpdate doesn't work, try reusing findUser to grab the document, set value, and save()
  return findUser(userName)
    .then((foundUser: any) => {
      // if value/prop is already found on userName, delete it
      if (foundUser[prop].includes(value)) {
        // delete value from array
        console.log('value already in array', foundUser[prop])
        foundUser[prop] = foundUser[prop].map((item: any) => {
          if (item !== value && item !== null && item !== undefined) {
            return item;
          }
        })
        console.log('array after splice', foundUser[prop])
      } else {
        // else add value to prop (array) on username (log which)
        foundUser[prop] = foundUser[prop].concat([value])
      }

      // save() document
      console.log('foundUser', foundUser);
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

  // models.UserTable.findOneAndUpdate({userName: userName}, {[prop]: value})
  //   .then(() => {
  //     console.log(`Success updating ${userName} with {${prop}: ${value}}`)
  //   })
  //   .catch((error: any) => {
  //     console.log(`Error updating ${userName} with {${prop}: ${value}}`);
  //   });
};

//? delete existing user
  // reuse find user & delete or use findOneAndDelete()

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
//TODO: create rating
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