require('dotenv').config();
import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import compression from 'compression';
import api_router from './api/routes/tmdb_api';
import { router as baseEndpointRoute } from './routes/base-endpoint.route';
import db from './database/db';
var session = require('express-session');
require('dotenv').config();


const port = 8080;

const app = express();
//MIDDLEWARE
app.use(session({
  secret: process.env.SESSION_SECRET,
  cookie: {}
}))

app.use(compression());

app.use(express.static(path.join(__dirname, '../client/dist')));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

// API ROUTE
app.use('/tmdb', api_router);

//ROUTES
app.use('/api', baseEndpointRoute);

//for all other routes not found, send index.html file
app.get('/*', (req, res) => {
   res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

//START SERVER
app.listen(port, () => {
   console.log(`App listening on port ${port}`);
});
