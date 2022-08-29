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
      res.status(200).send(results);
      res.end();
    })
    .catch((error: any) => {
      console.log('failed GET /findUser', error)
      res.status(400).send(error);
      res.end();
    })
});

//TODO: add userName to following list
router.put('/addFollowed', (req: Request, res: Response) => {

});

//TODO: remove userName from following list
router.put('/removeFollowed', (req: Request, res: Response) => {

});

//TODO: add service to owned list
router.put('/addService', (req: Request, res: Response) => {

});

//TODO: remove service from owned list
router.put('/addService', (req: Request, res: Response) => {

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