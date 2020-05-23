'use strict'

//Imports
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');


//Instances
const app = express();
app.use(cors());


//Routes
const user_routes = require('./routes/user');


app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

//Bese routes
app.use('/api', user_routes);


module.exports = app;