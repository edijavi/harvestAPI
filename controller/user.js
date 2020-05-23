'use strict'

const jwt = require('../services/JwtResponse');
const expiresIn = 24 * 60 * 60;
const bcrypt = require('bcryptjs');
var User = require('../models/user');



function loginUser(req, res) {
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({
    email: email
  }, (err, user) => {
    if (err) return res.status(500).send('Server error!');
    if (!user) return res.status(404).send('User not found!');
    const result = bcrypt.compareSync(password, user.password);
    if (!result) return res.status(401).send('Password not valid!');
    res.status(200).send({
      'user': user,
      'access_token': jwt.createToken(user),
      'expires_in': expiresIn
    });
  });
};


function register(req, res) {
  var user = new User();
  var params = req.body;
  debugger
  user.name = params.name;
  user.surname = params.surname;
  user.email = params.email;
  user.role = 'ROLE_ADMIN';
  user.image = 'null';
  debugger
  if (req.body.password) {
    //Ecriptar la contraseña
    bcrypt.hash(params.password, null, function (err, hash) {
      user.password = hash;
      if (user.name != null && user.surname != null && user.email != null) {
        //guardar el usuario 
        user.save((err, userStored) => {
          if (err) {
            res.status(500).send({
              message: 'Error al guardar el usuario'
            });
          } else {
            if (!userStored) {
              res.status(404).send({
                message: 'No se ha regustrado el usuario'
              });
            } else {
              res.status(200).send({
                user: userStored,
                access_token: jwt.createToken(user),
                expires_in: expiresIn
              });
            }
          }
        });
      } else {
        res.status(200).send({
          message: 'Introduce todos los campos'
        });
      }
    });
  } else {
    res.status(200).send({
      message: 'Introduce la contraseña'
    });
  }
}


module.exports = {
  loginUser,
  register
};