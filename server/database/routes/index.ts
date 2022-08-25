import {Request, Response, Router} from 'express';
const router = Router();
import controllers from '../controllers/index';

//!==============================================//
//!================ USER TABLE ==================//
//!==============================================//
router.post('/addUser', (req: Request, res: Response) => {
  return controllers.addUser(req.body)
    .then((success: any) => {
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

//!==============================================//
//!================ VIDEO TABLE =================//
//!==============================================//

//!==============================================//
//!=============== RATINGS TABLE ================//
//!==============================================//

export default router;