import {Request, Response, Router} from 'express';
const router = Router();
import controllers from '../controllers/index';

//!==============================================//
//!================ USER TABLE ==================//
//!==============================================//
router.post('/addUser', (req: Request, res: Response) => {
  return controllers.addUser(req.body)
    .then((results: any) => {
      console.log(`/addUser: Success adding ${req.body} to user table`);
      res.status(201);
      res.end();
    })
    .catch((error: any) => {
      console.log(`/addUser: Error adding ${req.body} to user table`, error);
      res.status(400).send(error);
      res.end();
    });
});

router.get('/findUser', (req: Request, res: Response) => {
  return controllers.findUser(req.query.userName)
    .then((results: any) => {
      console.log(`/findUser: Success finding ${req.query.userName} in user table`);
      res.status(200).send(results);
      res.end();
    })
    .catch((error: any) => {
      console.log(`/findUser: Error finding ${req.query.userName} in user table`, error);
      res.status(400).send(error);
      res.end();
    })
});

router.put('/addFollowed', (req: Request, res: Response) => {
  return controllers.updateUser(req.body.userName, req.body.prop, req.body.value)
    .then(() => {
      console.log(`/addService: Success adding ${req.body.value} to following list`);
      res.status(201);
      res.end();
    })
    .catch((error: any) => {
      console.log(`/addFollowed: Error adding ${req.body.value} to following list`, error);
      res.status(400).send(error);
      res.end();
    })
});

router.put('/removeFollowed', (req: Request, res: Response) => {
  return controllers.updateUser(req.body.userName, req.body.prop, req.body.value)
    .then(() => {
      console.log(`/removeService: Success removing ${req.body.value} to following list`);
      res.status(201);
      res.end();
    })
    .catch((error: any) => {
      console.log(`/removeService: Error removing ${req.body.value} to following list`, error);
      res.status(400).send(error);
      res.end();
    })
});

router.put('/addService', (req: Request, res: Response) => {
  return controllers.updateUser(req.body.userName, req.body.prop, req.body.value)
    .then(() => {
      console.log(`/addService: Success adding ${req.body.value} to service list`);
      res.status(201);
      res.end();
    })
    .catch((error: any) => {
      console.log(`/addService: Error adding ${req.body.value} to service list`, error);
      res.status(400).send(error);
      res.end();
    });
});

router.put('/removeService', (req: Request, res: Response) => {
  return controllers.updateUser(req.body.userName, req.body.prop, req.body.value)
    .then(() => {
      console.log(`/removeService: Success removing ${req.body.value} to service list`);
      res.status(201);
      res.end();
    })
    .catch((error: any) => {
      console.log(`/removeService: Error removing ${req.body.value} to service list`, error);
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
router.post('/addVideo', (req: Request, res: Response) => {
  return controllers.addVideo(req.body)
    .then((results: any) => {
      res.status(201);
      res.end();
    })
    .catch((error: any) => {
      console.log('failed POST /addVideo', error)
      res.status(400).send(error);
      res.end();
    });
});

//!==============================================//
//!=============== RATINGS TABLE ================//
//!==============================================//
router.post('/addRating', (req: Request, res: Response) => {
  return controllers.addRating(req.body)
    .then((results: any) => {
      res.status(201);
      res.end();
    })
    .catch((error: any) => {
      console.log('Failed POST /addRating')
    });
});

export default router;