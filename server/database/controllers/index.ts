import { FollowingList } from "../../../client/src/components/personal-profile/following-list/FollowingList";

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
    followingList: ['Bonnie', 'Joe'],
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

const findUser = async (userName: any) => {
  return await models.UserTable.findOne({userName})
    .then((results: any) => {
      return results;
    })
    .catch((error: any) => {
      console.log('Error finding user', error);
    });
};

const findAllUsers = () => {
  return models.UserTable.find({})
    .then((results: any) => {
      return results.map((result: any) => {
        return result.userName;
      })
    })
    .catch((error: any) => {
      console.log('Error finding all users', error)
    })
};

const addToWatchedList = async (userName: any, video: any) => {
  return await models.UserTable.find({ userName })
    .then(async (results: any) => {
      let watchList = results[0].watchedVideos;
      let exists = false;
      for (let i = 0; i < watchList.length; i++) {
        if (watchList[i][video.id] !== undefined) {
          exists = true;
        }
      }
      if (!exists) {
        await models.UserTable.update({ userName }, { $push: { watchedVideos: { [video.id]: video }}})
        console.log(`Success updating ${userName}'s watched list with videoID ${video.id}`)
      } else {
        console.log('Video already exists in user watch list');
      }
    })
    .catch((error: any) => {
      console.log(`Error updating ${userName}'s watched list with videoID ${video.id}: ${error}`)
    })
}

const removeFromWatchedList = async (userName: any, videoId: number) => {
  return await models.UserTable.find({ userName })
    .then(async (results: any) => {
      let watchList = results[0].watchedVideos;
      let exists = false;
      for (let i = 0; i < watchList.length; i++) {
        if (watchList[i][videoId] !== undefined) {
          exists = true;
        }
      }
      if (exists) {
        await models.UserTable.update({ userName }, { $pullAll: { watchedVideos: videoId }})
        console.log(`Success removing videoID ${videoId} from ${userName}'s watched list`)
      } else {
        console.log('Video was never in user watch list');
      }
    })
    .catch((error: any) => {
      console.log(`Error removing videoID ${videoId} from ${userName}'s watched list: ${error}`)
    })
}
//TODO: add videoID to recommended list
const addToRecommended = async (userName: any, video: any) => {
  return await models.UserTable.find({ userName })
    .then(async (results: any) => {
      let watchList = results[0].watchedVideos;
      let exists = false;
      for (let i = 0; i < watchList.length; i++) {
        if (watchList[i][video.id] !== undefined) {
          exists = true;
        }
      }
      if (!exists) {
        await models.UserTable.update({ userName }, { $push: { watchedVideos: video }})
        console.log(`Success updating ${userName}'s watched list with videoID ${video.id}`)
      } else {
        console.log('Video already exists in user recommended list');
      }
    })
    .catch((error: any) => {
      console.log(`Error updating ${userName}'s watched list with videoID ${video.id}: ${error}`)
    })
}
//TODO: remove videoID from recommended list
const removeFromRecommended = async (userName: any, video: any) => {
  return await models.UserTable.find({ userName })
    .then(async (results: any) => {
      let watchList = results[0].watchedVideos;
      let exists = false;
      for (let i = 0; i < watchList.length; i++) {
        if (watchList[i][video.id] !== undefined) {
          exists = true;
        }
      }
      if (results[0].watchedVideos.indexOf(video.id) !== -1) {
        await models.UserTable.update({ userName }, { $pullAll: { watchedVideos: video.id }})
        console.log(`Success removing videoID ${video.id} from ${userName}'s watched list`)
      } else {
        console.log('Video was never in user watch list');
      }
    })
    .catch((error: any) => {
      console.log(`Error removing videoID ${video.id} from ${userName}'s watched list: ${error}`)
    })
}
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
  return findUser(userName)
    .then((foundUser: any) => {
      const foundIndex = foundUser[prop].indexOf(value);
      if (foundIndex !== -1) {
        foundUser[prop].splice(foundIndex, 1);
      } else {
        foundUser[prop] = [value].concat(foundUser[prop]);
      };
      return foundUser.save()
        .then(() => {
          console.log('updateUser(): Success updating user');
        })
        .catch((error: any) => {
          console.log('updateUser(): Error updating user', error)
        })
    })
    .catch((error: any) => {
      console.log(`Error updating ${userName} with ${prop}: ${value}`);
    });
};

const deleteUser = ((userName: string | any) => {
  return models.UserTable.deleteOne({userName})
    .then()
    .catch((error: any) => {
      console.log(`deleteUser(): Error deleting ${userName}`)
    });
});

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

// This controller isused to retrieve all activity for a certain user
const retrieveActivities = async (userName: string) => {
  try {
    let activities = await models.RatingsTable.find({userName: userName}).sort({created_at: 1});
    return activities;
  } catch (error) {
    console.log(`Error retrieving activities for user ${userName}: ${error}`);
  }
}

// This controller is used to retrieve feed that is generated from following list of a user
const retrieveFeed = async (userName: string) => {
  try {
    let user = await findUser(userName);
    let followingList = user.followingList;

    let feed = await models.RatingsTable.find({userName: {$in: followingList}}).sort({created_at: 1});
    return feed;
  } catch (error) {
    console.log(`Error retrieving feed for user ${userName}: ${error}`);
  }

}

const addRating = (ratingData: any) => {
  const newRating = models.RatingsTable({
    videoName: ratingData.videoName,
    userName: ratingData.userName,
    userRating: ratingData.userRating,
    created_at: new Date(),
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
  findAllUsers,
  updateUser,
  addVideo,
  addToRecommended,
  removeFromRecommended,
  addRating,
  deleteUser,
  addToWatchedList,
  removeFromWatchedList,
  retrieveServices,
  updateServices,
  retrieveActivities,
  retrieveFeed
}