import { RequestPage } from '@mui/icons-material';
import { Request, Response, Router } from 'express';
const bcrypt = require('bcrypt');
const router = Router();

const saltRounds = 10;


// router.get('/configuration', async (req: Request, res: Response) => {
//   let params = req.params as unknown as Params;
//   res.send(await tmdb.getConfig());
// })
type Params = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  services: string[];

};

router.get('/signup', (req: Request, res: Response) => {
  let params = req.params as unknown as Params;
  let firstName = params.firstName;
  let lastName = params.lastName;
  let email = params.email;
  let password = params.password;
  let services = params.services;
  //find one from db using email, if unsuccessful, hash password and store a new user
    //if successful, res send 'email already in use, sign in or try another'

  bcrypt.hash(password, saltRounds, (hash) => {
    //store user data here
  })
});

router.get('/signin', (req: Request, res: Response) => {
  let params = req.params as unknown as Params;
  let email = params.email;
  let password = params.password;
  //search db for email,
    //if successful, compare password against hashed password using bcryt.compare
      //if true, update session
      //if false, res.send('wrong email or password')
    //if unsuccessful, res.send('wrong email or password')
})

//the above route for sign in needs to be formulated to this...
router.post('/login/password', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login'
}));