require('dotenv').config();
import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import compression from 'compression';
import api_router from './api/routes/tmdb_api';
import videoDB_router from './database/routes/index';
import { router as authRouter } from './authentication/routes/auth';
import cors from 'cors';
const passport = require('passport');
var session = require('express-session');
const MongoStore = require('connect-mongo');

const port = 8080;
const db_conn = process.env.mongoDB_TOKEN;
const secret = process.env.SESSION_SECRET;
const app = express();

//MIDDLEWARE
app.use(cors());
app.use(compression());
app.use(express.static(path.join(__dirname, '../client/dist')));
app.use(passport.initialize());
app.use(
   session({
      secret: secret,
      cookie: {
         //   path: '/home',
         httpOnly: true,
         secure: false,
         maxAge: 3000000,
      },
      proxy: true,
      resave: false,
      saveUninitialized: false,
      store: MongoStore.create({ mongoUrl: db_conn }),
   })
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.session());

// API ROUTE
app.use('/tmdb', api_router);

// MONGODB ROUTE
app.use('/videoDB', videoDB_router);

//AUTH ROUTE
app.use('/api/auth', authRouter);

//BASE ROUTE
app.get('/', (req, res) => {
   res.status(200).send({
      status: 'success',
      data: {
         name: 'Blue Ocean Capstone',
         version: '1.0.0',
      },
   });
});

//for all other routes not found, send index.html file
app.get('/*', (req, res) => {
   res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

//START SERVER
app.listen(port, () => {
   console.log(`App listening on port ${port}`);
});
