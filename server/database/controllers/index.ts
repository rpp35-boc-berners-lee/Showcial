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

const findUser = (userName: any) => {
  return models.UserTable.findOne({userName})
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
  addRating,
  deleteUser,
  addToWatchedList,
  removeFromWatchedList
}