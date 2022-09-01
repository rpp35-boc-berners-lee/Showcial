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
  return models.UserTable.find({'userName': userName})
    .then((results: any) => {
      return results;
    })
    .catch((error: any) => {
      console.log('Error finding user', error);
    });
};

//TODO: add userID to following list
//TODO: remove userID from following list
//TODO: add videoID to watched list
const addToWatchedList = async (userName: any, videoID: number) => {
  return await models.UserTable.find({ userName })
    .then(async (results: any) => {
      if (results[0].watchedVideos.indexOf(videoID) === -1) {
        await models.UserTable.update({ userName }, { $push: { watchedVideos: videoID }})
        console.log(`Success updating ${userName}'s watched list with videoID ${videoID}`)
      } else {
        console.log('Video already exists in user watch list');
      }
    })
    .catch((error: any) => {
      console.log(`Error updating ${userName}'s watched list with videoID ${videoID}: ${error}`)
    })
}
//TODO: remove videoID from watched list
const removeFromWatchedList = async (userName: any, videoID: number) => {
  return await models.UserTable.find({ userName })
    .then(async (results: any) => {
      if (results[0].watchedVideos.indexOf(videoID) !== -1) {
        await models.UserTable.update({ userName }, { $pullAll: { watchedVideos: videoID }})
        console.log(`Success removing videoID ${videoID} from ${userName}'s watched list`)
      } else {
        console.log('Video was never in user watch list');
      }
    })
    .catch((error: any) => {
      console.log(`Error removing videoID ${videoID} from ${userName}'s watched list: ${error}`)
    })
}
//TODO: add videoID to recommended list
//TODO: remove videoID from recommended list

//TODO: retrieve owned services
const retrieveServices = async (userName: string) => {
  try {
    let data = await  models.UserTable.find({ userName })
    return data[0].ownedServices;
  } catch (error) {
    console.log(`Error retrieving owned services for user ${userName}: ${error}`);
  }
}
//TODO: update owned services
const updateServices = async (userName: string, services: string[]) => {
    try {
      await models.UserTable.updateOne({ userName }, {$set: {ownedServices: services }})
      console.log('successfully updated services')
    } catch (error) {
      console.log(`Error updating owned services ${services} for user ${userName}: ${error}`)
    }
}

// update user document w/ options
const updateUser = (userName: string, prop: string, value: any) => {
  models.UserTable.findOneAndUpdate({userName}, {[prop]: value})
    .then(() => {
      console.log(`Success updating ${userName} with {${prop}: ${value}}`)
    })
    .catch((error: any) => {
      console.log(`Error updating ${userName} with {${prop}: ${value}}`);
    });
};

//? delete existing user

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
  addRating,
  addToWatchedList,
  removeFromWatchedList,
  retrieveServices,
  updateServices
}