require('dotenv').config();
import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import compression from 'compression';
import api_router from './api/routes/tmdb_api';
import videoDB_router from './database/routes/index';
import { router as baseEndpointRoute } from './routes/base-endpoint.route';
import { router as authRouter } from './authentication/auth';
import cors from 'cors';

var session = require('express-session');
const MongoStore = require('connect-mongo');
var passport = require('passport');

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
         maxAge: 300000,
      },
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

//ROUTES
app.use('/api', baseEndpointRoute);

//AUTH ROUTE
app.use('/auth', authRouter);

//for all other routes not found, send index.html file
app.get('/*', (req, res) => {
   res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

//START SERVER
app.listen(port, () => {
   console.log(`App listening on port ${port}`);
});
