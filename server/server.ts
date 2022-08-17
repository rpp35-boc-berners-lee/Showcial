require('dotenv').config();
import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import compression from 'compression';
import { router as baseEndpointRoute } from './routes/base-endpoint.route';
import db from './database/db';

const port = 8080;

const app = express();
//MIDDLEWARE
app.use(compression());

app.use(express.static(path.join(__dirname, '../client/dist')));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

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
