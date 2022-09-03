require('dotenv').config();
import { Email, RequestPage } from '@mui/icons-material';
import { Request, Response, Router } from 'express';
import {
   GoogleCallbackParameters,
   Profile,
   Strategy as GoogleStrategy,
   VerifyCallback,
} from 'passport-google-oauth20';
import { SessionData } from 'express-session';
import db from '../../database/controllers';
import * as generator from 'generate-password';
const router = Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const saltRounds = 10;

const clientId = process.env.GOOGLE_CLIENT_ID as unknown as string;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET as unknown as string;

type PassportGoogleUser = {
   id: string;
   username: string;
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
         let session = req.session as unknown as SessionData;
         if (session.username) {
            // user is already logged in, associate his google account with regular account and redirect user
            console.log('user is already logged in');
            const googleUser = {
               id: profile.id,
               username: session.username,
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
                              req.session.username = email; //email and username will be the same
                              googleUser = {
                                 id: profile.id,
                                 username: email,
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
                           username: email,
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
      cb(null, { id: user.id, username: user.username });
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
      failureRedirect: '/login',
      failureMessage: true,
   }),
   (req: Request, res: Response) => {
      let session = req.session as unknown as SessionData;
      req.session.username = session.passport.user.username;
      res.redirect('/home');
   }
);

//route that checks if user is logged in
router.get('/checkAuthStatus', (req: Request, res: Response) => {
   if (req.session && req.session.username) {
      res.status(200).send(req.session.username);
   } else {
      res.status(403).json('User is not logged in.');
   }
});

//handles checking if user exists, if not then creates account
router.post('/signup', (req: Request, res: Response) => {
   let params = req.params as unknown as Params;
   let userName = params.userName;
   let email = params.email;
   let password = params.password;
   let services = params.services;
   //  // find one from db using userName, if unsuccessful, hash password and store a new user
   //  // if successful, res send 'Username already in use, sign in or try another'
   //
   //  // bcrypt.hash(password, saltRounds, (hash) => {
   //  // store user data here and update/save the session
   //  // })
});

//// const checkAuth = (req: any, res: Response, next: any) => {
////    if (!req.session.user) {
////       res.redirect('/signin');
////    } else next();
//// };

type Params = {
   userName: string;
   email: string;
   password: string;
   services: string[];
};

router.post('/signin', (req: Request, res: Response) => {
   let params = req.params as unknown as Params;
   let email = params.email;
   let password = params.password;
   //search db for username,
   //if successful, compare password against hashed password using bcryt.compare
   //if true, update session
   //if false, res.send('wrong username or password')
   //if unsuccessful, res.send('username not found')
});

//the above route for sign in needs to be formulated to this...
router.post(
   '/login/password',
   passport.authenticate('local', {
      successRedirect: '/',
      failureRedirect: '/login',
   })
);

router.get('/guest', (req: any, res: Response) => {
   //update req.session.user to null
   console.log('guest');
   req.session.user = null;
   res.send('Logged in as "guest"');
});

//need a delete route for logging out

export { router };
