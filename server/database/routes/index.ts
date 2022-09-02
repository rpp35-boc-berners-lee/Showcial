import {Request, Response, Router} from 'express';
const router = Router();
import controllers from '../controllers/index';
import { TVResults, MovieResults } from '../../../types';

type Query = {
  userName: string;
  video: TVResults | MovieResults;
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

router.put('/user/addService', (req: Request, res: Response) => {
  return controllers.updateUser(req.body.userName, 'ownedServices', req.body.value)
    .then(() => {
      console.log(`/user/addService: Success adding ${req.body.value} to service list`);
      res.status(201);
      res.end();
    })
    .catch((error: any) => {
      console.log(`/user/addService: Error adding ${req.body.value} to service list`, error);
      res.status(400).send(error);
      res.end();
    });
});

router.put('/user/removeService', (req: Request, res: Response) => {
  return controllers.updateUser(req.body.userName, 'ownedServices', req.body.value)
    .then(() => {
      console.log(`/user/removeService: Success removing ${req.body.value} to service list`);
      res.status(201);
      res.end();
    })
    .catch((error: any) => {
      console.log(`/user/removeService: Error removing ${req.body.value} to service list`, error);
      res.status(400).send(error);
      res.end();
    });
});

//TODO: add video to watched list
router.post('/user/addToWatchedList', async (req: Request, res: Response) => {
  let query = req.query as unknown as Query;
  await controllers.addToWatchedList(query.userName, query.video)
    .then(() => {
      res.sendStatus(201)
    })
    .catch((error: any) => {
      console.log('failed POST /addToWatchedList', error)
      res.status(400).send(error);
      res.end();
    })
});
//TODO: remove video from watched list
router.post('/user/removeFromWatchedList', async (req: Request, res: Response) => {
  let query = req.query as unknown as Query;
  await controllers.removeFromWatchedList(query.userName, query.video)
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
//TODO: remove videoID from recommended list

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

export default router;