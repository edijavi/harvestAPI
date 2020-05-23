'use strict'

const app = require('./app.js');
const mongoose = require('mongoose');
const port = process.env.PORT || 3977;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://harvest:easv2020@harvest-app-gupi2.mongodb.net/harvestDB?retryWrites=true&w=majority', 
  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false}, (err, res) => {
  if (err){
    throw err;
  }else{
    console.log("La base de datos está corriendo correctamente");

    app.listen(port, function (){
      console.log(`Servidor del API rest de música escuchando en http://localhost:${port}`);
    });    
  }
});