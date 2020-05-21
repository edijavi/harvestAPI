'use strict'

//  local connection to db
// 'mongodb://localhost:27017/harvestDB'
var mongoose = require('mongoose');
var app = require('./app');
var port = process.env.PORT || 3977;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://harvest:easv2020@harvest-app-gupi2.mongodb.net/harvestDB?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true,useFindAndModify: false }, (err, res) => {
  if (err){
    throw err;
  }else{
    console.log("La base de datos está corriendo correctamente");

    app.listen(port, function (){
      console.log("Servidor del API rest de Harvest App está escuchando en http://localhost:"+port);
    });    
  }
});