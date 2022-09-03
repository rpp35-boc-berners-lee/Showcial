// import { RequestPage } from '@mui/icons-material';
import axios from 'axios';
import { Request, Response, Router } from 'express';
const bcrypt = require('bcryptjs');
var passport = require('passport');
const { findUser, addUser } = require('../database/controllers/index');
import {
  GoogleCallbackParameters,
  Profile,
  Strategy as GoogleStrategy,
  VerifyCallback,
} from 'passport-google-oauth20';
import { SessionData } from 'express-session';
import db from '../database/controllers';
import * as generator from 'generate-password';


const saltRounds = 10;

const checkAuth = (req: any, res: Response, next: any) => {
  if (!req.session.user) {
    res.redirect('/signin');
  } else next();
}

type userData = {
  userName: string;
  password: string;
  email: string;
  ownedServices: string[];
}

const router = Router();


const clientId = process.env.GOOGLE_CLIENT_ID as unknown as string;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET as unknown as string;

type PassportGoogleUser = {
   id: string;
   user: string;
};

passport.use(
   new GoogleStrategy(
      {
         clientID: clientId,
         clientSecret: clientSecret,
         callbackURL: 'http://localhost:8080/api/auth/oauth2/redirect/google',
         scope: ['profile', 'email'], //the data we are asking for from google
         passReqToCallback: true, //this places the request object into callback function below where you can check if user is already logged in
      },
      function (
         req: Request,
         accessToken: string,
         refreshToken: string,
         params: GoogleCallbackParameters,
         profile: Profile,
         done: VerifyCallback
      ) {
        //  let session = req.session as unknown as SessionData;
         if (req.session.user) {
            // user is already logged in, associate his google account with regular account and redirect user
            console.log('user is already logged in');
            const googleUser = {
               id: profile.id,
               user: req.session.user,
            };
            return done(null, googleUser);
         } else {
            //the user is not logged in, continue with google strategy

            //if profile was returned from google api
            if (profile && profile.emails) {
               const email: string = profile.emails[0].value;
               db.findUserByEmail(email)
                  .then((user: string) => {
                     let googleUser: PassportGoogleUser;
                     //if no account with email exists in the db, then create new account, first generating random password
                     if (!user) {
                        const password = generator.generate({
                           length: 10,
                           numbers: true,
                        });
                        const hashedPassword = bcrypt.hashSync(
                           password,
                           saltRounds
                        );
                        const userData = {
                           userName: email,
                           email,
                           hashedPassword,
                           followingList: [''],
                           watchedVideos: [''],
                           recommendedVideos: [''],
                           ownedServices: [''],
                        };
                        db.addUser(userData)
                           .then((success: any) => {
                              req.session.user = email; //email and username will be the same
                              googleUser = {
                                 id: profile.id,
                                 user: email,
                              };
                              return done(null, googleUser);
                           })
                           .catch((err: any) => {
                              console.log('err:', err);
                              return done(err);
                           });
                        //if user with email already exists, then associate this account with that user by placing it in the session
                     } else {
                        req.session.username = email;
                        googleUser = {
                           id: profile.id,
                           user: email,
                        };
                        return done(null, googleUser);
                     }
                  })
                  .catch((err: string) => {
                     console.log('err:', err);
                     return done(err);
                  });
            }
         }
      }
   )
);

passport.serializeUser(function (user: PassportGoogleUser, cb: VerifyCallback) {
   process.nextTick(function () {
      cb(null, { id: user.id, user: user.user });
   });
});

passport.deserializeUser(function (
   user: PassportGoogleUser,
   cb: VerifyCallback
) {
   process.nextTick(function () {
      return cb(null, user);
   });
});

//this redirects user to google where they will authenticate
router.get('/login/federated/google', passport.authenticate('google'));

//second route in google auth process that handles authentication response and logs user in after google redirects the user back to the app
router.get(
   '/oauth2/redirect/google',
   passport.authenticate('google', {
      failureRedirect: '/signin',
      failureMessage: true,
   }),
   (req: Request, res: Response) => {
      let session = req.session as unknown as SessionData;
      req.session.user = session.passport.user.user;
      res.redirect('http://localhost:3000');
   }
);

//route that checks if user is logged in
router.get('/checkAuthStatus', (req: Request, res: Response) => {
  console.log('req.session in checkauthstatus:', req.session);
  if (req.session && req.session.user) {
     res.status(200).send(req.session.user);
  } else {
     res.status(403).json('User is not logged in.');
  }
});


router.get('/logout', (req: Request, res: Response) => {
   req.session.destroy(err => {
      if (err) {console.log('err:', err)
   } else {
      res.status(200).send('You have been logged out')
   } 
   });
})
router.post('/signup', async (req: Request, res: Response) => {
  let userName = req.body.params.userName;
  let email = req.body.params.email;
  let password = req.body.params.password;
  let ownedServices = req.body.params.ownedServices;
  //find one from db using userName, if unsuccessful, hash password and store a new user

  let hashedPassword = bcrypt.hashSync(password, 8);
  console.log(hashedPassword);

  axios.post(
    'http://localhost:8080/videoDB/user',
    {
      userName,
      hashedPassword,
      email,
      ownedServices

    }
  )
    .then(() => {
      res.status(201).send('User added to database');
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    })
});

router.post('/signin', (req: any, res: Response) => {
  let userName = req.body.params.userName;
  let password = req.body.params.password;

  axios.get(
    'http://localhost:8080/videoDB/user',
    {
      params: {
        userName
      }
    }
  )
    .then((response) => {
      let hash = response.data.hashedPassword;
      if (bcrypt.compareSync(password, hash)) {
        req.session.user = response.data.userName;
        res.status(201).send('Succesfully logged in');
      } else {
        res.status(401).send('Incorrect username or password');
      }
    })
    .catch((err) => {
      console.log(`Error logging in as ${userName}`, err);
      res.status(400).send(err);
    })
});

// router.get('/guest', (req: any, res: Response) => {
//   //update req.session.user to null
//   console.log('guest');
//   req.session.user = null;
//   res.send('Logged in as "guest"')
// })

//need a delete route for logging out


export { router };
// export default checkAuth;