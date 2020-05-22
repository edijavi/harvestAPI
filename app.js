'use strict'
var express = require('express');
var bodyParser = require('body-parser');
// var cors = require('cors');
var app = express();

//cargar rutas
var user_routes = require('./routes/user');
// app.use(cors());

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//configurar cabeceras http
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-Whith, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, DELETE');

  next();
});

//rutas base
app.use('/api', user_routes);


module.exports = app;
