// import { RequestPage } from '@mui/icons-material';
import axios from 'axios';
import { Request, Response, Router } from 'express';
const bcrypt = require('bcryptjs');
var passport = require('passport');
const { findUser, addUser } = require('../database/controllers/index');

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

router.post('/signup', async (req: Request, res: Response) => {
  let userName = req.body.params.userName;
  let email = req.body.params.email;
  let password = req.body.params.password;
  let ownedServices = req.body.params.ownedServices;
  //find one from db using userName, if unsuccessful, hash password and store a new user

  let hashedPassword = bcrypt.hashSync('HRiscool', 8);
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