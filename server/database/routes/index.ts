import {Request, Response, Router} from 'express';
const router = Router();
import controllers from '../controllers/index';

//!==============================================//
//!================ USER TABLE ==================//
//!==============================================//
router.post('/addUser', (req: Request, res: Response) => {
  return controllers.addUser(req.body)
    .then((results: any) => {
      res.status(201);
      res.end();
    })
    .catch((error: any) => {
      console.log('failed POST /addUser', error);
      res.end();
    });
});

router.get('/findUser', (req: Request, res: Response) => {
  return controllers.findUser(req.query.userName)
    .then((results: any) => {
      res.status(200).send(results[0]);
      res.end();
    })
    .catch((error: any) => {
      console.log('failed GET /findUser', error)
      res.status(400).send(error);
      res.end();
    })
});

//TODO: add userID to following list
//TODO: remove userID from following list
//TODO: add videoID to watched list
//TODO: remove videoID from watched list
//TODO: add videoID to recommended list
//TODO: remove videoID from recommended list
//TODO: add service to owned list
//TODO: remove service from owned list

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