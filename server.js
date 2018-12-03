import bodyParser from 'body-parser';
import config from './api/config';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose   from 'mongoose';
import logger  from 'morgan';
import routesAuth from './api/routes/auth';
import routesItems from './api/routes/shoppingItems';
import routesUsers from './api/routes/users';

dotenv.config();

mongoose.connect(config.DB, config.OPTIONS)
    .then(() => console.log('You are now connected to Mongo!'))
    .catch(err => console.error('Something went wrong', err));

const app = express();
app.use(cors());
app.use(logger('dev'));
app.use(express.static('client/public'));

app.get('/', function (req, res) {
    res.render('./client/public/index.html', function(err, html) {
        res.send(html);
    });
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/api', routesAuth);
app.use('/api/items', routesItems);
app.use('/api/users', routesUsers);

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', process.env.APP_DOMAIN);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    next();
});

app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'});
});

const port = process.env.APP_PORT || 4000;
app.listen(port, () => {
    console.log('Listening');
});