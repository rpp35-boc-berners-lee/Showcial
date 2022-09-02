// import { RequestPage } from '@mui/icons-material';
import { Request, Response, Router } from 'express';
const bcrypt = require('bcryptjs');
var passport = require('passport');
var LocalStrategy = require('passport-local');
const { findUser, addUser } = require('../database/controllers/index');

passport.use(new LocalStrategy(async function verify(username: string, password: string, cb: any) {

  //    ///use same pattern but with mongoose and bcrpyt/ email and password
  try {
    let results = await findUser(username);
    if (results.length === 0) {
      return cb(null, false, { message: 'Incorrect username or password.' });
    }
    if (!bcrypt.compareSync(password, results.hashedPassword)) {
      return cb(null, false, { message: 'Incorrect username or password.' });
    }
    return cb(null, results);
    }
  catch (err) {
    return cb(err);
  }
  }
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
));


const checkAuth = (req: any, res: Response, next: any) => {
  if (!req.session.user) {
    res.redirect('/signin');
  } else next();
}

type Params = {
  userName: string;
  email: string;
  password: string;
  ownedServices: string[];
};

const router = Router();

router.post('/signup', async (req: Request, res: Response) => {
  let params = req.params as unknown as Params;
  let userName = params.userName;
  let email = params.email;
  let password = params.password;
  let ownedServices = params.ownedServices || [];
  let hashedPassword = '';
  //find one from db using userName, if unsuccessful, hash password and store a new user
  try {
    let results = await findUser(userName);
    console.log(results);
    if (results.data.length > 0) {
      res.send('Username already in use');
    }
    if (results.data.length === 0) {
      hashedPassword = bcrypt.hashSync(userName, 8);
    }
    let userData = { userName, email, hashedPassword, ownedServices }
    await addUser(userData);
    console.log('added user');
    res.send('Added new user to database')
  }
  catch (error) {
    res.send(error);
  }
  //if successful, res send 'Username already in use, sign in or try another'
});

// router.post('/signin', (req: Request, res: Response) => {
//   let params = req.params as unknown as Params;
//   let email = params.email;
//   let password = params.password;
//   //search db for username,
//   //if successful, compare password against hashed password using bcryt.compare
//   //if true, update session
//   //if false, res.send('wrong username or password')
//   //if unsuccessful, res.send('username not found')
// })

//the above route for sign in needs to be formulated to this...
router.post('/signin', passport.authenticate('local', {
  successRedirect: '/home',
  failureRedirect: '/signin'
}, (req: any, res: any) => {
  console.log(req.session);
}
));

router.get('/guest', (req: any, res: Response) => {
  //update req.session.user to null
  console.log('guest');
  req.session.user = null;
  res.send('Logged in as "guest"')
})

//need a delete route for logging out


export { router };
// export default checkAuth;