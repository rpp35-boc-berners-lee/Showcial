import {Request, Response, Router} from 'express';
const router = Router();
import controllers from '../controllers/index';

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
      res.status(201);
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

// add videoID to watched list
// remove videoID from watched list
// add videoID to recommended list
// remove videoID from recommended list

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