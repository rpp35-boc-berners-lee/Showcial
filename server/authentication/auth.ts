import { RequestPage } from '@mui/icons-material';
import { Request, Response, Router } from 'express';
const bcrypt = require('bcryptjs');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local');
// const saltRounds = 10;

// passport.use(new LocalStrategy(function verify(username, password, cb) {
//    ///use same pattern but with mongoose and bcrpyt/ email and password

//    // db.get('SELECT * FROM users WHERE username = ?', [ username ], function(err, row) {
//    //   if (err) { return cb(err); }
//    //   if (!row) { return cb(null, false, { message: 'Incorrect username or password.' }); }

//    //   crypto.pbkdf2(password, row.salt, 310000, 32, 'sha256', function(err, hashedPassword) {
//    //     if (err) { return cb(err); }
//    //     if (!crypto.timingSafeEqual(row.hashed_password, hashedPassword)) {
//    //       return cb(null, false, { message: 'Incorrect username or password.' });
//    //     }
//    //     return cb(null, row);
//    //   });
//    // });
//  }));


const checkAuth = (req: Request, res: Response, next: any) => {
  if (!req.session.user) {
    res.redirect('/signin');
  } else next();
}

type Params = {
  userName: string;
  email: string;
  password: string;
  services: string[];
};

const router = Router();

router.post('/signup', (req: Request, res: Response) => {
  let params = req.params as unknown as Params;
  let userName = params.userName;
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
  //search db for username,
  //if successful, compare password against hashed password using bcryt.compare
  //if true, update session
  //if false, res.send('wrong username or password')
  //if unsuccessful, res.send('username not found')
})

//the above route for sign in needs to be formulated to this...
router.post('/login/password', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login'
}));

router.post('/guest', (req: any, res: Response) => {
  //update req.session.user to null
  console.log('guest');
  req.session.user = null;
  res.send('Logged in as "guest"')
})

//need a delete route for logging out


export {router};
export default checkAuth;