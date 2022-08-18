require('dotenv').config();
import path from 'path';
import express from 'express';
const port = 8080;
import bodyParser from 'body-parser';
import compression from 'compression';
import router from './api/routes/tmdb_api';

const app = express();
//MIDDLEWARE
app.use(compression());

app.use(express.static(path.join(__dirname, '../client/dist')));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

// API ROUTE
app.use('/tmdb', router);

//ROUTES
app.get('/api', (req, res) => {
   res.status(200).json({
      status: 'success',
      data: {
         name: 'template',
         version: '1.0.0',
      },
   });
});

app.get('/*', (req, res) => {
   res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

//START SERVER
app.listen(port, () => {
   console.log(`App listening on port ${port}`);
});
