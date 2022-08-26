import { RequestPage } from '@mui/icons-material';
import { Request, Response, Router } from 'express';
const bcrypt = require('bcrypt');
const router = Router();
var session = require('express-session');
var passport = require('passport');



const saltRounds = 10;

const checkAuth = (req: Request, res: Response, next: any) => {
  if (!req.session.user) {
    res.redirect('/signin');
  } else next();
}

type Params = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  services: string[];

};

router.post('/signup', (req: Request, res: Response) => {
  let params = req.params as unknown as Params;
  let firstName = params.firstName;
  let lastName = params.lastName;
  let email = params.email;
  let password = params.password;
  let services = params.services;
  //find one from db using userName, if unsuccessful, hash password and store a new user
    //if successful, res send 'Username already in use, sign in or try another'

  bcrypt.hash(password, saltRounds, (hash) => {
    //store user data here and update/save the session
  })
});

router.post('/signin', (req: Request, res: Response) => {
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

router.post('/guest', (req: Request, res: Response) => {
  //update req.session.user to null
  req.session.user = null;
  res.send('Logged in as "guest"')
})
//need a delete route for logging out


export default {checkAuth, router};