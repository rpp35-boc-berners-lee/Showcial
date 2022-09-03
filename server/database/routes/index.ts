import {Request, Response, Router} from 'express';
const router = Router();
import controllers from '../controllers/index';

type Query = {
  userName: string;
  videoID: number;
};

//!==============================================//
//!================ USER TABLE ==================//
//!==============================================//
router.post('/user', (req: Request, res: Response) => {
  return controllers.addUser(req.body)
    .then((results: any) => {
      console.log(`/user: Success adding ${req.body} to user table`);
      res.status(201);
      res.end();
    })
    .catch((error: any) => {
      console.log(`/user: Error adding ${req.body} to user table`, error);
      res.status(400).send(error);
      res.end();
    });
});

router.get('/user', (req: Request, res: Response) => {
  return controllers.findUser(req.query.userName)
    .then((results: any) => {
      console.log(`/user: Success finding ${req.query.userName} in user table`);
      res.status(200).send(results);
      res.end();
    })
    .catch((error: any) => {
      console.log(`/user: Error finding ${req.query.userName} in user table`, error);
      res.status(400).send(error);
      res.end();
    })
});

router.get('/user/all', (req: Request, res: Response) => {
  return controllers.findAllUsers()
    .then((results: any) => {
      console.log(`/user/all: Success finding all users`);
      res.status(200).send(results);
      res.end();
    })
    .catch((error: any) => {
      console.log(`/user/all: Error finding all users`, error);
      res.status(400).send(error);
      res.end();
    });
});

router.delete('/user', (req: Request, res: Response) => {
  return controllers.deleteUser(req.query.userName)
    .then(() => {
      console.log(`/user: Success deleting ${req.query.userName}`);
      res.status(201);
      res.end();
    })
    .catch((error: any) => {
      console.log(`/user: Error deleting ${req.query.userName}`, error);
      res.status(400).send(error);
      res.end();
    })
});

router.put('/user/addFollowed', (req: Request, res: Response) => {
  return controllers.updateUser(req.body.userName, 'followingList', req.body.value)
    .then(() => {
      console.log(`/user/addFollowed: Success adding ${req.body.value} to following list`);
      res.status(201);
      res.end();
    })
    .catch((error: any) => {
      console.log(`/user/addFollowed: Error adding ${req.body.value} to following list`, error);
      res.status(400).send(error);
      res.end();
    })
});

//TODO: add userID to following list
//TODO: remove userID from following list
router.put('/user/removeFollowed', (req: Request, res: Response) => {
  return controllers.updateUser(req.body.userName, 'followingList', req.body.value)
    .then(() => {
      console.log(`/user/removeFollowed: Success removing ${req.body.value} to following list`);
      res.status(204);
      res.end();
    })
    .catch((error: any) => {
      console.log(`/user/removeFollowed: Error removing ${req.body.value} to following list`, error);
      res.status(400).send(error);
      res.end();
    })
});

//TODO: update owned services list
router.put('/user/services', async (req: Request, res: Response) => {
  try {
    await controllers.updateServices(req.body.userName, req.body.services);
    res.sendStatus(204)
  } catch (error) {
    res.status(400).send(error);
    console.log('failed PUT /user/services', error)
  }
})

//TODO: retrieve personal feed
router.get('/user/feed', async (req: Request, res: Response) => {
  try {
    let result = await controllers.retrieveFeed(req.body.userName);
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error);
    console.log('failed GET /user/feed', error)
  }
})

//TODO: add videoID to watched list
router.post('/addToWatchedList', async (req: Request, res: Response) => {
  let query = req.query as unknown as Query;
  await controllers.addToWatchedList(query.userName, Number(query.videoID))
    .then(() => {
      res.sendStatus(201)
    })
    .catch((error: any) => {
      console.log('failed POST /addToWatchedList', error)
      res.status(400).send(error);
      res.end();
    })
});
//TODO: remove videoID from watched list
router.post('/removeFromWatchedList', async (req: Request, res: Response) => {
  let query = req.query as unknown as Query;
  await controllers.removeFromWatchedList(query.userName, Number(query.videoID))
    .then(() => {
      res.sendStatus(201)
    })
    .catch((error: any) => {
      console.log('failed POST /removeFromWatchedList', error)
      res.status(400).send(error);
      res.end();
    })
});
//TODO: add videoID to recommended list
router.post('/addToRecommended', async (req: Request, res: Response) => {
  let query = req.query as unknown as Query;
  await controllers.addToRecommended(query.userName, Number(query.videoID))
    .then(() => {
      res.sendStatus(201)
    })
    .catch((error: any) => {
      console.log('failed to add recommend', error)
      res.status(400).send(error);
      res.end();
    })
});
//TODO: remove videoID from recommended list
router.post('/addToRecommended', async (req: Request, res: Response) => {
  let query = req.query as unknown as Query;
  await controllers.removeFromRecommended(query.userName, Number(query.videoID))
    .then(() => {
      res.sendStatus(201)
    })
    .catch((error: any) => {
      console.log('failed to remove recommend', error)
      res.status(400).send(error);
      res.end();
    })
});
//TODO: add service to owned list
//TODO: remove service from owned list

//!==============================================//
//!================ VIDEO TABLE =================//
//!==============================================//
router.post('/video', (req: Request, res: Response) => {
  return controllers.addVideo(req.body)
    .then((results: any) => {
      res.status(201);
      res.end();
    })
    .catch((error: any) => {
      console.log('failed POST /video', error)
      res.status(400).send(error);
      res.end();
    });
});

//!==============================================//
//!=============== RATINGS TABLE ================//
//!==============================================//
router.post('/rating', (req: Request, res: Response) => {
  return controllers.addRating(req.body)
    .then((results: any) => {
      res.status(201);
      res.end();
    })
    .catch((error: any) => {
      console.log('Failed POST /rating');
    });
});

router.get('/activities', async (req: Request, res: Response) => {
  try {
    let result = await controllers.retrieveActivities(req.body.userName);
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error);
    console.log('failed GET /activites', error)
  }
})


export default router;